var cur = new Date();
var authorName = document.URL.split("/")[2].replace("www.","");
var date = cur.getFullYear().toString();

var doc_elements = document.querySelectorAll("*");
var main_author = false;
doc_elements.forEach(function(ele) {
	for(var i = ele.attributes.length - 1; i >= 0; i--){
		var atr = ele.attributes[i];
		if(atr.specified){
			if(main_author == false){
				if(atr.value.includes("author") && atr.value.includes("authori") == false){
					if(ele.textContent.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim().length < 50 && ele.textContent.trim() != ""){
						authorName = ele.textContent.replace(/\s+/g, ' ').trim();
						if(atr.value.includes("main")){
							main_author = true;
						}
					}
					
				}
				if(atr.value.includes("byline")){
					if(ele.textContent.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim().length < 50 && ele.textContent.trim() != ""){
						authorName = ele.textContent.replace(/\s+/g, ' ').trim();
						if(atr.value.includes("main")){
							main_author = true;
						}
					}
				}
			}
			if(atr.value.includes("date")){
				if(ele.textContent.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim().length > 3 && ele.textContent.trim().length < 25 && ele.textContent.trim() != "" && /\d/.test(ele.textContent) == true){
					date = ele.textContent.replace(/\s+/g, ' ').trim();
				}
			}
		}
	}
}
);



documentAttributes = {
  title: document.title,
  urlgot: document.URL,
  author: authorName,
  date: date
};

chrome.runtime.sendMessage({ type: 'DOCUMENT_ATTRIBUTES', data: documentAttributes });

//yea this code is nice i guess

//ps: u shouldn't be here