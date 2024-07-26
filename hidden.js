function startup(){

	chrome.storage.local.set({citelist: []},function(){});
	chrome.storage.local.set({sessionon: false},function(){});
	chrome.storage.local.set({searchChecked: true},function(){});
	chrome.storage.local.set({urlgot: ""},function(){});
	startup_otherfunc();
}
function startup_otherfunc(){
	
		chrome.webNavigation.onCommitted.addListener(function(newnav){
					
					chrome.storage.local.get("sessionon",function(ret){
							chrome.storage.local.get("searchChecked",function(ret2){
								if(ret2.searchChecked == false){
									try{
										if (newnav.url.split("/")[2].includes("google") == false && newnav.url.split("/")[2].includes("yandex") == false && newnav.url.split("/")[2].includes("bing") == false && newnav.url.split("/")[2].includes("yahoo") == false && newnav.url.split("/")[2].includes("duckduckgo") == false){
											if(ret.sessionon){
												var us = newnav.url.split(":")[0];
												
												if(us == "https" || us == "http"){
														chrome.scripting.executeScript(
														{
															target: { tabId: newnav.tabId },files: ['grabcontent.js']
														});
												}
											}
										}
									}catch(error){
									}
								}else{
									if(ret.sessionon){
										var us = newnav.url.split(":")[0];
										
										if(us == "https" || us == "http"){
												chrome.scripting.executeScript(
												{
													target: { tabId: newnav.tabId },files: ['grabcontent.js']
												});
										}
									}
								}
							});
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
		var tot = "";
		for(i in returned.citelist){
			tot += returned.citelist[i];
		}
		
		if (tot.includes(urlfrom) == false){
				var temp = returned.citelist;
				temp.push(
				`${message.data.author}, `+
				`(${message.data.date}), `+
				`${message.data.title} ` +
				`[online] Available from: < ${urlfrom} >` +
				` [Accessed on: ${currdate.getDate()}/${month}/${currdate.getFullYear()}]\n\n`
				);
				chrome.storage.local.set({citelist: temp},function(){}); 
				
		}
  });
}
});
//totally normal code u know?
//ps: u shouldn't be here