/*
	Offline subject view
*/

function setTaskSavedState(state) {
	$("#taskSaved").prop("checked", state);
}

function taskSaverInternal() {
	if (document.location.pathname == "/algo/task.php" && $("#task-tabs").length) {
		var taskContent = $("#task").html();
		var taskTitle = $("#heading-link-box .direction-box h1").clone()    //clone the element
				.children() //select all the children
				.remove()   //remove all the children
				.end()  //again go back to selected element
				.text();

      var variables;
      $("script:not([src])").each(function() {
         var scriptContent = $(this).text();
         if (scriptContent.match(/^\s*var\s*idTask\s*=/)) {
            variables = scriptContent;
         }
      });
      eval(variables);

		var req = {
			"req": "on_task",
			"task": idTask,
			"chapter": idChapter,
		}

		var savedDom = $('<input type="checkbox" id="taskSaved" /><label for="taskSaved"><div></div><span>Sauvegarder le sujet hors ligne</span></label>');
		$(".links-box-middle + td").first().prepend(savedDom);

		chrome.runtime.sendMessage(req);

		req.content = taskContent;
		req.req = "save_task";
		req.title = taskTitle;

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

		$(window).focus(function(e) {
			var req2 = {
				"req": "on_task",
				"task": idTask,
				"chapter": idChapter,
			}
			chrome.runtime.sendMessage(req2);
		});
	}
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
