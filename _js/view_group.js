function createViewGroup(m, parent, group) {
	
	// getting photos for this group
	var photos = m.getPhotosByGroup(group.getGroupId());
	var groupId = group.getGroupId();
	
	// adding button Remove Group
	$(parent).append(createButton('remove group', function(){m.removeGroup(groupId);}));
	
	// adding button Merger Group
	var mergeNextButton = createMergeNextButton(m, parent, group, 'down', function(){m.mergeGroupNext(groupId);});
	$(parent).append(mergeNextButton);
	
	if ( m.isGroupLast(groupId) ){
		$(mergeNextButton).hide();
	}
	
	// adding photos
	for ( i in photos ) {
		$(parent).append(createPhotoContainer(photos[i].getPhotoId())); // creating container for photo
		createViewPhoto(m, "div#photo-" + photos[i].getPhotoId(), group, photos[i]); // inserting photo
	}

	// adding listeners
	createListener(m, parent, function(e){
		
		var eventType = e.getEventType();
		var data = e.getData();
		
		// actions for 'removePhoto'
		if (eventType === 'removePhoto' && data['groupId'] === group.getGroupId()){		
			$(parent + " div#photo-" + data['photoId']).remove();			
		}		
	});
}

function createPhotoContainer(photoId){
	return '<div class="photos" id="photo-' + photoId + '"></div>'
}

function createMergeNextButton(m, parent, group, title, action){

	var button = createButton(title, action);
	
	createListener(m, parent, function(e){
		
		var eventType = e.getEventType();
		
		// actions for 'removePhoto'
		if (eventType === 'changeSorting' || eventType === 'removeGroup' || eventType === 'addGroup'){
			if ( m.isGroupLast(group.getGroupId()) ){
				$(button).hide();	
			} else {
				$(button).show();
			}	
		}
	});
		
	return button;
}