(function() {
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