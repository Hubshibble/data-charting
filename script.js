(function() {
    // function dateRange(from, to) {
    //     return ""
    // }

    function loadChart(cols, restraints) {
        var cols = '*';
        var restraints = '';

        if (cols != undefined && cols != null && cols.length > 0) {
            cols = '';

            for (var i = 0; i < cols.length; i++) {
                cols += cols[i];
            }
        }

        if (restraints != undefined && restraints != null && restraints.length > 0) {
            restraints = 'WHERE ';
        }

        var query = `https://phl.carto.com/api/v2/sql?q=SELECT%20${cols}%20FROM%20li_com_act_licenses%20${restraints}%20ORDER%20BY%20issuedate%20DESC%20LIMIT%20100`;
        fetch(query, {
            method: 'GET',

        }).then(function(res){
            return res.json().then(function(res) {
                console.log(res);
            });
        }).catch(function(err) {
            console.error(err);
        });
    }

    loadChart();
})();
