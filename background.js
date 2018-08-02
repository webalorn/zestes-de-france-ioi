var offlineTasks = {
	"getTaskList":function (callback) {
		chrome.storage.local.get(["tasksList"], function(liste) {
			liste = liste["tasksList"] || [];
			callback(liste);
		});
	}
	"is_saved": function (id, callback) {
		var key = "task_" + id;
		chrome.storage.local.get([key], function(result) {
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
		this.getTaskList(function(liste) {
			if (liste.indexOf(id) == -1) {
				liste.push(id);
			}
			var key = "task_" + id;
			var setRequest = {};
			setRequest[key] = content;
			chrome.storage.local.set(setRequest, function() {
				chrome.storage.local.set({"tasksList" : liste}, function () {
					callback();
				});
			});
		});
	},
	"forgetTask": function (id, callback) {
		this.getTaskList(function(liste) {
			var liste2 = []
			for (var i in liste) {
				if (liste[i] != id) {
					liste2.push(liste[i]);
				}
			}
			chrome.storage.local.set({"tasksList" : liste2}, function() {
				chrome.storage.local.remove(["task_" + id], callback);
			});
		});
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
			if (request.req == "on_task") {
				onTask(request, sender, sendResponse);
			} else if (request.req == "save_task") {
				saveTask(request, sender, sendResponse);
			} else if (request.req == "forget_task") {
				forgetTask(request);
			}
		}
	});