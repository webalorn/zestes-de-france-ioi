chrome.browserAction.onClicked.addListener(function(activeTab){
	var newURL = "http://www.france-ioi.org/algo/chapters.php";
	chrome.tabs.create({ url: newURL });
});