// all controllers will be in this file later. below is just one example.

function createRemovePhotoAction(m, photoId) {
	return function(){
	m.removePhoto(photoId);
	};
}
