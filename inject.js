function startInjection() {
	function getZesteFilesJS() {
		let zesteFiles = {
			"logo" : "img/logo.png",
			"ariane" : "img/ariane.png",
			"menu" : "img/menu.png",
			"piscine" : "img/piscine.jpg",
			"crown" : "img/crown.png",
			"menu_template" : "html/menu.html",
			"formatBar_template" : "html/formatBar.html",
			"offline_off" : "img/offline_off.png",
			"offline_on": "img/offline_on.png",
			"focus": "img/focus.png",
			"emojis": "img/emojis",
		};
		for (let name in zesteFiles) {
			zesteFiles[name] = chrome.extension.getURL(zesteFiles[name]);
		}

		return ['zesteFiles = ' + JSON.stringify(zesteFiles) + ';'].join('\n');
	}
	let zConfig;
	function getZesteConfig() {
		return ['zesteConfig = ' + JSON.stringify(zConfig) + ';'].join('\n');
	}

	let zModules = [
		{
			name: "Zeste datas",
			js: [getZesteFilesJS, getZesteConfig],
		},
		{
			name: "Core module",
			js: ["modules/core/core.js"],
		},
		{
			name: "Website base changes",
			js: ["modules/fixes/fixes.js"],
		},
		{
			name: "Forum text-editor",
			js: ["modules/text_editor/edit_bar.js"],
			css: ["modules/text_editor/edit_bar.css"],
			require: ["text_editor"],
		},
		{
			name: "Zeste style",
			js: ["modules/zeste_style/zestes.js"],
			css: ["modules/zeste_style/zestes.css"],
			require: ["zeste"],
		},
		{
			name: "Submisions style",
			css: ["modules/submissions/submissions.css"],
			require: ["submissions"],
		},
		{
			name: "Task saver button",
			css: ["modules/task_saver/button.css"],
			js: ["modules/task_saver/button.js"],
			internal: [taskSaverInternal],
			require: ["task_saver"],
		},
		{
			name: "Compact mode",
			css: ["modules/compact/compact.css"],
			js: ["modules/compact/compact.js"],
			require: ["compact"],
		},
		{
			name: "Follow users",
			css: ["modules/follow/follow.css"],
			internal: [followUsersInternal],
			require: ["follow_users"],
		},
		{
			name: "Focus mode",
			css: ["modules/focus_mode/focus.css"],
			js: ["modules/focus_mode/focus.js"],
		},
	];

	config.get(function(configValues) {
		zConfig = configValues;
		let body = document.body;
		let head = document.head;

		for (let mod of zModules) {
			function injectThisMod() {
				if (mod.js) {
					for (let scriptContent of mod.js) {
						let scriptDomEl = document.createElement('script');
						if (typeof scriptContent == "string") {
							scriptDomEl.src = chrome.extension.getURL(scriptContent);
						} else { // function
							scriptDomEl.textContent = scriptContent();
						}
						head.appendChild(scriptDomEl);
					}
				}
				if (mod.css) {
					for (let cssContent of mod.css) {
						let link = document.createElement('link');
						link.rel = "stylesheet";
						link.type = "text/css";
						link.href = chrome.extension.getURL(cssContent);
						head.appendChild(link);
						$(body).append($(link).clone());
					}
				}
				if (mod.internal) {
					for (let func of mod.internal) {
						func();
					}
				}
			}
			let canInject = true;
			if (mod.require) {
				for (let condition of mod.require) {
					if (!configValues["enable_" + condition]) {
						canInject = false;
					}
				}
			}
			if (canInject) {
				injectThisMod();
			}
		}
		$(function() {
			document.documentElement.classList.add("zestes");
		});
	});
}
document.addEventListener('DOMContentLoaded', startInjection);
