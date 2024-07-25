var cur = new Date();
var authorName = document.URL.split("/")[2].replace("www.","");
var date = cur.getFullYear().toString();

var authorKeywords = ["author", "byline", "channel-name", "publisher", "publish-name"]

var doc_elements = document.querySelectorAll("*");
var main_author = false;
doc_elements.forEach(function(ele) {
	for(var i = ele.attributes.length - 1; i >= 0; i--){
		var atr = ele.attributes[i];
		if(atr.specified){
			
			for(aut in authorKeywords){
				if(main_author == false){
					if(atr.value.includes(authorKeywords[aut]) && atr.value.includes("authori") == false){
						var txt = ele.textContent.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim();
						if(txt.length < 50 && txt != ""){
							authorName = txt;
							if(atr.value.includes("main")){
								main_author = true;
							}
							
							if(txt.includes("by")){
								authorName = txt.split("by")[1].trim();
								main_author = true;
							}
							else if(txt.includes("By")){
								authorName = txt.split("By")[1].trim();
								main_author = true;
							}
							else if(txt.includes("BY")){
								authorName = txt.split("BY")[1].trim();
								main_author = true;
							}
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