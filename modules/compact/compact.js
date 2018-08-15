$("html").attr("compact", "base");
if (zesteConfig.compact_rm_menus) {
	$("html").attr("compact", "ultra");
	$(".menuCommunity").remove();
	$(".menuSitemap").find("h2").remove();

	var allowedLinks = [
		"http://www.france-ioi.org/algo/chapters.php",
		"http://www.france-ioi.org/forum/index.php",
		"http://www.france-ioi.org/algo/rankingMain.php",
		"http://www.france-ioi.org/algo/rankingMain.php",
		"http://www.france-ioi.org/comm/contact.php?bCreate=1&sKindItem=general",
	]
	$(".menuSitemap").find("a").each(function() {
		var el = $(this);
		console.log(el.attr("href"), el.attr("href") in allowedLinks);
		if (!allowedLinks.includes(el.attr("href"))) {
			el.remove();
		}
	});
	$(".menucol").prepend($(".menuSitemap"));
}

$(".banner").remove();
$('html[lang=fr] .menu-language-select').remove();
if ($("#timeRemaining").length && !zesteConfig.enable_zeste) {
	$("#timeRemaining").css("right", "0px").css("left", "auto");
}

if ($("#homeContents").length) {
	$("<h1><a href='/algo/chapters.php'>Cours et problèmes</a></h1>").css("text-align", "center").insertBefore($("#homeContents"));
}