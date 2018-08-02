(function() {
	let zesteFiles = {
		"logo" : "img/logo.png",
		"ariane" : "img/ariane.png",
		"menu" : "img/menu.png",
		"piscine" : "img/piscine.jpg",
		"crown" : "img/crown.png",
		"menu_template" : "html/menu.html",
	};
	for (let name in zesteFiles) {
		zesteFiles[name] = chrome.extension.getURL(zesteFiles[name]);
	}

	let scriptCode = ['zesteFiles = ' + JSON.stringify(zesteFiles) + ';'].join('\n');

	let scriptFilesUrl = document.createElement('script');
	scriptFilesUrl.textContent = scriptCode;
	(document.head||document.documentElement).appendChild(scriptFilesUrl);


	let body = document.getElementsByTagName('body')[0];
	let link = document.createElement('link');
	let script = document.createElement('script');

	let linkPath = chrome.extension.getURL('zestes.css');
	let scriptPath = chrome.extension.getURL('zestes.js');

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = linkPath;

    script.src = scriptPath;

	body.appendChild(link);
	body.appendChild(script);

	
})();