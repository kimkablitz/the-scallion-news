$(document).on("click", "#scrape", function() {
  $(".list-of-scraped-articles").empty();
  $.getJSON("/articles", function(data) {
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
      if (!data[i].isSaved) {
        $(".list-of-scraped-articles").append(
          "<div class='card' data-id='" +
            data[i]._id +
            "'>" +
            "<div class='card-header'>" +
            "<h3>" +
            "<a class='article-link' href = '" +
            data[i].link +
            "'>" +
            data[i].title +
            "</a>" +
            "<a class= 'btn btn-success save-article'data-id='" +
            data[i]._id +
            "'>" +
            "Save Article" +
            "</a></h3></div>"
        );
      }
    }
  });
});

$.getJSON("/api/saved", function(data) {
  // console.log(data);
  for (var j = 0; j < data.length; j++) {
    $(".list-of-saved-articles").append(
      "<div class='card' data-id='" +
        data[j]._id +
        "'>" +
        "<div class='card-header'>" +
        "<h3>" +
        "<a class='article-link' href = '" +
        data[j].link +
        "'>" +
        data[j].title +
        "</a>" +
        "<a class= 'btn btn-success unsave-article'data-id='" +
        data[j]._id +
        "'>" +
        "Unsave Article" +
        "</a><button class='fa fa-pencil-square-o' aria-hidden='true' data-toggle='modal' data-target='#myModal'></button>"  +
        "</h3></div>" 
      );
  }
{/* <a class ='btn btn-info write-notes' data-id='" + data[j]._id + "'>" + "Write Notes" +"</a> */}
});

$(document).on("click", ".save-article", function() {
  var thisId = $(this).attr("data-id");
  // $(".list-of-saved-articles").empty();
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId
  }).then(function(data) {
    alert("the article has been saved! Go to saved collection to view them")
    for (var i = 0; i < 10; i++) {
      if (!data[i].isSaved) {
        $(".list-of-scraped-articles").append(
          "<div class='card' data-id='" +
            data[i]._id +
            "'>" +
            "<div class='card-header'>" +
            "<h3>" +
            "<a class='article-link' href = '" +
            data[i].link +
            "'>" +
            data[i].title +
            "</a>" +
            "<a class= 'btn btn-success save-article'data-id='" +
            data[i]._id +
            "'>" +
            "Save Article" +
            "</a></h3></div>"
        );
      }
    }
    location.reload();
  });

});


$(document).on("click", ".saved-article-page", function() {
  var thisId = $(this).attr("data-id");
  $(".list-of-saved-articles").empty();

  $.ajax({
    method: "GET",
    url: "/saved/" + thisId
  }).then(function(data) {
    // console.log("hey");
    for (var i = 0; i < data.length; i++) {
      $(".list-of-saved-articles").append(
        "<div class='card' data-id='" +
          data[i]._id +
          "'>" +
          "<div class='card-header'>" +
          "<h3>" +
          "<a class='article-link' href = '" +
          data[i].link +
          "'>" +
          data[i].title +
          "</a>" +
          "<a class= 'btn btn-success unsave-article'data-id='" +
          data[i]._id +
          "'>" +
          "Unsave Article" +
          "</a><button class='fa fa-pencil-square-o' aria-hidden='true'data-toggle='modal' data-target='#myModal'></button>"  +
          "</h3></div>"   
      ) 
  }
  });
});


$(document).on("click", "#clear-articles", function() {
  $(".article-container").empty();
  $.ajax({
    method: "DELETE",
    url: "/articles"
  }).then(function() {
    let notice = "You aint got no more article, go scraping!"
    $(".article-container").append(
      "<div class ='alert alert-warning text-center'><h4>"+ notice +"</h4></div>"
    )  
  });

});

$(document).on("click", ".unsave-article", function() {
  var thisId = $(this).attr("data-id");
  // $(".list-of-saved-articles").empty();
  $.ajax({
    method: "PUT",
    url: "/saved/" + thisId
  }).then(function() {
    alert("the article has been removed from saved list")
    location.reload();
  });

});

const $commentTitle = $("#comment-tittle");
const $commentBody = $("#comment-tittle");
