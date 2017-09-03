cardWidth = 336;
fractionOfPage = 0.8;

function doResize() {
	var width = document.documentElement.clientWidth * fractionOfPage;
	var numTimes = Math.floor(cardWidth/width);
	if (numTimes<1){
		numTimes = 1;
	}
	document.getElementById("project_items_container").style.width = (cardWidth*numTimes).toString();
}

window.addEventListener('resize', doResize);