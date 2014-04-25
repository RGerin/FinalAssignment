/**
 * @author Roseanne
 */

/*
* Project steps:
1. Set up document ready
2. Load Google charts package
3. Load data
4. Render the chart

*/

//For this project, I am adding a Google data fusion table as another way to bring data into my Google visualization.
//Here I previously had confused the data object with the Google function name.
//Now I'm passing the data from the fusion table to the new DataLoaded () function with the name "CivilianUnemploymentData_030714."

var myKey = "&key=AIzaSyBxm3yDApl-FkVRwHUKGACLeBhMMTX2ubI";
var myTableURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1sJdI-HjjB2yBpsxv9rzRjJwP7Y0HJYvkmjklpnDk+WHERE+DATE>";

function newDataLoaded(UNRATE) {

	var googleDataSource = new google.visualization.DataTable();

	//When I add columns, the first parameter is the data type in that column.
	//The second parameter is the name of the column.

	googleDataSource.addColumn('string'), UNRATE.columns[0];
	googleDataSource.addColumn('number'), UNRATE.columns[1];
	googleDataSource.addColumn({type: 'string', role:'annotation'});
	
	//Or add this as the third column:
	//googleDataSource.addColumn({type:'string', role:'tooltip', 'p': {'html': true}});
	
	googleDataSource.addRows(UNRATE.rows);
	//This only works because it is a Google visualization object.
	//I'm creating a var for the updated chart and giving it a title.

	var myChartOptions = {
		title: "Unemployment in the United States"
	};
	
	// Add this is add googleDataSource 'tooltip' above: 
	//var chartOptions = {
		//width:600,
		//height:400,
		//tooltip: { isHtml: true}
		
	//};
	
	//Now I'm going to create a line chart. Then I must pass the Google DataTable variable I've created here.

console.log("hi there");
	var myGoogleChart = new google.visualization.LineChart(document.getElementById("unemploymentChartDiv"));
	myGoogleChart.draw(googleDataSource);

}


function showNewData(e){
	//e is my click event
	var myID = e.target.id; //e.g., "year 2000"
	var myNameArray = myID.split("_"); //Splits into an array, "2000" will be second item
	var myYear = myNameArray[1]; //Grab the year
	
	$.get(myTableURL+"'"+myYear+"-12-01'"+myKey, newDataLoaded, "json");
	console.log("hi");
	History.pushState({year:myYear}, "Unemployment from - "+myYear, "?year="+myYear);
	
}
	
	//Now I'm going to load the data from a Google fusion table instead of from the json file.
	//I added the data file name and my API key ID to the https address.
	// Now I'm going to add a WHERE parameter in the https address to specify certain years for the data.
	// The WHERE parameter will display the chart data for 1969-12-01 and beyond.
function googleLoaded() {
	
	

	var urlData = History.getState().cleanUrl;
	var queryArray = myTableURL.split("?");
	var defaultYear = "1970";
	if (queryArray.length > 1){
		//Get the query string, break it on equals , and then take the right path which contains the year.
		defaultYear = queryArray[1].split("=")[1];
	}
	
	//var defaultYear = queryString.split("=");
	//console.log(History.getStateByIndex(0));
	//if($.isEmptyObject(urlData)){
		//defaultYear = "1970";
				
	console.log("hi");
	
	$(".btn-success").on("click", showNewData);
	
	//Grab the button with the ID that is year_"defaultYear"
	
	$("#year_"+defaultYear).click();
	
	$.get(myTableURL+"'1969-12-01'"+myKey, newDataLoaded, "json");

}

//I am working with the Google chart loading function.
function DataSource() {
console.log("hi");
	//Now I'll load the Google vizualization library.
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleLoaded"

	});

}


$(document).ready(DataSource);

