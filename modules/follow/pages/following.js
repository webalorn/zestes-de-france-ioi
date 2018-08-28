var lastUpdateList = [];

function getUser(username, callback) {
	$.get('http://www.france-ioi.org/user/perso.php?sLogin=' + username + '&bShow=Afficher', function (data) {
		var page = $(data).find(".perso-page");
		page.find('img').each(function() {
			var image = $(this);
			if (image.attr("src").startsWith("../")) {
				image.attr("src", image.attr("src").replace("../", "http://www.france-ioi.org/"));
			}
		});
		callback(page.html());
	});
}

function displayUser(username) {
	updateQueryStringParam("user", username);
	$("#userProfile > h1").text(username);
	$("#userLink").off().click(function() {
		chrome.tabs.create({url: 'http://www.france-ioi.org/user/perso.php?sLogin=' + username + '&bShow=Afficher'});
	}).css("display", "inline-block");

	var userContent = $("<div></div>");
	$("#userContent").children().remove();
	$("#userContent").append(userContent);
	userContent.html('<img src="/img/loader.svg" alt="loading..." class="loader" />');

	getUser(username, function(userInfos) {
		userContent.html(userInfos);
		var script = $(".perso-page  > div > script").text();
		var checkRegex = /&chk=(.*)&iCategorie/g;
		drawChartOf(username, checkRegex.exec(script)[1]);
	});
}

function displayUsersList() {
	usersFollowing.getFollowingList(function(liste) {
		if (listEq(liste, lastUpdateList)) {
			return false;
		}
		lastUpdateList = liste;
		var children = $("aside ul").children();
		for (let username of liste) {
			var el = $('<li>' + username + '</li>').click(function() {
				displayUser(username);
			});
			$("aside ul").append(el);
			var img = $('<img src="/img/delete.svg" />').click(function() {
				if (confirm("Voulez-vous vraiment ne plus suivre \"" + username + "\" ?")) {
					usersFollowing.unfollowUser(username, function() {
						displayUsersList();
					});
				}
				return false;
			});
			el.append(img);
		}
		children.remove();
	});
}
displayUsersList();
if (getParameterByName("user")) {
	var username = getParameterByName("user");
	usersFollowing.isFollowed(username, function(isFollowed) {
		if (isFollowed) {
			displayUser(username);
		}
	});
}

$(window).focus(function(e) {
    displayUsersList();
});
