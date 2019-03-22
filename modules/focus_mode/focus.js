$(function() {
	$(".links-box-middle + td").width(140).prepend(
		$('<input type="checkbox" id="focusMode" /><label for="focusMode"><div></div><span>Mode sans distraction</span></label>')
	);
	var customCss = 'label[for="focusMode"] div { background-image: url("' + zesteFiles["focus"] + '"); }\n';
	$( "<style>" + customCss + "</style>" ).appendTo("head");
	$("#focusMode").change(function() {
		$(".menucol, .return-link-box, .arrowIcon")[this.checked ? 'fadeOut' : 'fadeIn']();
	});
});
