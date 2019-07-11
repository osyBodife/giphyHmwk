


// create an array of few animals to display as home page
//this would display before any user input
var animaArray = ["Cat", "Dog", "Horse"];
//create a variable to hold button id 
var btnId;
//create a variable object to hold multiple attribute values
var attrValues;
//create function to display initial animal list
//create variable for all queries
var searchTerm;
function initialPageLoad() {
    for (var i = 0; i < animaArray.length; i++) {
        //create a Button
        var aniBtn = $("<button>");
        //assign attributes
        //btnId = "btn-" + [i];
        //btnId = "btn-" + animaArray.indexOf(animaArray[i]);
        aniBtn.attr("Id", "btn-" + [i]);
        aniBtn.attr("data-animal-type" ,animaArray[i]);
        console.log(aniBtn);

        //console.log(attrValues.Id);
        //write a label


        aniBtn.text(animaArray[i]);
        //display button on home page            
        $("#imageBtns").append(aniBtn);
        //style the buttons
        aniBtn.css("padding", "0px 20px 5px 20px");
        aniBtn.css("background-color", "#66ff66");
        //call the giphy function         




    }
  
    $("#btn-0").click(function () {
        searchTerm = "cat"
       $("#giphyImages").empty();

        getGiphyData(searchTerm);
    });
    $("#btn-1").click(function () {
        searchTerm = "dog"
        $("#giphyImages").empty();

        getGiphyData(searchTerm);

    });
};





// Create a button on form submission
var displayList = 2;
//create an event Listener
$("#submitBtn").on("click", function (event) {
    event.preventDefault();


    // Get value from the input box
    var userText = $("#search").val().trim();
    // add new entry to the array
    animaArray.push(userText);
    //console.log(animaArray);

    //create a button and asssign it to a variable
    var inputBtn = $("<Button>");
    //assign attributes
    inputBtn.attr("id", "btn-" + displayList);
    ///##
    //bind a click event
    $(inputBtn).on("click", function () {
        //call get giphy function
        $("#giphyImages").empty();
        getGiphyData(userText);
    });


    //put a name/label on the button
    inputBtn.text(userText);
    //console.log(inputBtn);
    inputBtn.css("padding", "0px 20px 5px 20px");
    inputBtn.css("background-color", "#66ff66");

    $("#imageBtns").append(inputBtn);


    // Add to the toDoCount
    displayList++;
});
//creatr function to get gipghy api
function getGiphyData(searchTerm) {
    //var searchTerm="Lion"
    //api key obtained from registering my app at developer.giphy.com
    //var APIKey = "lISwnQ5TdGTfXd9Ex4N17L98lbq6KRRi";
    // create a variable to hold the url

    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=lISwnQ5TdGTfXd9Ex4N17L98lbq6KRRi&limit=9&q=" + searchTerm;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            //console.log(queryURL);

            // Log the resulting object
            //console.log(response);
            //response.data.url
            //create variable to hold data from ajax call
            var giffs = response.data;
            //console.log (giffs);
            for (var n = 0; n < 9; n++) {
                $('#giphyImages').append('<img src=" ' + giffs[n].images.original.url + '"  />')
                // $('#giphyImages').append('<img src=" '+ giffs[n].images.original_still.url +'"  />')

            }




        });



}




