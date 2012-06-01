function forEach(array, action) {
	
	var size = array.length;
	
	for (var i = 0; i < size; i += 1){
		action(array[i]);
	}
}

function randomIntNumber(range){
	return Math.floor((Math.random() * range)+1);
}