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
		$("#taskLink").off().click(function() {
			chrome.tabs.create({url: 'http://www.france-ioi.org/algo/task.php?idChapter=' + task.chapter + '&idTask=' + id});
		}).css("display", "inline-block");
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
		var children = $("aside ul").children();
		for (let i in liste) {
			let taskId = liste[i];
			getTask(taskId, function(task) {
				var el = $('<li>' + task.title + '</li>').click(function() {
					displayTask(taskId);
				});
				$("aside ul").append(el);
				var img = $('<img src="/img/delete.svg" />').click(function() {
					if (confirm("Voulez-vous vraiment supprimer le sujet \"" + task.title + "\" ?")) {
						offlineTasks.forgetTask(taskId, function() {
							diplaySubjectList();
						});
					}
					return false;
				});
				el.append(img);
			});
		}
		children.remove();
	});
}
diplaySubjectList();
if (getParameterByName("task")) {
	displayTask(getParameterByName("task"));
}

$(window).focus(function(e) {
    diplaySubjectList();
});
