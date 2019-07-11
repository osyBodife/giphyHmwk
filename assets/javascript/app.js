
// create an array of few animals to display as home page
//this would display before any user input
var animalArray = ["cat", "dog", "horse", "monkey"];
//create a variable to hold button id 
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
    var userText = $("#search").val().trim().toLowerCase();
    if (userText == "") {
        return false;
    } else {
        //add to original array
        //check if the name exists
        if(animalArray.includes(userText)==true){
            alert("Error! the name alreay exists");
        }else{
            animalArray.push(userText);
        // clear existing button to avoid dupilcate
        $("#imageBtns").empty();
        //call function to create button
        createBtns();

        }
        

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
            console.log(response);
            //store all data from ajax call to a variable
            let results = response.data;
            //consider putting an alert for empty search
            if(results.length===0){
                alert("Sorry there is giphy for your current search")
            }else{
            //loop thru entire results
            for (var i = 0; i < results.length; i++) {
                // create a div where to container each image
                let imgDiv = $("<div class=\"imgItem\">");
                //get each image rating
                let imageRating = results[i].rating;
                //create p element to house ratings
                let p= $("<p>").text("Ratings: " + imageRating);
                //assign p tag attributes
                p.addClass("ratingClass");
                
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
                //append rating unto the div
                imgDiv.append(p);
                //append imahe to image div
                imgDiv.append(animalImage);
                //append images unto image area of the page
                $("#giphyImages").append(imgDiv);
            }

            }



        });



});


    //set the state from still to animated when clickling on images
    $(document).on("click", "animalImage", function () {
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-state"));
            $(this).attr("data-state", "still");


        }

    });












