var offlineTasks = {
	"is_saved": function (id, callback) {
		var key = "task_" + id;
		chrome.storage.local.get([key], function(result) {
			console.log("GET", result);
			result = result[key];
			callback(result && result != undefined);
		});
	},
	"getTask": function (id, callback) {
		var key = "task_" + id;
		chrome.storage.local.get([key], function(result) {
			callback(result[key]);
		});
	},
	"saveTask": function (id, content, callback) {
		var key = "task_" + id;
		var setRequest = {};
		setRequest[key] = content;
		chrome.storage.local.set(setRequest, callback);
	},
	"forgetTask": function (id, callback) {
		chrome.storage.local.remove(["task_" + id], callback);
	},
};

function onTask(request, sender, sendResponse) {
	offlineTasks.is_saved(request.task, function(is_saved) {
		chrome.tabs.sendMessage(sender.tab.id, {req: "is_task_saved", saved: is_saved});
	});
}

function saveTask(request, sender, sendResponse) {
	offlineTasks.saveTask(request.task, {
		"task": request.task,
		"chapter": request.chapter,
		"title": request.title,
		"content": request.content,
		"savedAt": Date.now(),
	});
}
function forgetTask(request, sender, sendResponse) {
	offlineTasks.forgetTask(request.task)
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (sender.tab) {
			var url = sender.tab.url;
			console.log("request: ", request);
			if (request.req == "on_task") {
				onTask(request, sender, sendResponse);
			} else if (request.req == "save_task") {
				saveTask(request, sender, sendResponse);
			} else if (request.req == "forget_task") {
				forgetTask(request);
			}
		}
	});