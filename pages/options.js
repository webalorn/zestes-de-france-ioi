$(function() {
	$(".optionsList input").change(function() {
		var el = $(this);
		el.parent().find("ul li input").prop("disabled", !this.checked);

		config.setVal(el.attr('data-cfg'), this.checked);
	});

	config.get(function(cfg) {
		$(".optionsList input").each(function() {
			var el = $(this);
			el.prop("checked", cfg[el.attr('data-cfg')]);
		}).each(function(id) {
			$(this).parent().find("ul li input").prop("disabled", !this.checked);
		});
	});
});