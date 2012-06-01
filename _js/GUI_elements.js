function createButton(title, clickAction){
	return $('<button id="' + title + '">' + title + '</button>').click(clickAction);
}