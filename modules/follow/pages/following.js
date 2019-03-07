var lastUpdateList = [];
var rating = {};

function createPersoRow(title, content) {
	return $('<tr><td><span class="perso-title">'+title+'</span></td><td>'+content+'</td></tr>');
}

function dateToDuration(date) {
	date = date.split('/');
	date = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]));
	var duration = Date.now() - date;
	var output = "";
	duration = duration / (1000 * 3600 * 24);
	var year = 365.25;

	var nbYears = 0;
	while (duration >= year) {
		duration -= year;
		nbYears += 1;
	}
	duration = Math.floor(duration);
	if (nbYears > 1) {
		output = output + nbYears + " ans";
	} else if (nbYears == 1) {
		output = "1 an";
	}
	if (duration > 0) {
		if (output != "") {
			output += " ";
		}
		output += duration + " jour";
		if (duration > 1) {
			output += "s";
		}
	}
	return output;
}

function getUser(username, callback) {
	$.get('http://www.france-ioi.org/user/perso.php?sLogin=' + username + '&bShow=Afficher', function (data) {
		var page = $(data).find(".perso-page");
		page.find('img').each(function() {
			var image = $(this);
			if (image.attr("src").startsWith("../")) {
				image.attr("src", image.attr("src").replace("../", "http://www.france-ioi.org/"));
			}
		});
		page.find(".perso-fiche-edit").remove();
		if (username in rating) {
			var table = page.find(".perso-details-table tbody");
			var ratingRow = createPersoRow('Classement', rating[username].rating);
			ratingRow.find('td').eq(1).addClass('ratingTd');

			table.append(ratingRow);
			table.append(createPersoRow('Résolus', rating[username].solved));
		}
		var date = page.find(".user-recent-sub tr").eq(1).find("td").eq(3).find('a');
		if (date.length != 0) {
			date = date.text();
			date = dateToDuration(date);
			if (date == "") {
				date = "aujourd'hui";
			} else {
				date = "il y a " + date;
			}
			table.append(createPersoRow("Dernier résolu", date));
		}
		callback(page);
	});
}

function displayUser(username) {
	updateQueryStringParam("user", username);
	$("#mainButtonOverall").css("display", "none");
	$("#userProfile > h1").text(username);
	$("#userLink").off().click(function() {
		chrome.tabs.create({url: 'http://www.france-ioi.org/user/perso.php?sLogin=' + username + '&bShow=Afficher'});
	}).css("display", "inline-block");

	var userContent = $("<div></div>");
	$("#userContent").children().remove();
	$("#userContent").append(userContent);
	userContent.html('<img src="/img/loader.svg" alt="loading..." class="loader" />');

	getUser(username, function(userInfos) {
		userContent.html(userInfos.html());
		var script = $(".perso-page  > div > script").text();
		var checkRegex = /&chk=(.*)&iCategorie/g;
		drawChartOf(username, checkRegex.exec(script)[1]);
	});
}

function getRating(callback) {
	$.get('http://www.france-ioi.org/algo/rankingMain.php', function (data) {
		var page = $(data);
		page.find(".contentsbox > table").first().remove();
		page = page.find(".contentsbox > table").first();

		var lastRatingId = '0';
		var newRating = {};
		page.find('.classement_row_data').each(function() {
			var rowVals = $(this).find("td");
			if (rowVals.length < 2) {
				return;
			}
			var ratingId = rowVals.eq(0).text();
			var rowUsername = rowVals.eq(1).find("a").text();
			var nbSolved = rowVals.eq(4).text();

			if (ratingId) {
				lastRatingId = ratingId;
			}
			newRating[rowUsername] = {
				rating: lastRatingId,
				solved: nbSolved,
			};
		});
		rating = newRating;
		if (callback) {
			callback(rating);
		}
	});
}

function addUserTile(username, overall, userTile, callback) {
	getUser(username, function(userProfile) {
		userTile.find("h2").text(username).click(function() {
			displayUser(username);
		});
		overall.append(userTile);
		userTile.find(".userTileImg img")
			.attr("src", userProfile.find(".avatar-display img").attr("src"))
			.click(function() {
				chrome.tabs.create({url: 'http://www.france-ioi.org/user/perso.php?sLogin=' + username + '&bShow=Afficher'});
			});
		userTile.find(".levelLi").text(userProfile.find(".avatar-display td").eq(2).text());

		userProfile.find("tr").each(function(){
			var row = $(this);
			var title = row.find(".perso-title").text();
			var content = row.find("td").eq(1).text();
			if (title == 'Classement') {
				userTile.find(".rankLi span").text(content);
				userTile.find(".rankLi").css('display', 'block');
			} else if (title == 'Année du bac') {
				userTile.find(".bacYear	span").text(content);
				userTile.find(".bacYear").css('display', 'block');
			} else if (title == 'Commentaire') {
				userTile.find(".section2 p").text(content).css('display', 'block');
			} else if (title == 'Résolus') {
				userTile.find(".solved span").text(content);
				userTile.find(".solved").css('display', 'block');
			} else if (title == 'Prénom') {
				userTile.find(".first_name").text(content);
				userTile.find(".section2 h4").css('display', 'block');
			} else if (title == 'Nom') {
				userTile.find(".last_name").text(content);
				userTile.find(".section2 h4").css('display', 'block');
			}
		});

		var date = userProfile.find(".user-recent-sub tr").eq(1).find("td").eq(3);
		if (date.length != 0) {
			date = date.text();
			date = dateToDuration(date);
			if (date == "") {
				date = "aujourd'hui";
			} else {
				date = "il y a " + date;
			}
			userTile.find(".lastSolvedAt span").text(date);
		} else {
			userTile.find(".lastSolvedAt").css("display", "none");
		}
		callback();
	});
}

function displayOverall() {
	$("#mainButtonOverall").css("display", "none");
	removeParam("user");
	var nbStillToAdd = lastUpdateList.length;
	if (nbStillToAdd == 0) {
		return;
	}

	$("#userProfile > h1").text("Tous les utilisateurs suivis")
	$("#userContent").children().remove();
	var overall = $('<div class="overall"></div>');
	$("#userContent").append(overall);
	$("#userLink").css("display", "none");

	var loading = $('<img src="/img/loader.svg" alt="loading..." class="loader" />');
	$("#userContent").append(loading);

	$.get("tile_template.html", function(tile_template) {
		for (username of lastUpdateList) {
			addUserTile(username, overall, $(tile_template), function() {
				nbStillToAdd -= 1;
				if (nbStillToAdd == 0) {
					loading.remove();
				}
			});
		}
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

		if (getParameterByName("user") || !lastUpdateList) {
			$("#mainButtonOverall").css("display", "none");
		}
	});
}

$(".buttonOverall").click(displayOverall);

getRating();
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