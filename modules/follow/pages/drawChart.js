function drawChartOf(username, checksum) {
	var chart;
	var options = {
		 chart: {
			 renderTo: 'container',
			 type: 'spline'
		 },
		 title: {
			 text: null,
		 },
		 xAxis: {
			 type: 'datetime',
			 dateTimeLabelFormats: { // don't display the dummy year
				second: '%H:%M:%S',
				minute: '%H:%M',
				hour: '%H:%M',
				day: '%d/%m',
				week: '%d/%m',
				month: '%d/%m',
				year: '%m/%Y',
			}
		 },
		 yAxis: {
			 title: {
				 text: 'Nombre de problèmes résolus'
			 },
			 min: 0
		 },
		 tooltip: {
			 formatter: function() {
					 return Highcharts.dateFormat('%d/%m/%Y', this.x) +' : '+ this.y;
			 }
		 },
		 legend: {
			enabled:false,
		 },
		 credits: {
			enabled:false,
		 },

		 series: [{
			 name: 'User',
			 marker: {
				 enabled: false
			 }
		 }]
	 };

	  $.ajax({
		 type:'POST',
		 url: "http://www.france-ioi.org/user/curveData.php?user1=" + username + "&chk=" + checksum + "&iCategorie=0",
		 dataType: "json",
		 success: function(data, state, xhr) {
			var nbSolved = [];

			var last = -1, lastTS;
			for (var key in data)
			{
			   var DT = key.split(" ");
			   var D = DT[0].split("-");
			   var T = DT[1].split(":");
			   var TS = Date.UTC(D[0],D[1]-1,D[2],T[0],T[1],T[2]);
			   if (D[0] > 2000)
			   nbSolved.push([
				  TS,
				  data[key]
				  ]);
			   last = data[key];
			   lastTS=TS;
			}
			if (last != -1)
			{
			   var currentTime = new Date()
			   var currentTime = new Date()
			   nbSolved.push([
					 Math.max(currentTime.getTime(), lastTS),
					 last
					 ]);
			}
			options.series[0].data = nbSolved;
			//console.log(nbSolved);
			chart = new Highcharts.Chart(options);
		 }
	  });


}
