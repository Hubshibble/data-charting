(function() {
    // function dateRange(from, to) {
    //     return ""
    // }

    function buildChart(data) {
        var currentDate;
        var dates = ['x'];
        var issuances = ['Licenses Issued'];

        for (var i = 0; i < data.rows.length; i++) {
            var activeDate = data.rows[i].issuedate.substring(0,10);
            if (currentDate == undefined || currentDate == null || currentDate != activeDate) {
                currentDate = data.rows[i].issuedate.substring(0,10);
                dates.push(activeDate);
                issuances[issuances.length] = 1;
            } else if (currentDate == activeDate) {
                issuances[issuances.length - 1]++;
            }

        }

        console.log(currentDate);
        console.log(dates);
        console.log(issuances);
        
        c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [
                    dates,
                    issuances
                ]
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            }
        });
    }

    function loadChart(cols, restraints) {
        if (cols == undefined || cols == null) {
            cols = '*';
        } else {
                for (var i = 0; i < cols.length; i++) {
                    cols += cols[i];
                }
        }

        if (restraints == undefined || restraints == null) {
            restraints = '';
        } else {
            restraints = 'WHERE ';
        }

        var query = `https://phl.carto.com/api/v2/sql?q=SELECT%20${cols}%20FROM%20li_com_act_licenses%20${restraints}%20ORDER%20BY%20issuedate%20DESC%20LIMIT%20500`;
        fetch(query, {
            method: 'GET',

        }).then(function(res){
            return res.json().then(function(res) {
                buildChart(res);
            });
        }).catch(function(err) {
            console.error(err);
        });
    }

    loadChart();
})();
