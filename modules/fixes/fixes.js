/*
	Tabs change url
*/
$("#task-tabs > ul > li > a").click(function() {
	updateQueryStringParam("sTab", $(this).attr("href").substring(1));
});
$("#progressionTabs > ul > li > a").click(function() {
	updateQueryStringParam("progression", $(this).attr("href").slice(-1));
});