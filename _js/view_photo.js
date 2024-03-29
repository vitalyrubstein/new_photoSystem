function createViewPhoto(m, parent, group, photo) {
	
	var splitButton = createSplitButton(m, parent, group, photo, 'split', function(){m.splitGroup(photo.getPhotoId())}); 
	var photoId = photo.getPhotoId();
	
	$(parent)
		.append('<span>' + photoId + '</span>')
		.append(createButton('remove', createRemovePhotoAction(m, photoId)))
		.append(splitButton);
		
		if (  group.getPhotoIndex(photoId) === 0 ){
			$(splitButton).hide();
		}
}

function createSplitButton(m, parent, group, photo, title, action){

	var button = createButton(title, action);
	
	createListener(m, parent, function(e){
		
		var eventType = e.getEventType();
		var data = e.getData();
		var photoId = photo.getPhotoId();
		var groupId = group.getGroupId();
		 
		// actions for 'removePhoto'
		if ( eventType === 'removePhoto' && data['groupId'] === groupId ){
			if ( group.getPhotoIndex(photoId) === 0 ) {
				$(button).hide();	
			} else {
				$(button).show();
			}	
		}
	});
		
	return button;
}