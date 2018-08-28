/*
	Follow users
*/

function setFollowingtate(state) {
	$("#followButton").prop("checked", state);
}

function followUsersInternal() {
	let username = "";
	if ($(".menuLogin .menuboxcontents > a").length) { // Connected
		username = $("label[for=\"menuLoginToggle\"]").text();
	}

	if ($(".perso-page").length) {
		let otherName = $("#sLogin").val();
		if (otherName != username) {
			var followDOM = $('<input type="checkbox" id="followButton" /><label for="followButton"><div></div><span>Suivre cet utilisateur</span></label>');
			$(".perso-page").append(followDOM);

			chrome.runtime.sendMessage({
				"req": "on_user",
				"username": otherName,
			});

			$("#followButton").change(function() {
				var state = $(this).prop('checked');
				if (state) {
					chrome.runtime.sendMessage({
						"req": "follow_user",
						"username": otherName,
					});
				} else {
					chrome.runtime.sendMessage({
						"req": "unfollow_user",
						"username": otherName,
					});
				}
			});

			$(window).focus(function(e) {
				chrome.runtime.sendMessage({
					"req": "on_user",
					"username": otherName,
				});
			});
		}
	}
}

/*
	Message listner
*/

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (!sender.tab) {
			if (request.req == "is_user_followed") {
				setFollowingtate(request.followed);
			}
		}
	});