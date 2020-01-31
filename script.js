(function() {
    function loadChart() {
        fetch('https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20li_com_act_licenses%20ORDER%20BY%20issuedate%20DESC%20LIMIT%20100', {
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
