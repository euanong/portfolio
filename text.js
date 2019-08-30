//words = ["student", "full-stack developer", "sysadmin", "mathlete", "competitive programmer", "sophist"];
words = ["student", "creative technologist", "full-stack developer", "sysadmin", "mathlete", "competitive programmer"];
betweenCharTime = 70;
betweenWordTime = 1000;
wordElement = null;
index = 0;

function typeWord(word){
	if (word==""){
		//console.log("finished");
		setTimeout(function(){unTypeWord();},betweenWordTime);
		return;
	} else {
		wordElement.innerHTML+=word[0];
		setTimeout(function(){typeWord(word.substr(1));},betweenCharTime);
		return;
	}
}

function unTypeWord(){
	if (wordElement.innerHTML == ""){
		index++;
		index = index%words.length;
		setTimeout(function(){typeWord(words[index]);},betweenCharTime);
		return;
	} else {
		//console.log("unTypeWord");
		wordElement.innerHTML = wordElement.innerHTML.slice(0, -1);
		setTimeout(function(){unTypeWord();},betweenCharTime);
	}
}

function type(){
	wordElement = document.getElementById("names_span");
	typeWord(words[index]);
}