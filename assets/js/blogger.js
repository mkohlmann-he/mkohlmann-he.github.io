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

	entryHTML = "";

	// Add Code to read the entries...


	$.getJSON("../../entries.json", function(json) {
	    entries = json[0];
	    console.log(entries);
	    for (i in entries) {
			entry = entries[i];
			console.log(entry);
			entryHTML += convertEntryToHTML(entry);
		};
		document.getElementById("blog").innerHTML = entryHTML;
	});
	
};






function convertEntryToHTML (entry) {
	//console.log(entry);
	textEntry = 
		"<small>" +
			"<p class='muted' style='float:right;'>" + entry["date"] + "</p>" +
  		"</small>" +
  		"<h4>" + entry["title"] +"</h4>" +
  		"<p>" + entry["text"] + "</p>" +
  		"<hr/>";

  	return textEntry;
};






$(document).ready(getblog);