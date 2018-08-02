function getTask(id, callback) {
	var key = "task_" + id;
	chrome.storage.local.get([key], function(result) {
		console.log(key, result);
		callback(result[key]);
	});
}

function displayTask(id) {
	getTask(id, function(task) {
		$("#task > h1").text(task.title);
		$("#task-content").html(task.content);
	});
}

function diplaySubjectList() {
	chrome.storage.local.get(["tasksList"], function(liste) {
		liste = liste["tasksList"] || [];
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

// TODO: refresh / Go to task on france-ioi
// TODO: sort tasks by date