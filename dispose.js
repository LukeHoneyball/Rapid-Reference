chrome.runtime.sendMessage({ type: 'WAKEUPBOZO'});
document.addEventListener('DOMContentLoaded', function() {
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
	document.getElementById("sessionButton").onclick = function sessionState(){
	chrome.storage.local.get("sessionon",function(ret){
		if(ret.sessionon == true){
			chrome.storage.local.set({"sessionon": false}, function(){document.getElementById("sessionButton").textContent = "Start Session";document.getElementById("sessionButton").style.background = "white";});
			console.log("session stopped");
		}else{
			chrome.storage.local.set({citelist: ""},function(){});
			chrome.storage.local.set({urlgot: ""},function(){});
			document.getElementById("content").textContent = "";
			chrome.storage.local.set({"sessionon": true}, function(){document.getElementById("sessionButton").textContent = "Stop Session";document.getElementById("sessionButton").style.background = "#b900de";});
			console.log("session started");
		}
	
	});
	}
	
	chrome.storage.local.get("citelist", function(returned){
		
		document.getElementById("content").innerHTML = returned.citelist.replace(" ","</br>").replace("\n","</br></br>");

	});
});//i know its messy don't be mad; it works!


//hello!
//ps: u shouldn't be here