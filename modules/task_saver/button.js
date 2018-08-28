var customCss = 'label[for="taskSaved"] { background-image: url("' + zesteFiles["offline_off"] + '"); }\n';
customCss += 'label[for="taskSaved"] div { background-image: url("' + zesteFiles["offline_on"] + '"); }\n';
$( "<style>" + customCss + "</style>" ).appendTo("head");