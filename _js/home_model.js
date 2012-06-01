function HomeModel() {
	
	var groups = {};
	var groupIds = [];
	var photos = {};
	
	var listeners = [];
		
	this.initModel = function(hashOfGroups, listOfGroupIds, hashOfPhotos){
		
		groups = hashOfGroups;
		groupIds = listOfGroupIds;
		photos = hashOfPhotos;
		
		this.fireListeners(new ModelEvent(this, "init", null));
		
	}
	
	this.getGroupIds = function(){
		return groupIds;
	}
	
	this.getGroup = function(groupId){
		return groups[groupId];
	}
	
	this.getGroups = function(){
		
		var arrayOfGroupObjects = [];
		
		$.each(groupIds, function(i,v){
			arrayOfGroupObjects.push(groups[v]);
		});
				
		return arrayOfGroupObjects;
	}
	
	this.getNumberOfGroups = function(){
		return groupIds.length;
	}
	
	this.getIndexOfGroup = function(groupId){
		return groupIds.indexOf(groupId);
	}
	
	this.removeGroup = function(groupId){
		// removes group object from hash
		delete groups[groupId];
		// removes groupId from array
		var pos = groupIds.indexOf(groupId);
		groupIds.splice(pos,1);
		
		this.fireListeners(new ModelEvent(this, "removeGroup", {'groupId': groupId}));
	}
	
	this.getGroupByPhotoId = function(photoId){
	
		var gs = this.getGroups();
		var g;
		
		$.each(gs, function(i,v){
			var pids = v.getPhotoIds();
			$.each(pids, function(ii,vv){
				if( vv === photoId) {
					g = v;
				}
			});
		});
		
		return g;
	}
	
	this.addGroup = function(groupIndex, groupId, group){
		groups[groupId] = group;
		groupIds.splice(groupIndex, 0, groupId);
		this.fireListeners(new ModelEvent(this, "addGroup", {'groupId': groupId, 'groupIndex': groupIndex}));
	}
	
	this.mergeGroupNext = function(groupId){
		var gIndex = groupIds.indexOf(groupId);
		var gNext = gIndex + 1;
		var groupNextId = groupIds[gNext];
		var pids = this.getPhotoIdsByGroup(groupId);
		var pidsNext = this.getPhotoIdsByGroup(groupNextId);
		var joinedPids = [];
		var newGroupId = randomIntNumber(10000000);
		var newGroup = new Group(newGroupId, joinedPids.concat(pids, pidsNext));
		this.removeGroup(groupId);
		this.removeGroup(groupNextId);
		this.addGroup(gIndex, newGroupId, newGroup);
		
	}
	
	this.splitGroup = function(photoId){
		var g = this.getGroupByPhotoId(photoId);
		var gid = g.getGroupId();
		var gIndex = this.getIndexOfGroup(gid);
		var pids = this.getPhotoIdsByGroup(gid);
		var pIndex = pids.indexOf(photoId);
		var pids1 = pids.slice(0,pIndex);
		var pids2 = pids.slice(pIndex, pids.length);
		
		this.removeGroup(gid);
		
		var gid1 = randomIntNumber(10000000);
		var gid2 = randomIntNumber(10000000);		
		var g1 = new Group(gid1, pids1);
		var g2 = new Group(gid2, pids2);
		
		this.addGroup(gIndex, gid1, g1);
		this.addGroup(gIndex+1, gid2, g2);
	}
	
	this.isGroupLast = function(groupId){
		var numberOfGroups = groupIds.length;
		var groupIndex = groupIds.indexOf(groupId);
		
		if ( groupIndex === (numberOfGroups - 1) ) {
			return true;
		} else {
			return false;
		}
	}
		
	this.getPhoto = function(photoId){
		return photos[photoId];
	}
		
	this.getPhotos = function(){
		
		var arrayOfPhotoObjects = [];
		
		$.each(photoIds, function(i,v){
			arrayOfPhotoObjects.push(photos[v]);
		});
		
		return arrayOfPhotoObjects;
	}
	
	this.getPhotoIdsByGroup = function(groupId){
		
		return this.getGroup(groupId).getPhotoIds();
	}
	
	this.getPhotosByGroup = function(groupId){
		
		var m = this;
		var pids = m.getPhotoIdsByGroup(groupId);
		var ps = [];
		
		$.each(pids, function(i,v){
			ps.push(m.getPhoto(v));
		});
		
		return ps; // list of photo objects
	}
		
	this.removePhoto = function(photoId){
		
		// removes photo object from hash
		delete photos[photoId];
		// removes photoId from Group object
		var g = this.getGroupByPhotoId(photoId);
		g.deletePhotoId(photoId);
		
		this.fireListeners(new ModelEvent(this, "removePhoto", {'photoId': photoId, 'groupId': g.getGroupId()}));
		
		if (g.getPhotoIds().length < 1){
			this.removeGroup(g.getGroupId());
		}
	}
	
	this.isPhotoFirstInGroup = function(photoId){
		
		var g = this.getGroupByPhotoId(photoId);
		if ( typeof g === 'undefined') {
			return g;
		}
		var pids = g.getPhotoIds();
		var pIndex = pids.indexOf(photoId);
		if ( pIndex === 0 ){
			return true;
		} else {
			return false;
		}
	}
	
	this.changeGroupsSorting = function(){
        groupIds.reverse();
        this.fireListeners(new ModelEvent(this, "changeSorting", null));
    }

	
	this.registerListener = function(l) {
		listeners.push(l);
	}
	
	this.unregisterListener = function(l) {
		for (i in listeners) {
			if (l === listeners[i]){
				listeners.splice(i,1);
				return;
			}			
		}
	}
	
	this.fireListeners = function(event) {
		var fireListeners = listeners.slice(); // clones array
		
		for (i in fireListeners) {
			var l = fireListeners[i];
			(l.getAction())(event);
			if ( !(l.getAlive())() ){
				this.unregisterListener(l);
			}			
		} 	
	}
	
}

function ModelEvent(model, eventType, data) {
	this.model = model;
	this.eventType = eventType;
	this.data = data;
	
	this.getModel = function(){
		return this.model;
	}
	
	this.getEventType = function(){
		return this.eventType;
	}
	
	this.getData = function(){
		return this.data;
	}
}

function ModelListener(funcAction, funcAlive) {
	this.action = funcAction;
	this.alive = funcAlive;
	
	this.getAction = function(){
		return this.action;
	}
	
	this.getAlive = function(){
		return this.alive;
	}	
}

function createListener(m, parent, funcAction) {
	
	var funcAlive = function(){
		if ($(parent).length){
			return true;
		} else {
			return false;
		}	
	};
	
	m.registerListener(new ModelListener(funcAction, funcAlive));
	
}