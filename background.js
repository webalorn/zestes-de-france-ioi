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
	offlineTasks.forgetTask(request.task);
}

function onUser(request, sender, sendResponse) {
	usersFollowing.isFollowed(request.username, function(is_followed) {
		chrome.tabs.sendMessage(sender.tab.id, {req: "is_user_followed", followed: is_followed});
	});
}
function followUser(request, sender, sendResponse) {
	usersFollowing.followUser(request.username);
}
function unfollowUser(request, sender, sendResponse) {
	usersFollowing.unfollowUser(request.username);
}

function onFocusablePage(request, sender, sendResponse) {
	chrome.storage.local.get(["is_focused"], function(vars) {
		isFocused = vars["is_focused"] || false;
		chrome.tabs.sendMessage(sender.tab.id, {req: "is_focus_enabled", focusEnabled: isFocused});
	});
}
function setFocusMode(request, sender, sendResponse) {
	chrome.storage.local.set({is_focused : request.is_focused});
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
			} else if (request.req == "on_user") {
				onUser(request, sender, sendResponse);
			} else if (request.req == "follow_user") {
				followUser(request, sender, sendResponse);
			} else if (request.req == "unfollow_user") {
				unfollowUser(request, sender, sendResponse);
			} else if (request.req == "on_focusable_page") {
				onFocusablePage(request, sender, sendResponse);
			} else if (request.req == "set_focus_mode") {
				setFocusMode(request, sender, sendResponse);
			}
		}
	});