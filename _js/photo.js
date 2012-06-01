function Photo(id, date) {
	this.id = id;
	this.date = date;
	
	this.getPhotoId = function(){
		return this.id;
	}
	
	this.getPhotoDate = function(){
		return this.date;
	}
	
}