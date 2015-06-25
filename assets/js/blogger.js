function getblog() {
// Blog entry should be diplayed with the following format:
// <div id='key' class='col-sm-12 blogpost'> 
//   <small>
//     <p class='muted' style='float:right;'>Post date will go here.</p>
//   </small>
//   <h5>Post title will go here.</h5>
//   <p>Post content will go here.</p>
//   <hr/>
// </div>

	console.log("Debug: getblog")
	entryHTML = "";
	$.getJSON("../../entries.json", function(json) {
	    entries = json["entries"];
	    console.log(entries);
	    for (i in entries) {
			entry = entries[i];
			console.log(entry);
			key = "key" + (i+1);
			entryHTML += convertEntryToHTML(entry, key);
		};
		document.getElementById("blog").innerHTML = entryHTML;
	});
	
};






function convertEntryToHTML (entry, key) {
	//console.log(entry);
	textEntry = 
		"<div id='" + key + "' class='col-sm-12 blogpost'>" +
		"<small>" +
			"<p class='muted' style='float:right;'>" + entry["date"] + "</p>" +
  		"</small>" +
  		"<h4>" + entry["title"] +"</h4>" +
  		"<p>" + entry["text"] + "</p>" +
  		"<hr/>" +
  		"</div>";

  	return textEntry;
};



function pager(page){
	console.log("Debug: pager")
	entryHTML = "";
	$.getJSON("../../entries.json", function(json) {
	    entries = json["entries"];
	    console.log(entries);
	    console.log(page);
	    
	    // Figure out the index numbers to display
	    startIndex = parseint (page*5);
	    stopIndex = parseint (page*5 + 5);
	    if (stopIndex > entries.length) {
	    	stopIndex = entries.length;
	    };


	    for (var i = startIndex; i <= stopIndex; ++i) {
			entry = entries[i];
			console.log(entry);
			key = "key" + (i+1);
			entryHTML += convertEntryToHTML(entry, key);
		};

		if (page === 1) {
			alert("No Previous");
		};

		if (stopInxed >= entires.length) {
			alert("No Next");
		};

		document.getElementById("blog").innerHTML = entryHTML;
	});



};




$(document).ready(pager(1));