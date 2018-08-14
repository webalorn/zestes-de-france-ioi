/*
	Create formatBar
*/

$.get(zesteFiles["formatBar_template"], function(formatBar) {
	function createBar(textarea) {
		var barre = $(formatBar);
		barre.insertBefore(textarea);

		// Popups
		barre.find(".zFormatPopup").each(function(id) {
			var popup = $(this);
			popup.parent().click(function() {
				if (popup.css("display") == "none") {
					$(".zFormatPopup").css("display", "none");
					popup.css("display", "block");
				} else {
					popup.css("display", "none");
				}
				return false;
			});
			popup.click(function(){return false;});
			$(document).click(function(){
				popup.css("display", "none");
			});
		});

		// Emojis
		barre.find('.emojiList img').each(function() {
			var ascii = $(this).attr('alt');
			$(this).click(function() {
				zInsertAtCursor(textarea, '[' + ascii + ']');
				$(this).parent().css("display", "none");
			});
		});

		// Languages
		barre.find(".langList li").each(function() {
			var lang = $(this).attr('data-lang');
			$(this).click(function() {
				zInsertAtCursor(textarea, '\n<' + lang + '>\n', '\n</' + lang + '>\n');
				$(this).parent().css("display", "none");
			});
		});

		// Autres elements
		barre.find(".zInsert").click(function() {
			zInsertAtCursor(textarea,
				$(this).attr("data-before").replace("\\n", "\n").replace("\\n", "\n"),
				$(this).attr("data-after").replace("\\n", "\n").replace("\\n", "\n")
			);
			return false;
		});
		barre.find(".zInsertPrompt").click(function() {
			var url = prompt($(this).attr("data-prompt"), $(this).attr("data-default"));
			if (url) {
				zInsertAtCursor(textarea,
					$(this).attr("data-start").replace("\\n", "\n").replace("\\n", "\n") + url +
					$(this).attr("data-end").replace("\\n", "\n").replace("\\n", "\n")
				);
			}
			return false;
		});
	}
	$(".thread-write").each(function() {
		createBar($(this));
	})
	$(".zEmoji").attr("src", zesteFiles['emojis'] + "/emot-souriant.png");
	$(".emojiList img").each(function() {
		var prefix = "../dataSite/img/";
		if (zesteConfig.enable_zeste && zesteConfig.custom_emojis) {
			prefix = zesteFiles['emojis'] + "/";
		}
		$(this).attr("src", prefix + $(this).attr("src"));
	});
});