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

//Added Google data fusion table.
//Passed the data from the fusion table to new "dataDriver()" function with the name "CivilianUnemploymentData_030714."
//Changed var names from "myKey" to "newKey" and "myTableURL" to "newTableURL".

var newKey = "&key=AIzaSyBxm3yDApl-FkVRwHUKGACLeBhMMTX2ubI";
var newTableURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1sJdI-HjjB2yBpsxv9rzRjJwP7Y0HJYvkmjklpnDk+WHERE+DATE>";

//Changed function name from "newDataLoaded" to "dataDriver".
function dataDriver(UNRATE) {

	//Changed var "googleDataSource" to "googleInfo".
	var googleInfo = new google.visualization.DataTable();

	//Added columns: The first parameter is the data type in that column.
	//The second parameter is the name of the column.
	//Don't forget to add rows after columns.

	googleInfo.addColumn('string'), UNRATE.columns[0];
	googleInfo.addColumn('number'), UNRATE.columns[1];
	googleInfo.addColumn({type:'string', role:'tooltip', 'p': {'html': true}});
	googleInfo.addRows(UNRATE.rows);
	
	//Changed var from "myChartOptions" to "chartChanges".
	var chartChanges = {
		title: "Unemployment in the United States since 1950"
	};
	
	// Added this for googleInfo "tooltip" above: 
		var chartInfo = { //Changed var from "ChartOptions" to "chartInfo".
		width:600,
		height:400,
		tooltip: { isHtml: true}
		
	};
	
	//Created a line chart and passed the Google DataTable variable I've created here.
	//Changed var "myGoogleChart" to "newChart".
	var newChart = new google.visualization.LineChart(document.getElementById("unemploymentChartDiv"));
	newChart.draw(googleInfo);

}

//Changed function from "showNewData" to "showInput".
function showInput(e){
	//e is my click event.
	var newID = e.target.id; //e.g., "year 2000"; changed var "myID" to "newID".
	var newNameArray = newID.split("_"); //Splits into an array, "2000" will be second item. 
	//Changed var "MynameArray" to "newNameArray".
	var latestYear = newNameArray[1]; //This grabs the year. Changed var "myYear" to "latestYear".
	
	$.get(newTableURL+"'"+latestYear+"-12-01'"+newKey, dataDriver, "json");

	History.pushState({year:latestYear}, "Unemployment from - "+latestYear, "?year="+latestYear);
	
}
	
	//Loaded the data from a Google fusion table instead of from the json file.
	//Added the data file name and my API key ID to the https address.
	// Changed the WHERE parameter to display the chart data for 1949-12-01 and beyond.
	//Changed the function name from "googleLoaded" to "googleReady".
function googleReady() {
	//Changed the "defaultYear" below to 1950 to add data for two more decades to the chart.
	var infoURL = History.getState().cleanUrl; //Changed var "urlData" to "infoURL".
	var newArray = newTableURL.split("?");//Changed var "queryArray" to "newArray".
	var newDefaultTime = "1950";//Changed var from "defaultYear" to "newDefaultTime".
	if (newArray.length > 1){
		//Get the query string, break it on equals, and then take the right path which contains the year.
		newDefaultTime = newArray[1].split("=")[1];
	}
	
	
	$(".btn-success").on("click", showInput);
	
	//This will grab the button with the ID that is year_"newDefaultTime".
	
	$("#year_"+newDefaultTime).click();
	
	//I changed the get function below per Susan's instructions, so that when the user first
	//logs onto the website, he will see only the buttons; then when he clicks on each button, 
	//get the yesr-specific chart data.
	$.get(newTableURL+"'"+latestYear+"-12-01'"+newKey, dataDriver, "json"); 

}

	//I am working with the Google chart loading function.
	//Changed function from "DataSource" to "downAndDirtyData".
	function downAndDirtyData() {

	//Loaded the Google vizualization library. Changed the callback to "googleReady".
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleReady"

	});

}

$(document).ready(downAndDirtyData);

