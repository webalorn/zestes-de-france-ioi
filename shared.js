function updateQueryStringParam(key, value) {
	var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
		urlQueryString = document.location.search,
		newParam = key + '=' + value,
		params = '?' + newParam;
	if (urlQueryString) {
		keyRegex = new RegExp('([\?&])' + key + '[^&]*');
		if (urlQueryString.match(keyRegex) !== null) {
			params = urlQueryString.replace(keyRegex, "$1" + newParam);
		} else {
			params = urlQueryString + '&' + newParam;
		}
	}
	window.history.replaceState({}, "", baseUrl + params);
}
function removeParam(parameter) {
	var url=document.location.href;
	var urlparts= url.split('?');

	if (urlparts.length>=2) {
		var urlBase=urlparts.shift(); 
		var queryString=urlparts.join("?"); 

		var prefix = encodeURIComponent(parameter)+'=';
		var pars = queryString.split(/[&;]/g);
		for (var i= pars.length; i-->0;)               
			if (pars[i].lastIndexOf(prefix, 0)!==-1)   
				pars.splice(i, 1);
		url = urlBase+'?'+pars.join('&');
		window.history.replaceState('',document.title,url);

	}
	return url;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

function transformTaskDom(taskDom, callback) {
	var selector = taskDom.find("img[src^=http]");
	if (selector.length) {
		var el = selector.first();

		function toDataURL(url) {
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				var reader = new FileReader();
				reader.onloadend = function() {
					el.attr("src", reader.result);
					transformTaskDom(taskDom, callback);
				}
				reader.readAsDataURL(xhr.response);
			};
			xhr.open('GET', url);
			xhr.responseType = 'blob';
			xhr.send();
		}
		toDataURL(el.attr("src"));
	} else {
		callback(taskDom.html());
	}
}

function transformTask(taskHtml, callback) {
	transformTaskDom($(taskHtml), callback);
}

var offlineTasks = {
	getTaskList: function (callback) {
		chrome.storage.local.get(["tasksList"], function(liste) {
			liste = liste["tasksList"] || [];
			callback(liste);
		});
	},
	is_saved: function (id, callback) {
		var key = "task_" + id;
		chrome.storage.local.get([key], function(result) {
			result = result[key];
			callback(result != null && result != undefined);
		});
	},
	getTask: function (id, callback) {
		var key = "task_" + id;
		chrome.storage.local.get([key], function(result) {
			callback(result[key]);
		});
	},
	saveTask: function (id, content, callback) {
		this.getTaskList(function(liste) {
			transformTask(content.content, function(newContent) {
				content.content = newContent;
				if (liste.indexOf(id) == -1) {
					liste.push(id);
				}
				var key = "task_" + id;
				var setRequest = {};
				setRequest[key] = content;
				chrome.storage.local.set(setRequest, function() {
					chrome.storage.local.set({"tasksList" : liste}, callback);
				});
			});
		});
	},
	forgetTask: function (id, callback) {
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

var usersFollowing = {
	getFollowingList: function (callback) {
		chrome.storage.local.get(["followingList"], function(liste) {
			liste = liste["followingList"] || [];
			callback(liste);
		});
	},
	isFollowed: function (username, callback) {
		this.getFollowingList(function(followingList) {
			callback(followingList.indexOf(username) != -1);
		});
	},
	updateFollowingList: function(newList, callback) {
		chrome.storage.local.set({followingList : newList}, callback);
	},
	followUser: function (username, callback) {
		var me = this;
		this.getFollowingList(function(followingList) {
			var index = followingList.indexOf(username);
			if (index == -1) {
				followingList.push(username);
				me.updateFollowingList(followingList, callback);
			}
		});
	},
	unfollowUser: function (username, callback) {
		var me = this;
		this.getFollowingList(function(followingList) {
			var index = followingList.indexOf(username);
			if (index > -1) {
				followingList.splice(index, 1);
				me.updateFollowingList(followingList, callback);
			}
		});
	},
};

var config = {
	default: {
		enable_text_editor: true,
		enable_zeste: true,
		zeste_menu: true,
		enable_submissions: true,
		enable_task_saver: true,
		custom_emojis: true,
		enable_compact: false,
		compact_rm_menus: true,
		enable_follow_users: true,
	},
	get: function(callback) {
		var configObj = this;
		chrome.storage.local.get(["config"], function(result) {
			let cfg = result.config || {};
			for (let key in configObj.default) {
				if (!(key in cfg)) {
					cfg[key] = configObj.default[key];
				}
			}
			callback(cfg);
		});
	},
	set: function(value, callback) {
		chrome.storage.local.set({config: value}, callback);
	},
	getVal: function(key, callback) {
		this.get(function(cfg) {
			return cfg[key];
		});
	},
	setVal: function(key, value, callback) {
		var configObj = this;
		this.get(function(cfg) {
			cfg[key] = value;
			configObj.set(cfg, callback);
		});
	},
}