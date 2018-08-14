function updateQueryStringParam(key, value) {
	var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
		urlQueryString = document.location.search,
		newParam = key + '=' + value,
		params = '?' + newParam;
	if (urlQueryString) {
		keyRegex = new RegExp('([\?&])' + key + '[^&]*');
		if (urlQueryString.match(keyRegex) !== null) {
			params = urlQueryString.replace(keyRegex, "$1" + newParam);
		} else {
			params = urlQueryString + '&' + newParam;
		}
	}
	window.history.replaceState({}, "", baseUrl + params);
}

function zInsertAtCursor(messageArea, startText, endText) {
	if (messageArea instanceof jQuery) {
		messageArea = messageArea[0];
	}
	if (endText == undefined) {
		endText = '';
	}
	messageArea.focus();
	if (document.selection) { // For IE
		sel = document.selection.createRange();
		sel.text = startText + endText;
	} else if (messageArea.selectionStart || messageArea.selectionStart == '0') { // For Firefox, etc.
		var startPos = messageArea.selectionStart;
		var endPos = messageArea.selectionEnd;
		var content = messageArea.value;
		messageArea.value = content.substring(0, startPos) + startText + content.substring(startPos, endPos) + endText
		+ content.substring(endPos, content.length);
		messageArea.selectionStart = startPos + startText.length;
		messageArea.selectionEnd = endPos + startText.length;
	} else {
		messageArea.value += startText + endText;
	}
}

let isConnected = false;
let username = "";

/*
	Check if connected
*/
if ($(".menuLogin .menuboxcontents > a").size()) { // Connected
	isConnected = true;
	username = $("label[for=\"menuLoginToggle\"]").text();
	if ($("html").attr("lang") == "fr") {
		$(".menuLogin").css("display", "none");
	}
}