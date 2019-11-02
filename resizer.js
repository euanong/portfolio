cardWidth = 336;
fractionOfPage = 0.8;

function doResize() {
	var width = document.documentElement.clientWidth * fractionOfPage;
	var numTimes = Math.floor(width/cardWidth);
	if (numTimes<1){
		numTimes = 1;
	}
	var newWidth = cardWidth*numTimes;
	console.log(newWidth);
	var headers = document.getElementsByClassName("project_items");
	for(i=0; i<headers.length; i++) {
    	headers[i].style.width = newWidth.toString()+"px";
	}
	headers = document.getElementsByClassName("subgroup_title");
	for(i=0; i<headers.length; i++) {
    	headers[i].style.width = newWidth.toString()+"px";
	}
	headers = document.getElementsByClassName("sectionbreak");
	for(i=0; i<headers.length; i++) {
    	headers[i].style.width = newWidth.toString()+"px";
	}
	onWindowResize();
}

window.addEventListener('resize', doResize);