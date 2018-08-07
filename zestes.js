var easterEggs = false;

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

let isConnected = false;
let username = "";

/*
	Check if connected
*/
if ($(".menuLogin .menuboxcontents > a").size()) { // Connected
	isConnected = true;
	username = $("label[for=\"menuLoginToggle\"]").text();
	$(".menuLogin").css("display", "none");
}

/*
	Change footer location and set page min-height
*/
var footer = document.getElementById("return-link-box");
if (footer) {
	document.body.appendChild(footer);

	$("#return-link-box").css("display", "none");

	var body = document.body, html = document.documentElement;
	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	$("main").css("min-height", height);
	$("#return-link-box").css("display", "block");
}

/*
	Add css classes
*/
if ($("#heading-link-box span.direction-sep").size()) {
	$("#heading-link-box").addClass("menuLiensTabs");
	$("#heading-link-box a[href=\""+window.location.href+"\"]").parent().addClass("menuLiensActuel");
}
$(".chapters-list-pbs").parent().addClass("trChapter");

/*
	Change images
*/
var eyeUrl = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OC44NSA0ODguODUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4OC44NSA0ODguODU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBkPSJNMjQ0LjQyNSw5OC43MjVjLTkzLjQsMC0xNzguMSw1MS4xLTI0MC42LDEzNC4xYy01LjEsNi44LTUuMSwxNi4zLDAsMjMuMWM2Mi41LDgzLjEsMTQ3LjIsMTM0LjIsMjQwLjYsMTM0LjIgICBzMTc4LjEtNTEuMSwyNDAuNi0xMzQuMWM1LjEtNi44LDUuMS0xNi4zLDAtMjMuMUM0MjIuNTI1LDE0OS44MjUsMzM3LjgyNSw5OC43MjUsMjQ0LjQyNSw5OC43MjV6IE0yNTEuMTI1LDM0Ny4wMjUgICBjLTYyLDMuOS0xMTMuMi00Ny4yLTEwOS4zLTEwOS4zYzMuMi01MS4yLDQ0LjctOTIuNyw5NS45LTk1LjljNjItMy45LDExMy4yLDQ3LjIsMTA5LjMsMTA5LjMgICBDMzQzLjcyNSwzMDIuMjI1LDMwMi4yMjUsMzQzLjcyNSwyNTEuMTI1LDM0Ny4wMjV6IE0yNDguMDI1LDI5OS42MjVjLTMzLjQsMi4xLTYxLTI1LjQtNTguOC01OC44YzEuNy0yNy42LDI0LjEtNDkuOSw1MS43LTUxLjcgICBjMzMuNC0yLjEsNjEsMjUuNCw1OC44LDU4LjhDMjk3LjkyNSwyNzUuNjI1LDI3NS41MjUsMjk3LjkyNSwyNDguMDI1LDI5OS42MjV6IiBmaWxsPSIjMDA2REYwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==";
var downArrow = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDQ1MS44NDYgNDUxLjg0NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDUxLjg0NiA0NTEuODQ3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoLTEuODM2OTdlLTE2IDEgLTEgLTEuODM2OTdlLTE2IDQ1MS44NDYgMC4wMDA0ODgyODEpIj48Zz4KCTxwYXRoIGQ9Ik0zNDUuNDQxLDI0OC4yOTJMMTUxLjE1NCw0NDIuNTczYy0xMi4zNTksMTIuMzY1LTMyLjM5NywxMi4zNjUtNDQuNzUsMGMtMTIuMzU0LTEyLjM1NC0xMi4zNTQtMzIuMzkxLDAtNDQuNzQ0ICAgTDI3OC4zMTgsMjI1LjkyTDEwNi40MDksNTQuMDE3Yy0xMi4zNTQtMTIuMzU5LTEyLjM1NC0zMi4zOTQsMC00NC43NDhjMTIuMzU0LTEyLjM1OSwzMi4zOTEtMTIuMzU5LDQ0Ljc1LDBsMTk0LjI4NywxOTQuMjg0ICAgYzYuMTc3LDYuMTgsOS4yNjIsMTQuMjcxLDkuMjYyLDIyLjM2NkMzNTQuNzA4LDIzNC4wMTgsMzUxLjYxNywyNDIuMTE1LDM0NS40NDEsMjQ4LjI5MnoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzJFNkIxMCIgZGF0YS1vbGRfY29sb3I9IiMyZTZiMTAiPjwvcGF0aD4KPC9nPjwvZz4gPC9zdmc+";

var srcToNewImage = {
	"../dataSite/img/item_completed.png" : "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2IDI2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNiAyNiIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CiAgPHBhdGggZD0ibS4zLDE0Yy0wLjItMC4yLTAuMy0wLjUtMC4zLTAuN3MwLjEtMC41IDAuMy0wLjdsMS40LTEuNGMwLjQtMC40IDEtMC40IDEuNCwwbC4xLC4xIDUuNSw1LjljMC4yLDAuMiAwLjUsMC4yIDAuNywwbDEzLjQtMTMuOWgwLjF2LTguODgxNzhlLTE2YzAuNC0wLjQgMS0wLjQgMS40LDBsMS40LDEuNGMwLjQsMC40IDAuNCwxIDAsMS40bDAsMC0xNiwxNi42Yy0wLjIsMC4yLTAuNCwwLjMtMC43LDAuMy0wLjMsMC0wLjUtMC4xLTAuNy0wLjNsLTcuOC04LjQtLjItLjN6IiBmaWxsPSIjNjI5OTNjIi8+Cjwvc3ZnPgo=",
	"../dataSite/img/item_validated.png" : "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2IDI2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNiAyNiIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CiAgPHBhdGggZD0ibS4zLDE0Yy0wLjItMC4yLTAuMy0wLjUtMC4zLTAuN3MwLjEtMC41IDAuMy0wLjdsMS40LTEuNGMwLjQtMC40IDEtMC40IDEuNCwwbC4xLC4xIDUuNSw1LjljMC4yLDAuMiAwLjUsMC4yIDAuNywwbDEzLjQtMTMuOWgwLjF2LTguODgxNzhlLTE2YzAuNC0wLjQgMS0wLjQgMS40LDBsMS40LDEuNGMwLjQsMC40IDAuNCwxIDAsMS40bDAsMC0xNiwxNi42Yy0wLjIsMC4yLTAuNCwwLjMtMC43LDAuMy0wLjMsMC0wLjUtMC4xLTAuNy0wLjNsLTcuOC04LjQtLjItLjN6IiBmaWxsPSIjNjZhYmZmIi8+Cjwvc3ZnPgo=",
	"../dataSite/img/item_completedOrange.png" : "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2IDI2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNiAyNiIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CiAgPHBhdGggZD0ibS4zLDE0Yy0wLjItMC4yLTAuMy0wLjUtMC4zLTAuN3MwLjEtMC41IDAuMy0wLjdsMS40LTEuNGMwLjQtMC40IDEtMC40IDEuNCwwbC4xLC4xIDUuNSw1LjljMC4yLDAuMiAwLjUsMC4yIDAuNywwbDEzLjQtMTMuOWgwLjF2LTguODgxNzhlLTE2YzAuNC0wLjQgMS0wLjQgMS40LDBsMS40LDEuNGMwLjQsMC40IDAuNCwxIDAsMS40bDAsMC0xNiwxNi42Yy0wLjIsMC4yLTAuNCwwLjMtMC43LDAuMy0wLjMsMC0wLjUtMC4xLTAuNy0wLjNsLTcuOC04LjQtLjItLjN6IiBmaWxsPSIjZjZiOTNiIi8+Cjwvc3ZnPgo=",
	"../dataSite/img/item_failed.png" : "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIxMi45ODIgMjEyLjk4MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjEyLjk4MiAyMTIuOTgyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnIGlkPSJDbG9zZSI+Cgk8cGF0aCBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7IiBkPSJNMTMxLjgwNCwxMDYuNDkxbDc1LjkzNi03NS45MzZjNi45OS02Ljk5LDYuOTktMTguMzIzLDAtMjUuMzEyICAgYy02Ljk5LTYuOTktMTguMzIyLTYuOTktMjUuMzEyLDBsLTc1LjkzNyw3NS45MzdMMzAuNTU0LDUuMjQyYy02Ljk5LTYuOTktMTguMzIyLTYuOTktMjUuMzEyLDBjLTYuOTg5LDYuOTktNi45ODksMTguMzIzLDAsMjUuMzEyICAgbDc1LjkzNyw3NS45MzZMNS4yNDIsMTgyLjQyN2MtNi45ODksNi45OS02Ljk4OSwxOC4zMjMsMCwyNS4zMTJjNi45OSw2Ljk5LDE4LjMyMiw2Ljk5LDI1LjMxMiwwbDc1LjkzNy03NS45MzdsNzUuOTM3LDc1LjkzNyAgIGM2Ljk4OSw2Ljk5LDE4LjMyMiw2Ljk5LDI1LjMxMiwwYzYuOTktNi45OSw2Ljk5LTE4LjMyMiwwLTI1LjMxMkwxMzEuODA0LDEwNi40OTF6IiBmaWxsPSIjRDgwMDI3Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
	"../dataSite/img/item_read_indisp.png" : eyeUrl,
	"../dataSite/img/item_read.png" : eyeUrl,
	"../dataSite/img/item_ready.png" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MiA0OTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5MiA0OTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgY2xhc3M9IiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgNDkyIDApIj48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NjQuMzQ0LDIwNy40MThsMC43NjgsMC4xNjhIMTM1Ljg4OGwxMDMuNDk2LTEwMy43MjRjNS4wNjgtNS4wNjQsNy44NDgtMTEuOTI0LDcuODQ4LTE5LjEyNCAgICBjMC03LjItMi43OC0xNC4wMTItNy44NDgtMTkuMDg4TDIyMy4yOCw0OS41MzhjLTUuMDY0LTUuMDY0LTExLjgxMi03Ljg2NC0xOS4wMDgtNy44NjRjLTcuMiwwLTEzLjk1MiwyLjc4LTE5LjAxNiw3Ljg0NCAgICBMNy44NDQsMjI2LjkxNEMyLjc2LDIzMS45OTgtMC4wMiwyMzguNzcsMCwyNDUuOTc0Yy0wLjAyLDcuMjQ0LDIuNzYsMTQuMDIsNy44NDQsMTkuMDk2bDE3Ny40MTIsMTc3LjQxMiAgICBjNS4wNjQsNS4wNiwxMS44MTIsNy44NDQsMTkuMDE2LDcuODQ0YzcuMTk2LDAsMTMuOTQ0LTIuNzg4LDE5LjAwOC03Ljg0NGwxNi4xMDQtMTYuMTEyYzUuMDY4LTUuMDU2LDcuODQ4LTExLjgwOCw3Ljg0OC0xOS4wMDggICAgYzAtNy4xOTYtMi43OC0xMy41OTItNy44NDgtMTguNjUyTDEzNC43MiwyODQuNDA2aDMyOS45OTJjMTQuODI4LDAsMjcuMjg4LTEyLjc4LDI3LjI4OC0yNy42di0yMi43ODggICAgQzQ5MiwyMTkuMTk4LDQ3OS4xNzIsMjA3LjQxOCw0NjQuMzQ0LDIwNy40MTh6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiM5NUE1QTYiIGRhdGEtb2xkX2NvbG9yPSIjOTVhNWE2Ij48L3BhdGg+Cgk8L2c+CjwvZz48L2c+IDwvc3ZnPg==",
	"../dataSite/img/msgs.png" : "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTEuOTk5IDUxMS45OTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMS45OTkgNTExLjk5OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zNzIuMjksNTAuNzU4SDI4LjgzMUMxMi45MzMsNTAuNzU4LDAsNjMuNjkxLDAsNzkuNTg4djIwNi4wNTZjMCwxNS44OTcsMTIuOTMzLDI4LjgzMSwyOC44MzEsMjguODMxaDIyLjI3MXY3Ni43MSAgICBjMCw0Ljg4NCwyLjk0Miw5LjI4OSw3LjQ1NiwxMS4xNTljMS40OTQsMC42MiwzLjA2NCwwLjkyLDQuNjIsMC45MmMzLjE0NCwwLDYuMjMyLTEuMjI4LDguNTQzLTMuNTM4bDg1LjI1MS04NS4yNWgxNy4xMDQgICAgYzYuNjcxLDAsMTIuMDc4LTUuNDA3LDEyLjA3OC0xMi4wNzhjMC02LjY3Mi01LjQwOS0xMi4wNzktMTIuMDc4LTEyLjA3OWMwLDAtMjIuNjksMC4wMTYtMjIuOTI3LDAuMDQgICAgYy0yLjgxMiwwLjE5MS01LjU3MiwxLjM0OS03LjcyMiwzLjQ5OGwtNjguMTY5LDY4LjE2OWMwLDAtMC4wMjEtNjAuMzkyLTAuMDYtNjAuNzA1Yy0wLjU0NS02LjE2Ni01LjcxNy0xMS4wMDItMTIuMDI0LTExLjAwMiAgICBIMjguODMxYy0yLjU3OCwwLTQuNjc0LTIuMDk3LTQuNjc0LTQuNjc0Vjc5LjU4OGMwLTIuNTc4LDIuMDk3LTQuNjc0LDQuNjc0LTQuNjc0SDM3Mi4yOWMyLjU3OCwwLDQuNjc0LDIuMDk3LDQuNjc0LDQuNjc0djc5LjA1NSAgICBjMCw2LjY3MSw1LjQwOSwxMi4wNzgsMTIuMDc4LDEyLjA3OHMxMi4wNzgtNS40MDcsMTIuMDc4LTEyLjA3OFY3OS41ODhDNDAxLjEyLDYzLjY5MSwzODguMTg3LDUwLjc1OCwzNzIuMjksNTAuNzU4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ4My4xNjksMTk4LjQ5MkgyNDIuNzU0Yy0xNS44OTcsMC0yOC44MzEsMTIuOTMzLTI4LjgzMSwyOC44MzF2MTQwLjU3YzAsMTUuODk3LDEyLjkzMywyOC44MzEsMjguODMxLDI4LjgzMWgxNTAuNTE0ICAgIGw2MC45OCw2MC45OGMyLjMxMSwyLjMxMSw1LjQsMy41MzgsOC41NDMsMy41MzhjMS41NTYsMCwzLjEyNi0wLjMwMSw0LjYyLTAuOTJjNC41MTItMS44Nyw3LjQ1Ni02LjI3Myw3LjQ1Ni0xMS4xNTl2LTUyLjQ0aDguMzAxICAgIGMxNS44OTcsMCwyOC44MzEtMTIuOTMzLDI4LjgzMS0yOC44MzFWMjI3LjMyMkM1MTIsMjExLjQyNSw0OTkuMDY3LDE5OC40OTIsNDgzLjE2OSwxOTguNDkyeiBNNDg3Ljg0NCwzNjcuODkzICAgIGMwLDIuNTc3LTIuMDk3LDQuNjc0LTQuNjc0LDQuNjc0aC0yMC4zNzZjLTYuMzU2LDAtMTEuNTU0LDQuOTEyLTEyLjAzMSwxMS4xNDdjLTAuMDMxLDAuMjY0LTAuMDUxLDM2LjI5LTAuMDUxLDM2LjI5ICAgIGwtNDMuODU0LTQzLjg1NWMtMC4wNDYtMC4wNDYtMC4wOTQtMC4wODktMC4xNC0wLjEzNWMtMC4xNzItMC4xNjgtMC4zMzUtMC4zMTQtMC40ODktMC40NDVjLTIuMTI2LTEuODY0LTQuOTAzLTMuMDAzLTcuOTUxLTMuMDAzICAgIEgyNDIuNzU0Yy0yLjU3OCwwLTQuNjc0LTIuMDk3LTQuNjc0LTQuNjc0di0xNDAuNTdjMC0yLjU3OCwyLjA5Ny00LjY3NCw0LjY3NC00LjY3NGgyNDAuNDE2YzIuNTc3LDAsNC42NzQsMi4wOTcsNC42NzQsNC42NzQgICAgVjM2Ny44OTN6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzYyLjk2NCwyODUuNTNjLTYuNjY3LDAtMTIuMDc4LDUuNDExLTEyLjA3OCwxMi4wNzhjMCw2LjY2Nyw1LjQxMSwxMi4wNzgsMTIuMDc4LDEyLjA3OCAgICBjNi42NjgsMCwxMi4wNzgtNS40MTEsMTIuMDc4LTEyLjA3OEMzNzUuMDQyLDI5MC45NDEsMzY5LjYzMSwyODUuNTMsMzYyLjk2NCwyODUuNTN6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzEwLjQ3MiwxMzAuNjExYzAsMC0yMTkuODIyLDAtMjE5LjgyMiwwYy02LjY3LDAtMTIuMDc4LDUuNDA3LTEyLjA3OCwxMi4wNzhzNS40MDksMTIuMDc4LDEyLjA3OCwxMi4wNzhoMjE5LjgyMiAgICBjNi42NywwLDEyLjA3OC01LjQwNywxMi4wNzgtMTIuMDc4UzMxNy4xNDIsMTMwLjYxMSwzMTAuNDcyLDEzMC42MTF6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTc0LjA3NSwyMTAuNDY1SDkwLjY1Yy02LjY3LDAtMTIuMDc4LDUuNDA3LTEyLjA3OCwxMi4wNzhjMCw2LjY3MSw1LjQwOSwxMi4wNzgsMTIuMDc4LDEyLjA3OGg4My40MjUgICAgYzYuNjcxLDAsMTIuMDc4LTUuNDA3LDEyLjA3OC0xMi4wNzhTMTgwLjc0NSwyMTAuNDY1LDE3NC4wNzUsMjEwLjQ2NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zMDYuODM3LDI4NS41M2MtNi42NjYsMC0xMi4wNzgsNS40MTEtMTIuMDc4LDEyLjA3OGMwLDYuNjY3LDUuNDEyLDEyLjA3OCwxMi4wNzgsMTIuMDc4ICAgIGM2LjY2OCwwLDEyLjA3OC01LjQxMSwxMi4wNzgtMTIuMDc4QzMxOC45MTUsMjkwLjk0MSwzMTMuNTA1LDI4NS41MywzMDYuODM3LDI4NS41M3oiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00MTkuMDc5LDI4NS41M2MtNi42NjcsMC0xMi4wNzgsNS40MTEtMTIuMDc4LDEyLjA3OGMwLDYuNjY3LDUuNDExLDEyLjA3OCwxMi4wNzgsMTIuMDc4ICAgIGM2LjY2OCwwLDEyLjA3OC01LjQxMSwxMi4wNzgtMTIuMDc4QzQzMS4xNTcsMjkwLjk0MSw0MjUuNzQ2LDI4NS41Myw0MTkuMDc5LDI4NS41M3oiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
	"../dataSite/img/print.png" : "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0OTAgNDkwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTAgNDkwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojMkMyRjMzOyIgZD0iTTQ4MS44NSwzNDIuOVYxNjIuMmMwLTIyLjctMTguNS00MS4yLTQxLjItNDEuMmgtNDkuNlYyNi41YzAtMTQuNi0xMS45LTI2LjUtMjYuNS0yNi41aC0yMzkuMSAgICBjLTE0LjYsMC0yNi41LDExLjktMjYuNSwyNi41VjEyMWgtNDkuNmMtMjIuNywwLTQxLjIsMTguNS00MS4yLDQxLjJ2MTgwLjdjMCwyMi43LDE4LjUsNDEuMiw0MS4yLDQxLjJoNDkuNnY3OS40ICAgIGMwLDE0LjYsMTEuOSwyNi41LDI2LjUsMjYuNWgyMzkuMWMxNC42LDAsMjYuNS0xMS45LDI2LjUtMjYuNVYzODRoNDkuNkM0NjMuNDUsMzg0LDQ4MS44NSwzNjUuNiw0ODEuODUsMzQyLjl6IE0xMTguNzUsMjYuNSAgICBjMC0zLjcsMy02LjcsNi43LTYuN2gyMzkuMWMzLjcsMCw2LjcsMyw2LjcsNi43VjEyMWgtMjUyLjVWMjYuNXogTTM3MS4zNSw0NjMuNWMwLDMuNy0zLDYuNy02LjcsNi43aC0yMzkuMmMtMy43LDAtNi43LTMtNi43LTYuNyAgICB2LTIwMWgyNTIuNXYyMDFIMzcxLjM1eiBNNDYyLjA1LDM0Mi45YzAsMTEuOC05LjYsMjEuNC0yMS40LDIxLjRoLTQ5LjZWMjUyLjZjMC01LjUtNC40LTkuOS05LjktOS45aC0yNzIuMyAgICBjLTUuNSwwLTkuOSw0LjQtOS45LDkuOXYxMTEuN2gtNDkuNmMtMTEuOCwwLTIxLjQtOS42LTIxLjQtMjEuNFYxNjIuMmMwLTExLjgsOS42LTIxLjQsMjEuNC0yMS40aDM5MS4zICAgIGMxMS44LDAsMjEuNCw5LjYsMjEuNCwyMS40VjM0Mi45TDQ2Mi4wNSwzNDIuOXoiLz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojMkMyRjMzOyIgZD0iTTc4LjU1LDE4MS42Yy0yLjYsMC01LjEsMS4xLTcsMi45Yy0xLjgsMS45LTIuOSw0LjQtMi45LDdzMS4xLDUuMSwyLjksN2MxLjksMS44LDQuNCwyLjksNywyLjkgICAgczUuMS0xLjEsNy0yLjljMS44LTEuOCwyLjktNC40LDIuOS03cy0xLjEtNS4xLTIuOS03QzgzLjc1LDE4Mi43LDgxLjE1LDE4MS42LDc4LjU1LDE4MS42eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiMzQzkyQ0E7IiBkPSJNMTc0Ljk1LDM3Ni4yaDE0MC4zYzUuNSwwLDkuOS00LjQsOS45LTkuOXMtNC40LTkuOS05LjktOS45aC0xNDAuM2MtNS41LDAtOS45LDQuNC05LjksOS45ICAgIFMxNjkuNDUsMzc2LjIsMTc0Ljk1LDM3Ni4yeiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiMzQzkyQ0E7IiBkPSJNMTc0Ljk1LDQzMi4zaDE0MC4zYzUuNSwwLDkuOS00LjQsOS45LTkuOXMtNC40LTkuOS05LjktOS45aC0xNDAuM2MtNS41LDAtOS45LDQuNC05LjksOS45ICAgIFMxNjkuNDUsNDMyLjMsMTc0Ljk1LDQzMi4zeiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiMzQzkyQ0E7IiBkPSJNMTc0Ljk1LDMyMC4xaDE0MC4zYzUuNSwwLDkuOS00LjQsOS45LTkuOXMtNC40LTkuOS05LjktOS45aC0xNDAuM2MtNS41LDAtOS45LDQuNC05LjksOS45ICAgIFMxNjkuNDUsMzIwLjEsMTc0Ljk1LDMyMC4xeiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
}
function changeImages() {
	$("img[src=\"../dataSite/img/print.png\"]").css("height", "32px").css("width", "32px");

	for (var url in srcToNewImage) {
		$("img[src=\"" + url + "\"]").attr("src", srcToNewImage[url]);
	}
}
changeImages();

$("body > header img").attr("src", zesteFiles['logo']);

var customCss = ".navigbox a:after { background-image: url(\"" + zesteFiles["ariane"] + "\"); }\n";
customCss += 'label[for="taskSaved"] { background-image: url("' + zesteFiles["offline_off"] + '"); }\n';
customCss += 'label[for="taskSaved"] div { background-image: url("' + zesteFiles["offline_on"] + '"); }\n';
$( "<style>" + customCss + "</style>" ).appendTo("head");

/*
	Tabs change url
*/
$("#task-tabs > ul > li > a").click(function() {
	updateQueryStringParam("sTab", $(this).attr("href").substring(1));
});
$("#progressionTabs > ul > li > a").click(function() {
	updateQueryStringParam("progression", $(this).attr("href").slice(-1));
});

/*
	Create menu
*/
var docsUrls = {
	"C" : "https://en.cppreference.com/w/c",
	"Cpp" : "https://en.cppreference.com/w/",
	"Python" : "https://docs.python.org/fr/3/library/index.html",
	"Pascal" : "https://www.freepascal.org/docs.var",
	"OCaml" : "http://caml.inria.fr/pub/docs/manual-ocaml/",
	"Java" : "https://docs.oracle.com/javase/10/docs/api/overview-summary.html",
	"JavaScool": "https://bit.ly/IqT6zt",
};

$.get(zesteFiles["menu_template"], function(data) {
	$("body > header.headerbox").append(data);
	$("#zesteMenu > span img").attr("src", zesteFiles["menu"]);

	urlActu = encodeURIComponent(window.location.href);
	$("#zesteLinkConnect").attr("href", $("#zesteLinkConnect").attr("href") + urlActu);
	$("#zesteLinkDeco").attr("href", $("#zesteLinkDeco").attr("href") + urlActu);

	if (isConnected) { // Connected
		$(".zesteGuestOnly").css("display", "none");
		$("#zesteMenuName a").text(username);
	} else { // Guest
		$(".zesteConnectedOnly").css("display", "none");
	}

	if (sSelectedLanguage in docsUrls) {
		$("#zesteLinkDoc").attr("href", docsUrls[sSelectedLanguage]);
	} else {
		console.log("Not found");
		$("#zesteLinkDoc").css("display", "none");
	}
});

/*
	Overload jQuery get method to update new content
*/
jqGet = $.get;
$.get = function(url, callback) {
	jqGet(url, function(result) {
		callback(result);
		changeImages();
	})
};

/*
	Fiche publique
*/
var fichePseudo = $(".avatar-display tr + tr b");
if (fichePseudo.size() && fichePseudo.text() == username) {
	console.log("Mine");
	$("label[for=\"manageAuthToggle\"] + .indentedContent > a").each(function(id) {
		$(".perso-fiche-edit").append($(this));
	});
}

/*
	Some other easter eggs
*/
if (easterEggs) {
	$('img[src="http://data.france-ioi.org/Course/asso_presentation/simon_mauras.png"]').attr("src", zesteFiles['piscine']).css("width", "100px");
	if (fichePseudo.size() && fichePseudo.text() == "mathias") {
		$(".avatar-display img").attr("src", zesteFiles["crown"]);
	}
	$(".avatar-display td").each(function(id) {
		var el = $(this);
		if (el.text() == "niveau 10") {
			el.html("<strong>WHAT ???</strong>")
		}
	});
}
if ($("#homeContents").size()) {
	if (easterEggs) {
		$("#homeContents").html($("#homeContents").html().replace(/Rémy Kimbrough/g,'Flamby'));
	}
	var the_game = $("<h4>THE GAME</h4>").css("color", "transparent").css("font-size", "2rem").css("text-align", "center");
	$(".contentsbox").append(the_game);
}
$(".classement_row_data td").each(function(id) {
	var el = $(this);
	if (el.text() == "2042") {
		el.css("text-decoration", "underline");
	}
})