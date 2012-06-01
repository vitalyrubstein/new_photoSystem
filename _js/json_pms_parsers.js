// function createPhotos(json){
// 	var photos = [];
// 	
// 	$.each(json, function(i,v){
// 		$.each(v, function(i,v){
// 			photos.push(new Photo(v.id, v.date));
// 		});
// 	});
// 	
// 	return photos;
// }

function parseDataFromPMS(json){
	
	var allPhotos = [];
	var groups = [];
		
	$.each(json, function(i,v){
		var photos = [];
		$.each(v, function(ii,v){
			var p = new Photo(v.id, v.date);
			photos.push(p);
			allPhotos.push(p);
		});
		var groupId = randomIntNumber(100000000);
		var g = new Group(groupId, photos);
		groups.push(g);
	});
	
	// reversing group order to show most recent pictures on top by default
	groups.reverse();
	return {'groups' : groups, 'photos' : allPhotos};

}

function parseDataFromPMS2(json){
	
	var hashPhotos = {};
	var photoIds = [];
	
	var hashGroups = {};
	var groupIds = [];
		
	$.each(json, function(i,v){
		var photos = [];
		$.each(v, function(ii,v){
			var p = new Photo(v.id, v.date);
			photos.push(p);
			hashPhotos[v.id] = p; // creates new photo object (hash table) {photoId: PhotoObject}
			photoIds.push(v.id);
		});
		var groupId = randomIntNumber(100000000);
		var g = new Group(groupId, photos);
		hashGroups[groupId] = g; // creates new group object (hash table) {groupId: GroupObject}
		groupIds.push(groupId);
	});
	
	// reversing group order to show most recent pictures on top by default
	groupIds.reverse();

	return {'groups': hashGroups, 'groupIds': groupIds,  'photos': hashPhotos, 'photoIds': photoIds};

}

function parseDataFromPMS3(json){
	
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








