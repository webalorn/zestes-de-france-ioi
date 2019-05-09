/*
	Focus mode
*/

function setFocusState(state) {
	$("#focusMode").prop("checked", state).trigger("change");
}

function focusInternal() {
	if ($(".heading-link-box.with-title").length) {
		let cell = $("#heading-link-box .links-box-middle + td");
		if ($("#taskSaved").length) {
			cell.width(140);
		}
		cell.prepend(
			$('<input type="checkbox" id="focusMode" /><label for="focusMode"><div></div><span>Mode sans distraction</span></label>')
		);
		focusImgUrl = chrome.extension.getURL("img/focus.png")
		let customCss = 'label[for="focusMode"] div { background-image: url("' + focusImgUrl + '"); }\n';
		$( "<style>" + customCss + "</style>" ).appendTo("head");
		$("#focusMode").change(function() {
			$(".menucol, .return-link-box")[this.checked ? 'fadeOut' : 'fadeIn'](200);
			if (this.checked) {
				$(".headerbox").animate({height:"0px", opacity: 0});
			} else {
				$(".headerbox").animate({height: "60px", opacity: 1});
			}

			chrome.runtime.sendMessage({
				"req": "set_focus_mode",
				"is_focused": this.checked,
			});
		});
		setTimeout(function() { // setTimeout allow focus mode to hide the new menu element [workaround]
			chrome.runtime.sendMessage({"req": "on_focusable_page"});
		}, 0);
		$(window).focus(function(e) {
			chrome.runtime.sendMessage({"req": "on_focusable_page"});
		});
	}
}

/*
	Message listner
*/

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (!sender.tab) {
			if (request.req == "is_focus_enabled") {
				setFocusState(request.focusEnabled);
			}
		}
	});