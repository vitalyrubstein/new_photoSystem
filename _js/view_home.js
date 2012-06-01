function createViewHome(m, parent) {
	createListener(m, parent, function(e){
		
		var eventType = e.getEventType();
		var data = e.getData();
		
		// actions for 'removeGroup'
		if (eventType === 'removeGroup'){
		
			$("div#group-" + data['groupId']).remove();
		
		}
		
		// actions for 'addGroup'		
		if (eventType === 'addGroup'){
						
			var gid = data['groupId'];
			var pos = 'div.groups:eq(' + data['groupIndex'] + ')';
			
			if ($(pos).length){
				$(pos).before(createGroupContainer(gid));
				createViewGroup(m, "div#group-" + gid, m.getGroup(gid));
			} else {
				pos = 'div.groups:eq(' + (data['groupIndex'] - 1) + ')';			
				$(pos).after(createGroupContainer(gid));
				createViewGroup(m, "div#group-" + gid, m.getGroup(gid));
			}
		}				
		
		// actions for 'changeSorting'
		if (eventType === 'changeSorting'){
			
			var divs = [];
			
			// reading all elements of each group
			$('div.groups').each(function(){
				divs.push($(this));
			});
						
			// clearing old groups
			//$('div.groups').remove();
			
			// reversing order of groups
			divs.reverse();
			
			// building groups
			$.each(divs, function(i,v){
				$(v).appendTo(parent);
			});
		}
		
		// actions for 'init'
		if (eventType === 'init'){
						
			// adding button
			$(parent).append(createButton('change sorting', function(){m.changeGroupsSorting();}));
			
			// getting groups
			var groups = m.getGroups();
			// adding groups
			for ( i in groups) {
				$(parent).append(createGroupContainer(groups[i].getGroupId())); // adding group container
				createViewGroup(m, "div#group-" + groups[i].getGroupId(), groups[i]); // inserting group				
			}
		} 		
	});
}

function createGroupContainer(groupId) {
	return '<div class="groups" id="group-' + groupId + '"></div>';
}