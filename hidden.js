function startup(){

	chrome.storage.local.set({citelist: ""},function(){});
	chrome.storage.local.set({sessionon: false},function(){});
	chrome.storage.local.set({urlgot: ""},function(){});
	startup_otherfunc();
}
function startup_otherfunc(){
	
		chrome.webNavigation.onCommitted.addListener(function(newnav){
					
					chrome.storage.local.get("sessionon",function(ret){
						if(ret.sessionon){
							var us = newnav.url.split(":")[0];

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
	startup_otherfunc();
});
//dont insult the code please
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'WAKEUPBOZO') {
		startup_otherfunc();
	}
  if (message.type === 'DOCUMENT_ATTRIBUTES') {
	chrome.storage.local.get("citelist", function(returned){
		var currdate = new Date();
		var month = currdate.getMonth() + 1;	
		var urlfrom = message.data.urlgot.split("/")[0]+"//"+message.data.urlgot.split("/")[2];
		if (returned.citelist.includes(urlfrom)){
			chrome.storage.local.set({citelist: returned.citelist},function(){});
		}else{
			chrome.storage.local.set({citelist: 
			`${message.data.author}, `+
			`(${message.data.date}), `+
			`${message.data.title} ` +
			`[online] Available from: < ${urlfrom} >` +
			` \n(Accessed on: ${currdate.getDate()}/${month}/${currdate.getFullYear()})\n\n`+
			`${returned.citelist}`},function(){}); 
		}
		
		
	});
  }
});
//totally normal code u know?
//ps: u shouldn't be here