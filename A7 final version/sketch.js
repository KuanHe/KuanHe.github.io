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
        
    
            drawSheetName('Military Spending', 'SELECT A, B, N',
        militarySpendingResponseHandler);
    }
    // Draw average healthcare spending 
    function avgHealthResponseHandler(response) {
        checkError(response);
        var data = response.getDataTable();
        
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
        

        };




        var chart = new google.visualization.GeoChart(
            document.getElementById('top-health-spend'));

        chart.draw(data, options);
    }
    





        
    // Line chart to show growing trend for spending
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
  
        };

        var chart = new google.visualization.LineChart(
            document.getElementById('percapitahealth'));
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