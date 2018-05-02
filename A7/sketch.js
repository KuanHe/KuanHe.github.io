    function showPopup(url) {
        newWindow = window.open(url, 'name', 'height=400,width=520,top=200,left=300,resizable');
        if (window.focus) {
            newWindow.focus()
        }
    }

    function showPopup(url) {
        newWindow = window.open(url, 'name', 'height=400,width=520,top=200,left=300,resizable');
        if (window.focus) {
            newWindow.focus()
        }
    }
    // Load packages for particular chart type
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawAllSheets);
    // Load data from Google docs
    function drawSheetName(sheetName, query, responseHandler) {
        var queryString = encodeURIComponent(query);
        var query = new google.visualization.Query(

            // https://docs.google.com/spreadsheets/d/1-NwogHiqjRPfIEeh7XxgDYj1CIjyzrz7hxYus4I2VQY/gviz/tq?sheet=
            'https://docs.google.com/spreadsheets/d/1jIYK82TCeANuKFgiDVHmdcALzDgwlVdm1rp2Xrjd8uw/gviz/tq?sheet=' +
            sheetName + '&headers=1&tq=' + queryString);
        query.send(responseHandler);
    }
    function drawSheetNameRange(sheetName, query, responseHandler) {
        var queryString = encodeURIComponent(query);
        var query = new google.visualization.Query(

            // https://docs.google.com/spreadsheets/d/1-NwogHiqjRPfIEeh7XxgDYj1CIjyzrz7hxYus4I2VQY/gviz/tq?sheet=
            'https://docs.google.com/spreadsheets/d/1jIYK82TCeANuKFgiDVHmdcALzDgwlVdm1rp2Xrjd8uw/gviz/tq?sheet=' +
            sheetName + '&headers=1&tq?' + queryString);
        query.send(responseHandler);
    }
    // deal with error
    function checkError(response) {
        if (response.isError()) {
            alert('Error in query: ' + response.getMessage() +
                ' ' + response.getDetailedMessage());
            return;
        }
    }
    // draw the chart
    function drawAllSheets() {
        drawSheetName('Health Spending', 'SELECT A, G',
            avgHealthResponseHandler);
        drawSheetName('Health Spending', 'SELECT A, B',
            topHealthSpendingResponseHandler);
        drawSheetNameRange('Hgrowingtrendperca', 'range=A1:M6',
            percapitaHealthResponseHandler);
        drawSheetName('HCperperson','SELECT A, N, T',
            percapitaGDPHealthSpendingResponseHandler);
        drawSheetNameRange('percentageHandG', 'range=A1:F13',
            eduVsGDPResponseHandler);
            drawSheetName('Military Spending', 'SELECT A, B, N',
        militarySpendingResponseHandler);
    }
    // Draw average healthcare spending 
    function avgHealthResponseHandler(response) {
        checkError(response);
        var data = response.getDataTable();
        data.sort({
            column: 1,
            desc: true
        });

        
        var view = new google.visualization.DataView(data);

        view.setColumns([0, 1,
            {
                calc: function (dt, row) {
                    // console.log(dt.getFormattedValue(row, 1), 'qaqaqa')
                    return Math.floor(dt.getFormattedValue(row, 1) / 100000000) + 'B';
                },
                sourceColumn: 1,
                type: 'string',
                role: 'annotation'
            }
        ]);

        var chart = new google.visualization.BarChart(
            document.getElementById('avg-health-spending'));

        chart.draw(view, options);
    }
    var top10Year = 2011
    var top10YearQuery = {
        "2011": 'SELECT A, B',
        "2012": 'SELECT A, C',
        "2013": 'SELECT A, D',
        "2014": 'SELECT A, E',
        "2015": 'SELECT A, F'
    }

    function changeTopYear(y) {
        top10Year = y
        document.getElementsByClassName('top10eduyear')[0].innerText = top10Year
        drawSheetName('Healthcare Spending', top10YearQuery[top10Year],
            topHealthSpendingResponseHandler);
    }
    // Draw the map to visualize G-20 healthcare spending
    function topHealthSpendingResponseHandler(response) {
        checkError(response);
        var data = response.getDataTable();
        // console.log(data)
        data.sort({
            column: 1,
            desc: true
        });

        var options = {
            height: 400,
            // displayMode: 'markers',  
            colorAxis: {
                colors: ['#c7de8c', '#d3e4ba', '#e6f2c4', '#f8f7a5', '#f8d33a'] 
            }, //orange to blue
            backgroundColor: '#f8f8f8'

        };

        var chart = new google.visualization.GeoChart(
            document.getElementById('top-health-spend'));

        chart.draw(data, options);
    }
    // Compare healthcare spending and GDP
    function eduVsGDPResponseHandler(response) {
        checkError(response);
        var data = response.getDataTable();
        data.sort({
            column: 5,
            desc: true
        });

        var options = {
            height: 400,
            title: 'Healthcare Spending VS GDP on 2011 - 2015',
            vAxis: {
                format: 'percent'
            },
            backgroundColor: '#f8f8f8'
        };

        var chart = new google.visualization.ColumnChart(
            document.getElementById('health-vs-gdp'));
        chart.draw(data, options);
    }

    // Line chart to show growing trend for education spending
    function percapitaHealthResponseHandler(response) {
        checkError(response);
        var data = response.getDataTable();
        data.sort({
            column: 5,
            desc: true
        });

        var options = {
            height: 400,
            title: 'Growing Trend for Healthcare Spending',
            backgroundColor: '#f8f8f8'
        };

        var chart = new google.visualization.LineChart(
            document.getElementById('percapitahealth'));
        chart.draw(data, options);
    }
    var preYear = 2011
    var preYearQuery = {
        "2011": 'SELECT A, N, T',
        "2012": 'SELECT A, O, U',
        "2013": 'SELECT A, P, V',
        "2014": 'SELECT A, Q, W',
        "2015": 'SELECT A, R, X'
    }
	//drawSheetName(''HCperperson', 'SELECT A, O, N',
	//         percapitaGDPHealthSpendingResponseHandler);                 
    function changePreYear(y) {
        preYear = y
        document.getElementsByClassName('preeduyear')[0].innerText = preYear
        drawSheetName('HCperperson', preYearQuery[preYear],
            percapitaGDPHealthSpendingResponseHandler);
    }
    // Per capita healthcare spending takes up per person GDP
    function percapitaGDPHealthSpendingResponseHandler(response) {
        checkError(response);
        var data = response.getDataTable();
        data.sort({
            column: 1,
            desc: true
        });

        var options = {
            height: 400,
            legend: 'none',
            bars: 'horizontal',
            isStacked: true,
            annotations: {
                alwaysOutside: true
            },
            title:  preYear + 'Per Person Education Spending VS GDP',
            vAxis: {
                title: 'Country'
            },
            hAxis: {
                title: 'Spending in ($)'
            },
            legend: {
                position: 'top',
                maxLines: 3
            },
            backgroundColor: '#f8f8f8',
            animation: {
                duration: 1000,
                startup: true
            },
        };

        var chart = new google.visualization.BarChart(
            document.getElementById('percapitagdphealthspending'));

        chart.draw(data, options);
    }

    // Compare military spending and healthcare spending
    var militaryYear = 2011
    var militaryYearQuery = {
        "2011": 'SELECT A, B, N',
        "2012": 'SELECT A, C, O',
        "2013": 'SELECT A, D, P',
        "2014": 'SELECT A, E, Q',
        "2015": 'SELECT A, F, R'
    }

    function changeMilitaryYear(y) {
        militaryYear = y
        document.getElementsByClassName('top10eduyear')[0].innerText = militaryYear
        drawSheetName('Military Spending', militaryYearQuery[militaryYear],
            militarySpendingResponseHandler);
    }

    function militarySpendingResponseHandler(response) {
        checkError(response);
        var data = response.getDataTable();
        data.sort({
            column: 1,
            desc: true
        });

        var options = {
            height: 400,
            legend: 'none',
            bars: 'horizontal',
            isStacked: true,
            annotations: {
                alwaysOutside: true
            },
            title: 'Healthcare Spending VS Military Spending',
            vAxis: {
                title: 'Country'
            },
            hAxis: {
                title: 'Spending in ($)'
            },
            legend: {
                position: 'top',
                maxLines: 3
            },
            backgroundColor: '#f8f8f8',
            animation: {
                duration: 1000,
                startup: true
            },
        };

        var chart = new google.visualization.BarChart(
            document.getElementById('militaryhealthspending'));

        chart.draw(data, options);
    }