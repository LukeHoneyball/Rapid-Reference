function startup(){
	console.log("started");
	chrome.storage.local.set({citelist: ""},function(){});
	chrome.storage.local.set({sessionon: false},function(){});
	chrome.storage.local.set({urlgot: ""},function(){});
	chrome.webNavigation.onCommitted.addListener(function(newnav){
				console.log("new website nav");
				chrome.storage.local.get("sessionon",function(ret){
					if(ret.sessionon){
						var us = newnav.url.split(":")[0];
						console.log(newnav.url);
						if(us == "https" || us == "http"){
								chrome.scripting.executeScript(
								{
									target: { tabId: newnav.tabId },files: ['grabcontent.js']
								});
						}
					}
				});
		
	});
}

chrome.runtime.onStartup.addListener(startup);
chrome.runtime.onInstalled.addListener(startup);
chrome.windows.onFocusChanged.addListener(function(){
		chrome.webNavigation.onCommitted.addListener(function(newnav){
				console.log("new website nav");
				chrome.storage.local.get("sessionon",function(ret){
					if(ret.sessionon){
						var us = newnav.url.split(":")[0];
						console.log(newnav.url);
						if(us == "https" || us == "http"){
								chrome.scripting.executeScript(
								{
									target: { tabId: newnav.tabId },files: ['grabcontent.js']
								});
						}
					}
				});
		});
});
//dont insult the code please
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("got attribs");
	if (message.type === 'WAKEUPBOZO') {
		console.log("okok i woke up chill");
		chrome.webNavigation.onCommitted.addListener(function(newnav){
				console.log("new website nav");
				chrome.storage.local.get("sessionon",function(ret){
					if(ret.sessionon){
						var us = newnav.url.split(":")[0];
						console.log(newnav.url);
						if(us == "https" || us == "http"){
								chrome.scripting.executeScript(
								{
									target: { tabId: newnav.tabId },files: ['grabcontent.js']
								});
						}
					}
				});
		
	});
	}
  if (message.type === 'DOCUMENT_ATTRIBUTES') {
	chrome.storage.local.get("citelist", function(returned){
		var currdate = new Date();
		var month = currdate.getMonth() + 1;	
		var urlfrom = message.data.urlgot.split("/")[0]+"//"+message.data.urlgot.split("/")[2];
		if (returned.citelist.includes(urlfrom)){
			chrome.storage.local.set({citelist: returned.citelist},function(){});
		}else{
			chrome.storage.local.set({citelist: `${message.data.author}, (${message.data.date}), ${message.data.title} [online] Available from: < ${urlfrom} > (Accessed on: ${currdate.getDate()}/${month}/${currdate.getFullYear()})\n${returned.citelist}`},function(){}); 
		}
		
		
	});
  }
});//totally normal code u know?
//ps: u shouldn't be here