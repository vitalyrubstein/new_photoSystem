function Group(id, photoIds) {
	this.id = id;
	this.photoIds = photoIds;
	
	this.getGroupId = function(){
		return this.id;
	}
	
	this.getPhotoIds = function(){
		return this.photoIds;
	}
	
	this.getPhotoIndex = function(photoId){
		return this.photoIds.indexOf(photoId);	
	}
	
	this.deletePhotoId = function(photoId){
		var pos = this.photoIds.indexOf(photoId);
		this.photoIds.splice(pos,1);
	}
	
}




// new commment