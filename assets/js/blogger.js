
var entriesURL = "https://mkohlmann-he.github.io/entries.json"
// var entriesURL ="..\..\entries.json"


var entries = {"entries" : ""};
var blogPageNumber = 1;

// Load JSON file into memory once, reuse later
var jqxhr = $.getJSON(entriesURL, function(json) 
{
  	entriesFile = json;
  	entries = entriesFile["entries"];
	//console.log(entries);
  	console.log( "JSON read success" );
})
  
.done(function() 
{
	//console.log(entries);
    console.log( "JSON .done success" );
})

.fail(function() 
{
    console.log( "JSON .fail error" );
})

.always(function() 
{
    console.log( "JSON .always complete" );
});



//
// PULL DATA
// Get all entriets (asymetrically), and do stuff with it.
//
function getblog() {
	console.log("Debug: getblog")
	//console.log(entries);

    // Build list of entries to display
    var displayList = [];
    var len = entries.length;

    // If SearchBox is Empty, Build the entire list from all the blogs (in reverse)
    if ($("#search-second").val() == null || $("#search-second").val() == "") 
    {
       	$("#welcomeSection").slideDown();
    	$("#codeSpotlightSection").slideDown();
    	$("#interestSection").slideDown();
    	$("#blogHeaderSection").slideDown();
    	$("#search2").show();
    	for (i in entries)
    	{
    		displayList.push(len - i - 1);
    	};
    }

    // Else, if there is a value in the search box, build the display list
    else
    {
    	$("#welcomeSection").slideUp();
    	$("#codeSpotlightSection").slideUp();
    	$("#interestSection").slideUp();
    	$("#blogHeaderSection").slideUp();
    	$("#search2").hide();
    	var searchValue = $("#search-second").val().replace(/ /g,'');
    	console.log("searching for: " + searchValue);
    	for (i in entries)
    	{
    		entryTitle = entries[i].title.replace(/ /g, '');
    		entryText = entries[i].text.replace(/ /g, '');
    		console.log("stripped entry: " + entryText);
    		console.log(entryText.indexOf(searchValue));
    		if (entryText.indexOf(searchValue) >= 0 || entryTitle.indexOf(searchValue) >= 0)
    		{
    			displayList.push(i);
    		};
    	};
    };



    pager(entries, displayList, blogPageNumber);

};




//
// PAGER FUNCTIONS
//
function pager(entries, displayIndex, page){
	// Debug
	console.log("Debug: pager")
	//console.log(entries);
	//console.log("index list:" + displayIndex);
	//console.log("list length:" + displayIndex.length);
	//console.log("page:" + page);
	
    // Figure out the index numbers to display as the 5-blog page
    var startIndex = (page * 5 - 5);
    var stopIndex = (page * 5 - 1);
    if (stopIndex >= displayIndex.length) 
    {
    	stopIndex = (displayIndex.length - 1);
    };


    // Debug
    console.log("start/stop: " + startIndex + " to " + stopIndex);

    //Build Page
    var entryHTML = "";
    // Loop though the Start/Stop Indexed entries, adding each blog
    for (var i = startIndex; i <= stopIndex; ++i) 
    {
    	entry = entries[displayIndex[i]];
		key = "key" + (displayIndex[i]+1);
		entryHTML += convertEntryToHTML(entry, key);
	};

	// Build Previous/Next buttons
	if (displayIndex.length > 5) 
	{
		entryHTML += "<div class='col-sm-12 blogpost greyback borderRad'><p><center>"
		
		// if on page 1 don't include the Previous button
		if (page != 1) {
			entryHTML += '<a id="previousButton" href="javascript:previousButton()"><= PREVIOUS </a>'
		};

		// if on a middle page, Add some seperation space
		if (page >1 && stopIndex < (displayIndex.length - 2)) {
			entryHTML += '<text> --- </text>'
		};


		// if on the last page, dont include the next button
		if (stopIndex < (displayIndex.length - 2)) {
			entryHTML += '<a id="nextButton" href="javascript:nextButton()"> NEXT =></a>'
		};

		// close the HTML
		entryHTML += "</p></div>";
	};

	// Write the HTML to the webpage
	document.getElementById("blog").innerHTML = entryHTML;
};

function convertEntryToHTML (entry, key) {
	// Blog entry should be diplayed with the following format:
	// 	<div id='key' class='col-sm-12 blogpost'> 
	// 		<small>
	//     		<p class='muted' style='float:right;'>Post date will go here.</p>
	//   	</small>
	//   	<h5>Post title will go here.</h5>
	//   	<p>Post content will go here.</p>
	//   	<hr/>
	// 	</div>

	textEntry = 
		"<div id='" + key + "' class='col-sm-12 blogpost greyback borderRad'>" +
		"<small>" +
			"<p class='muted' style='float:right;'>" + entry["date"] + "</p>" +
  		"</small>" +
  		"<h4>" + entry["title"] +"</h4>" +
  		"<p>" + entry["text"] + "</p>" +
  		"</div><div class='col-sm-12'><p></p></div>";
  		

  	return textEntry;
};

function previousButton() {
	if (blogPageNumber > 1) 
	{
		--blogPageNumber;
		getblog();
	};
};

function nextButton() {
		++blogPageNumber;
		getblog();
};



$(document).ready(jqxhr.complete(function()
	{
		getblog();
	})
)


// SearchBox Control,  On change character pressed
$(document).ready(jqxhr.complete(function()
	{
	$("#search-second").on('input propertychange paste', function()
		{
		blogPageNumber = 1;
		console.log("TopSearch Triggered:" + $("#search-second").val());
		$("#search2").val($("#search-second").val());
		getblog();
		
		});
}));

// SearchBox Control,  On change character pressed
$(document).ready(jqxhr.complete(function()
	{
	$("#search2").on('input propertychange paste', function()
		{
		blogPageNumber = 1;
		console.log("BottomSearch Triggered:" + $("#search2").val());
		$("#search-second").focus();
		$("#search-second").val($("#search2").val());
		getblog();
		
		});
}));