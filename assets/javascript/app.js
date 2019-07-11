
// create an array of few animals to display as home page
//this would display before any user input
var animalArray = ["Cat", "Dog", "Horse", "Monkey"];
//create a variable to hold button id 
var btnId;
//create function to display initial animal list
//create variable for all queries

function createBtns() {
    for (var i = 0; i < animalArray.length; i++) {
        // clear existing button to avoid dupilcate
        //$("#imageBtns").empty();
        //create a Button
        var aniBtn = $("<button>");

        //add attributes to the btn
        aniBtn.addClass("btnClass");
        aniBtn.attr("data-type", animalArray[i]);
        aniBtn.text(animalArray[i]);

        aniBtn.text(animalArray[i]);
        //display button on home page            
        $("#imageBtns").append(aniBtn);

    }
};



//create a new button on form submit
$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    var userText = $("#search").val().trim();
    if (userText == "") {
        return false;
    } else {
        animalArray.push(userText);
        // clear existing button to avoid dupilcate
        $("#imageBtns").empty();
        //call function to create button
        createBtns();

    }

});
//creatr function to get gipghy api

$(document).on("click", ".btnClass", function () {

    $("#giphyImages").empty();
    //make all image  button unactive
    $(".btnClass").removeClass("active");
    //make the current image active
    $(this).addClass("active");
    //get the value of button from the data attribute
    //assign it to variable
    let searchTerm = $(this).attr("data-type");

    let queryURL = "http://api.giphy.com/v1/gifs/search?api_key=lISwnQ5TdGTfXd9Ex4N17L98lbq6KRRi&limit=10&q=" + searchTerm;
    $.ajax({
        url: queryURL,
        method: "GET"
    })// We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            //store all data from ajax call to a variable
            let results = response.data;
            //consider putting an alert for empty search
            //loop thru entire results
            for (var i = 0; i < results.length; i++) {
                // create a div where to container each image
                let imgDiv = $("<div class=\"imgItem\">");
                //get each image rating
                let imageRating = results[i].rating;
                //get animated images
                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height.url;
                //create the image tag
                let animalImage = $("<img>");
                //assign attributes to the image tag
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-image", animated);
                animalImage.attr("data-state", still);
                animalImage.addClass("animal-image");
                imgDiv.append(imageRating);
                imgDiv.append(animalImage);
                $("#giphyImages").append(imgDiv);

            }



        });



});


















function getGiphyData() {
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







