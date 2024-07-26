chrome.runtime.sendMessage({ type: 'WAKEUPBOZO'});
document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.local.get("searchChecked", function(returned){
		if(returned.searchChecked == false){
			document.getElementById("searchCheck").checked = false;
		}
	});
	chrome.storage.local.get("sessionon",function(ret){
		if(ret.sessionon == true){
			document.getElementById("sessionButton").textContent = "Stop Session";
			document.getElementById("sessionButton").style.background = "#b900de";
		}
	});
    document.getElementById("copyButton").onclick = function copyToClip(){
	
	chrome.storage.local.get("citelist", function(returned){
		navigator.clipboard.writeText(returned.citelist);
		document.getElementById("copyButton").textContent = "Done!";
	});
	
	};
	document.getElementById("searchCheck").onclick = function(){
		if(document.getElementById("searchCheck").checked == true){
			chrome.storage.local.set({searchChecked: true},function(){});
		}else{
			chrome.storage.local.set({searchChecked: false},function(){});
		}
	}
	document.getElementById("sessionButton").onclick = function sessionState(){
	chrome.storage.local.get("sessionon",function(ret){
		if(ret.sessionon == true){
			chrome.storage.local.set({"sessionon": false}, function(){document.getElementById("sessionButton").textContent = "Start Session";document.getElementById("sessionButton").style.background = "white";});
		}else{
			chrome.storage.local.set({citelist: []},function(){});
			chrome.storage.local.set({urlgot: ""},function(){});
			document.getElementById("content").textContent = "";
			chrome.storage.local.set({"sessionon": true}, function(){document.getElementById("sessionButton").textContent = "Stop Session";document.getElementById("sessionButton").style.background = "#b900de";});
		}
	
	});
	}
	
	
		clearer();
	
});//i know its messy don't be mad; it works!

function clearer(){
	chrome.storage.local.get("citelist", function(returned){//get citelist
	document.getElementById("content").innerHTML = "";
		for(i in returned.citelist){//go through all elements
				document.getElementById("content").innerHTML = `<div style='border:2px solid white;border-radius:3px; position: relative; margin-left: 5px; margin-right: 5px; padding-bottom: 10px; padding-top: 10px;'><button style='position: absolute; bottom: 0; right: 0;font-size: 10px;background-color: red;' id='${i}'><img id='i${i}'src='trash_icon.png' /></button>` + returned.citelist[i] + "</div></br>" + document.getElementById("content").innerHTML;
				//set text and button etc
				
		}
		
		for(i in returned.citelist){
			//go through all elements
			document.getElementById(i.toString()).onclick = function(event){
				var id = event.target.id;
				var temp = returned.citelist;
				
				if(id.includes('i')){
					temp.splice(parseInt(id.replace("i","")), 1);
				}else{
					temp.splice(parseInt(id), 1);
				}
				
				
				chrome.storage.local.set({citelist: temp});
				clearer();
			}
				
		}
		
		
	});
}
//hello!
//ps: u shouldn't be here