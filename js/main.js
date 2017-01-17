$(document).ready(function() {
    "use strict";
    console.log("main.js successfully loaded");
    populateItems();
});

// functions
function populateItems() {
    $.ajax({
        dataType: "json",
        url: "https://spreadsheets.google.com/feeds/list/1eigBGV50ScQkGjgPTuH9WO8tYUmN2UpdM-XTFzh-lyQ/od6/public/values?alt=json",
        success: function(data) {
            data = data.feed.entry
            console.log(data);

            var source = $("#item-template").html();
            var template = Handlebars.compile(source);
            var context = data;
            var html = template(context);
            $(".item-container").append(html);


            // var template = $('#items').html();
            // var templateScript = Handlebars.compile(template);
            // var context = data;
            // var html = templateScript(context);
            // $("#handlebars-content").append(html);
        },
        error: function(e) {
            console.log("fail");
            console.log(e);
        }
    });
}