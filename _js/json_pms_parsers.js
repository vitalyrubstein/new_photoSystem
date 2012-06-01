function parseDataFromPMS(json){
	
	var hashPhotos = {};
	var photoIds = [];
	
	var hashGroups = {};
	var groupIds = [];
		
	$.each(json, function(i,v){
		var groupPhotoIds = [];
		$.each(v, function(ii,v){
			var p = new Photo(v.id, v.date);
			groupPhotoIds.push(v.id);
			photoIds.push(v.id);
			hashPhotos[v.id] = p; // creates new photo object (hash table) {photoId: PhotoObject}
		});
		var groupId = randomIntNumber(100000000);
		var g = new Group(groupId, groupPhotoIds);
		hashGroups[groupId] = g; // creates new group object (hash table) {groupId: GroupObject}
		groupIds.push(groupId);
	});
	
	// reversing group order to show most recent pictures on top by default
	groupIds.reverse();

	return {'groups': hashGroups, 'groupIds': groupIds,  'photos': hashPhotos};

}








