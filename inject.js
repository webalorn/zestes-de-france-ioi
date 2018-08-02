let zesteFiles = {
	"logo" : "img/logo.png",
	"ariane" : "img/ariane.png",
	"menu" : "img/menu.png",
	"piscine" : "img/piscine.jpg",
	"crown" : "img/crown.png",
	"menu_template" : "html/menu.html",
	"offline_off" : "img/offline_off.png",
	"offline_on": "img/offline_on.png",
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

/*
	Offline subject view
*/

function setTaskSavedState(state) {
	$("#taskSaved").prop("checked", state);
}

if (document.location.pathname == "/algo/task.php" && $("#task-tabs").length) {
	var variables = $("script[src=\"../ext/jquery/jquery.blockUI.js\"] + script").text();
	eval(variables);
	var req = {
		"req": "on_task",
		"task": idTask,
		"chapter": idChapter,
	}
	chrome.runtime.sendMessage(req);

	req.content = $("#task").html();
	req.req = "save_task";
	req.title = $("#heading-link-box .direction-box h1").clone()    //clone the element
		.children() //select all the children
		.remove()   //remove all the children
		.end()  //again go back to selected element
		.text();

	var savedDom = $('<input type="checkbox" id="taskSaved" /><label for="taskSaved"><div></div><span>Sauvegarder le sujet hors-ligne</span></label>');
	$(".links-box-middle + td").prepend(savedDom);

	$("#taskSaved").change(function() {
		var state = $(this).prop('checked');
		if (state) {
			chrome.runtime.sendMessage(req);
		} else {
			chrome.runtime.sendMessage({
				"req": "forget_task",
				"task": req.task,
			});
		}
	});
}

/*
	Message listner
*/

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (!sender.tab) {
			if (request.req == "is_task_saved") {
				setTaskSavedState(request.saved);
			}
		}
	});