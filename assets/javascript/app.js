// create the primary array to hold the animal input from form
let animalArray=["Cat", "Dog"];
let btn;
// create function that would create animal-buttons dynamically
function createBtns(arrayToUse, classToAdd, areaToAdd){

    // clear existing button to avoid dupilcate
  $(areaToAdd).empty();
  for (let i=0; i<arrayToUse.length; i++){
      let btn =$("<button>");
      //add attributes to the btn
      //$("p:first").addClass("intro");
      btn.addClass(classToAdd);
      btn.attr("data-type", arrayToUse[i]);
      btn.text(arrayToUse[i]);
      $(areaToAdd).append(btn);

  }
//create a function that would make the ajax call to giphy api
//extract images giphy images
$(document).on("click", "#animalBtns", function(){
    $("#giphyImages").empty();
    $("#animalBtns").removeClass("active");
    $(this).addClass("active");

    let searchTerm = $(this).attr("data-type");

    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=lISwnQ5TdGTfXd9Ex4N17L98lbq6KRRi&limit=10&q=" + searchTerm;
    $.ajax({
        url: queryURL,
        method: "GET"
    }) // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

        //store the area of data from ajax call to a variable
        let results=response.data; 
        //loop thru entire results
        for (var i=0; i<results.length; i++){
            // create a div where to container each image
           let aniDiv=$("<div class=\"animal-item\">");
           //get each image rating
           let imageRating= results[i].rating;
           //create html element to use show ratings
           let ratingText=$("<p>").text("Rating :" + imageRating);
           //get animated images
           let animated= results[i].images.fixed_height.url;
           let still=results[i].images.fixed_height.url;
           //create the image tag
        let animalImage=$("<img>");
        //assign attributes to the image tag
        animalImage.attr("src",still);
        animalImage.attr("data-still",still);
        animalImage.attr("data-image",animated);
        animalImage.attr("data-state",still);
        animalImage.addClass("animal-image");
        aniDiv.append(ratingText);
        aniDiv.append(animalImage);
        $("#giphyImages").append(aniDiv);


        }




    }

});

};