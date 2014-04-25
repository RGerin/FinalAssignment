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

//Add Google data fusion table.
//Pass the data from the fusion table to the new DataLoaded () function with the name "CivilianUnemploymentData_030714."
//Changed var names from "myKey" to "newKey" and "myTableURL" to "newTableURL""

var newKey = "&key=AIzaSyBxm3yDApl-FkVRwHUKGACLeBhMMTX2ubI";
var newTableURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1sJdI-HjjB2yBpsxv9rzRjJwP7Y0HJYvkmjklpnDk+WHERE+DATE>";

//Changed function name from "newDataLoaded" to "dataDriver"
function dataDriver(UNRATE) {

	//Changed var "googleDataSource" to "googleInfo"
	var googleInfo = new google.visualization.DataTable();

	//Add columns: The first parameter is the data type in that column.
	//The second parameter is the name of the column.

	googleInfo.addColumn('string'), UNRATE.columns[0];
	googleInfo.addColumn('number'), UNRATE.columns[1];
	googleInfo.addColumn({type:'string', role:'tooltip', 'p': {'html': true}});
	googleInfo.addRows(UNRATE.rows);
	
	//I have changed the var from "myChartOptions" to chartChanges""
	var chartChanges = {
		title: "Unemployment in the United States"
	};
	
	// Add this for googleInfo "tooltip" above: 
		var ChartOptions = {
		width:600,
		height:400,
		tooltip: { isHtml: true}
		
	};
	
	//Create a line chart and pass the Google DataTable variable I've created here.
	//Changed var "myGoogleChart" to "newChart"
	var newChart = new google.visualization.LineChart(document.getElementById("unemploymentChartDiv"));
	newChart.draw(googleInfo);

}


function showNewData(e){
	//e is my click event.
	var myID = e.target.id; //e.g., "year 2000"
	var myNameArray = myID.split("_"); //Splits into an array, "2000" will be second item.
	var myYear = myNameArray[1]; //This grabs the year.
	
	$.get(newTableURL+"'"+myYear+"-12-01'"+newKey, dataDriver, "json");

	History.pushState({year:myYear}, "Unemployment from - "+myYear, "?year="+myYear);
	
}
	
	//Load the data from a Google fusion table instead of from the json file.
	//Add the data file name and my API key ID to the https address.
	// Add a WHERE parameter in the https address to specify certain years for the data.
	// The WHERE parameter will display the chart data for 1949-12-01 and beyond.
function googleLoaded() {
	
	
	//I have changed the "defaultYear" below to 1950 to add data from two more decades to the chart.
	var urlData = History.getState().cleanUrl;
	var queryArray = newTableURL.split("?");
	var defaultYear = "1950";
	if (queryArray.length > 1){
		//Get the query string, break it on equals , and then take the right path which contains the year.
		defaultYear = queryArray[1].split("=")[1];
	}
	
	//var defaultYear = queryString.split("=");
	//console.log(History.getStateByIndex(0));
	//if($.isEmptyObject(urlData)){
		//defaultYear = "1970";
				

	$(".btn-success").on("click", showNewData);
	
	//Grab the button with the ID that is year_"defaultYear"
	
	$("#year_"+defaultYear).click();
	
	$.get(newTableURL+"'1949-12-01'"+newKey, dataDriver, "json");

}

	//I am working with the Google chart loading function.
	function DataSource() {

	//Load the Google vizualization library.
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleLoaded"

	});

}


$(document).ready(DataSource);

