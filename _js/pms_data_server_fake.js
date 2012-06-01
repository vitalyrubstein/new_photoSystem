// WORK IN PROGRESS!!! NOT FINISHED! This is necessary for offline mode.
function PhotoDataServerFake() {
	
	var groups = [];
	var allPhotos = [];
	var numberOfGroups = 10;
	var numberOfPhotos = 20;
	var photoId = 10000000;
	var photoDate = 61938778;
	
	this.getPhotos = function(seconds, userID, callback){
		for ( g = 0; g < numberOfGroups; g += 1){
			var photos = [];
			for (p = 0; p < numberOfPhotos; p += 1){
				photoId++;
				var photoDate = photoDate + 50;
				var pic = new Photo(photoId, photoDate);
				photos.push(pic);
				allPhotos.push(pic);
			}
			groups.push(new Group(g, photos));
		}
		callback(groups, allPhotos);
	};
}