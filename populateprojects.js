var year_layout = '\
<div class="subgroup_title">{PROJECT_YEAR}</div>\
<hr class="sectionbreak">\
<div class="items project_items" id="PROJECTS_{PROJECT_YEAR}">\
</div>';

var project_layout = '\
<div class="mdc-card project_card">\
	<section class="mdc-card__media project_card__16-9-media" style="background-image: url(imgs/{PROJECT_IMAGE});"></section>\
	<section class="mdc-card__primary">\
		<h1 class="mdc-card__title mdc-card__title--large project_card__title">{PROJECT_TITLE}</h1>\
		<h2 class="mdc-card__subtitle project_card__subtitle">{PROJECT_SUBTITLE}</h2>\
	</section>\
	<section class="mdc-card__actions">\
		<a class="mdc-button mdc-button--compact mdc-card__action project_card__action" target="_blank" href="{PROJECT_URL}">{PROJECT_BTN_ACTION}</a>\
	</section>\
</div>';

function addProject(project,element) {
	var projectel = project_layout
		.replace(new RegExp('{PROJECT_IMAGE}', 'g'), project.image)
		.replace(new RegExp('{PROJECT_TITLE}', 'g'), project.title)
		.replace(new RegExp('{PROJECT_SUBTITLE}', 'g'), project.subtitle)
		.replace(new RegExp('{PROJECT_URL}', 'g'), project.url)
		.replace(new RegExp('{PROJECT_BTN_ACTION}', 'g'), project.button);
	var projfrag = document.createRange().createContextualFragment(projectel);
	element.appendChild(projfrag);
}

function addElement(year){
	var yearel = year_layout
		.replace(new RegExp('{PROJECT_YEAR}','g'), year);
	var yearfrag = document.createRange().createContextualFragment(yearel);
	document.getElementById("projects_container").appendChild(yearfrag);
}

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'projects.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function populateProjects(){
	loadJSON(function(response) {
		// Parse JSON string into object
		var projects_json = JSON.parse(response);
		for (var key = 0; key<projects_json.length; key++){
			addElement(projects_json[key].year);
			var element = document.getElementById("PROJECTS_"+projects_json[key].year);
			for (var i = 0; i<projects_json[key].data.length; i++){
				var checkIfNoDisplay = false;
				if (projects_json[key]["data"][i].hasOwnProperty("display")){
					if (projects_json[key]["data"][i]["display"]==false){
						checkIfNoDisplay=true;
					}
				}
				if (!checkIfNoDisplay){
					addProject(projects_json[key]["data"][i],element);
				}
			}
		}
		doResize();
	});
}