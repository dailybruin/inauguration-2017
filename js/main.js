$(document).ready(function() {
    "use strict";
    console.log("main.js successfully loaded");
    populateItems();
    changeActive();
});

var ITEMS_DATA;

// functions
function displayItems(data) {
    var source = $("#item-template").html();
    var template = Handlebars.compile(source);
    var context = data;
    var html = template(context);

    $(".item-container").empty();
    $(".item-container").append(html);
}

function filterEmptyData() {
    var filteredData = [];
    Object.keys(ITEMS_DATA).forEach(function(key, idx) {
        if (ITEMS_DATA[key].gsx$title.$t !== "") {
            filteredData.push(ITEMS_DATA[key]);

            // auto generate author link
            if (ITEMS_DATA[key].gsx$linktoauthor.$t === "") {
                var author = filteredData[key].gsx$author.$t;
                filteredData[key].gsx$linktoauthor.$t = "http://dailybruin.com/author/" + author.substr(0, author.indexOf(' ')) + "-" + author.substr(author.indexOf(' ')+1);
            }
            console.log(ITEMS_DATA[key].gsx$linktoauthor);
        }
    });
    ITEMS_DATA = filteredData;
    displayItems(ITEMS_DATA);
}

function populateItems() {
    $.ajax({
        dataType: "json",
        url: "https://spreadsheets.google.com/feeds/list/1eigBGV50ScQkGjgPTuH9WO8tYUmN2UpdM-XTFzh-lyQ/od6/public/values?alt=json",
        success: function(data) {
            ITEMS_DATA = data.feed.entry
            console.log(ITEMS_DATA);
            filterEmptyData();
        },
        error: function(e) {
            console.log("fail");
            console.log(e);
        }
    });
}

function filterData(category) {
    if (category === "All") {
        displayItems(ITEMS_DATA);
    } else {
        var filteredData = [];
        Object.keys(ITEMS_DATA).forEach(function(key, idx) {
            if (ITEMS_DATA[key].gsx$category.$t === category) {
                filteredData.push(ITEMS_DATA[key]);
            }
        });
        displayItems(filteredData);
    }
}

function removeActive() {
    $(".main .navbar ul li a").toArray().forEach(function (element) {
        $(element).removeClass("navbar-active");
    });
}

function changeActive() {
    $(".main .navbar ul li a").toArray().forEach(function (element) {
        $(element).click(function () {
            console.log("clicked");

            removeActive();
            $(element).addClass("navbar-active");

            if ($(element).parent().is(":nth-child(1)")) {
                filterData("All");
            } else if ($(element).parent().is(":nth-child(3)")) {
                filterData("News");
            } else if ($(element).parent().is(":nth-child(5)")) {
                filterData("Opinion");
            } else if ($(element).parent().is(":nth-child(7)")) {
                filterData("Analysis");
            } else if ($(element).parent().is(":nth-child(9)")) {
                filterData("Community");
            }
        });
    });
}

