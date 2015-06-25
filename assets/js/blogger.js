var blogPageNumber = 2;

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
	    //console.log(entries);
	    console.log(page);
	    
	    // Figure out the index numbers to display
	    startIndex = (page * 5 - 5);
	    stopIndex = (page * 5 - 1);
	    if (stopIndex >= entries.length) 
	    {
	    	stopIndex = (entries.length - 1);
	    };

	    // Debug
	    console.log(entries.length);
	    console.log(startIndex + " to " + stopIndex);
	    
	    // Loop though the Start/Stop Indexed pages
	    for (var i = startIndex; i <= stopIndex; ++i) 
	    {
			entry = entries[i];
			console.log(entry);
			key = "key" + (i+1);
			entryHTML += convertEntryToHTML(entry, key);
		};

		// Build Previous/Next buttons
		entryHTML += "<div class='col-sm-12 blogpost greyback borderRad'><p><center>"
		
		// if on page 1 don't include the Previous button
		if (page != 1) {
			entryHTML += '<a id="previousButton" href="javascript:previousButton()"><= PREVIOUS </a>'
		};

		// if on the last page, dont include the next button
		if (stopIndex < (entries.length -1)) {
			entryHTML += '<a id="nextButton" href="javascript:nextButton()"> NEXT =></a>'
		};

		// close the HTML
		entryHTML += "</p></div>"

		// Write the HTML to the webpage
		document.getElementById("blog").innerHTML = entryHTML;
	});



};

function previousButton() {
	if (blogPageNumber > 1) 
	{
		--blogPageNumber;
		pager(blogPageNumber);
	};
};

function nextButton() {
		++blogPageNumber;
		pager(blogPageNumber);
};



$(document).ready(pager(blogPageNumber));