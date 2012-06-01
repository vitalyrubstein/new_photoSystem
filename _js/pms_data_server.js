function PhotoDataServer() {
	this.getPhotos = function(seconds, userID, callback){
		$.ajax('http://176.34.237.117/json/photo_groups',{
			data: {
				'user_id' : userID,
				'time' : seconds
				},
			cache: false,
			dataType: 'json',
			timeout: 30000,
			success: function(json){ 
				var data = parseDataFromPMS3(json); 
				var groups = data['groups']; 
				var groupIds = data['groupIds'];
				var photos = data['photos']; 
				callback(groups, groupIds, photos)
				},
			error: function(json){console.log('Network Error!');}
		}); // end ajax
	};
}