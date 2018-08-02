var lastUpdateList = [];

function getTask(id, callback) {
	var key = "task_" + id;
	chrome.storage.local.get([key], function(result) {
		callback(result[key]);
	});
}

function displayTask(id) {
	updateQueryStringParam("task", id);
	getTask(id, function(task) {
		$("#task > h1").text(task.title);
		$("#task-content").html(task.content);
	});
}

function listEq(l1, l2) {
	if (l1.length != l2.length) {
		return false;
	}
	for (var i in l1) {
		if (l1[i] != l2[i]) {
			return false;
		}
	}
	return true;
}

function diplaySubjectList() {
	chrome.storage.local.get(["tasksList"], function(liste) {
		liste = liste["tasksList"] || [];
		if (listEq(liste, lastUpdateList)) {
			return false;
		}
		lastUpdateList = liste;
		$("aside ul").children().remove();
		for (let i in liste) {
			let taskId = liste[i];
			getTask(taskId, function(task) {
				var el = $('<li>' + task.title + '</li>').click(function() {
					displayTask(taskId);
				});
				$("aside ul").append(el);
			});
		}
	});
}
diplaySubjectList();
if (getParameterByName("task")) {
	displayTask(getParameterByName("task"));
}

$(window).focus(function(e) {
    diplaySubjectList();
});

// TODO: refresh / Go to task on france-ioi
// TODO: sort tasks by date
// TODO: remove subject from viewer