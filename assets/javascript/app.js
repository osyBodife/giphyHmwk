
// create an array of few animals to display as home page
//this would display before any user input
var animalArray = ["cat", "dog", "horse", "monkey", "goat"];
//create function to create buttons
//display the button
function createBtns() {
    for (var i = 0; i < animalArray.length; i++) {
       //create a Button
        var aniBtn = $("<button>");
        //add attributes to the button just created
        //btnClass is defined in .css file
        aniBtn.addClass("btnClass");
        //data-type is a data* attribute, provides the name the of button
        aniBtn.attr("data-type", animalArray[i]);
        //write the name of each button
        aniBtn.text(animalArray[i]);      
        //display button on home page            
        $("#imageBtns").append(aniBtn);

    }
};



//create a function to create new button on User input and form submission
$("#submitBtn").on("click", function (event) {
    //prevent form from deleting html element after submission
    event.preventDefault();
    //get user input and covert to lower case letters
    var userText = $("#search").val().trim().toLowerCase();
    //prevent user from submitting empty field
    if (userText == "") {
        return false;
    } else {
        //add User Input to original array
        //check if the name exists
        //prevent duplication of buttons
        if(animalArray.includes(userText)==true){
            alert("Error! the name alreay exists");
        }else{
            animalArray.push(userText);
        // clear existing buttons to avoid dupilcates
        $("#imageBtns").empty();
        //call function to create buttons
        //will create a new set of buttons
        createBtns();

        }
        

    }
    //clear form field after submission
    $('#giphyForm input[type="text"]').val('');
});




//create a function to get gipghy api
$(document).on("click", ".btnClass", function () {

    $("#giphyImages").empty();
    //make all image  button unactive
    $(".btnClass").removeClass("active");
    //make the current image active
    $(this).addClass("active");
    //get the value of button from the data attribute
    //assign it to a variable
    let searchTerm = $(this).attr("data-type");
    let queryURL = "http://api.giphy.com/v1/gifs/search?api_key=lISwnQ5TdGTfXd9Ex4N17L98lbq6KRRi&limit=10&q=" + searchTerm;
    //make an ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    })// We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            //console.log(response);
            //store all data from ajax call to a variable
            let results = response.data;
            //alert the user when there no images for current search form giphy.com
            if(results.length===0){
                alert("Sorry there is NO giphy images for your current search")
            }else{
            //loop thru entire results
            for (var i = 0; i < results.length; i++) {
                // create a div where to container each image               
                let imgDiv=$("<div>");
                //add class to the image Div
                imgDiv.addClass("imgItem");
                //get each image rating
                let imageRating = results[i].rating;
                //create p element to house ratings
                let p= $("<p>").text("Ratings: " + imageRating);
                //assign p tag attributes
                p.addClass("ratingClass");
               
                //create the image tag to house src
                let animalImage = $("<img>");
                //assign image src to the results
				animalImage.attr("src", results[i].images.fixed_height_small_still.url);
				//pause images
				animalImage.attr("data-still", results[i].images.fixed_height_small_still.url);
				//animated images
			    animalImage.attr("data-animate", results[i].images.fixed_height_small.url);
				//how images come in, already paused
                animalImage.attr("data-state", "still"); 
                //add class to use for event Listerner               
                animalImage.addClass("animal-image");
                //append rating unto the div
                imgDiv.append(p);
                //append image to image div
                imgDiv.append(animalImage);
                //append images into image area of the page
                $("#giphyImages").append(imgDiv);
            }

            }



        });



});


   //create a function toggle btw still and animate
    $(document).on("click",".animal-image", function() {
        let state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
        });












