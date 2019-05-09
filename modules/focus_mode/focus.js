$(function() {
	if ($(".heading-link-box.with-title").length) {
	   let cell = $("#heading-link-box .links-box-middle + td");
	   if ($("#taskSaved").length) {
	      cell.width(140);
      }
      cell.prepend(
		   $('<input type="checkbox" id="focusMode" /><label for="focusMode"><div></div><span>Mode sans distraction</span></label>')
	   );
	   let customCss = 'label[for="focusMode"] div { background-image: url("' + zesteFiles["focus"] + '"); }\n';
	   $( "<style>" + customCss + "</style>" ).appendTo("head");
	   $("#focusMode").change(function() {
		   $(".menucol, .return-link-box, .arrowIcon")[this.checked ? 'fadeOut' : 'fadeIn']();
	   });
   }
});
