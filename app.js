// The names and URLs to all of the feeds.
var allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feed'
    }, {
        name: 'CSS Tricks',
        url: 'http://feeds.feedburner.com/CssTricks'
    }, {
        name: 'HTML5 Rocks',
        url: 'http://feeds.feedburner.com/html5rocks'
    }, {
        name: 'Linear Digressions',
        url: 'http://feeds.feedburner.com/udacity-linear-digressions'
    }
];

// Starts application.
function init() {
    // Load the first feed defined.
    loadFeed(0);
}

// This function performs what is necessary to load a feed using the Google Feed Reader API.
 function loadFeed(id, cb) {
     var feedUrl = allFeeds[id].url,
         feedName = allFeeds[id].name;

     $.ajax({
       type: "POST",
       url: 'https://rsstojson.udacity.com/parseFeed',
       data: JSON.stringify({url: feedUrl}),
       contentType:"application/json",
       success: function (result, status){

                 var container = $('.feed'),
                     title = $('.header-title'),
                     entries = result.feed.entries,
                     entriesLen = entries.length,
                     entryTemplate = Handlebars.compile($('.tpl-entry').html());

                 title.html(feedName);
                 container.empty();  // Empty out all previous entries

                 // Loop through the entries we just loaded via the Google Feed Reader API.
                 entries.forEach(function(entry) {
                     container.append(entryTemplate(entry));
                 });

                 if (cb) {
                     cb();
                 }
               },
       error: function (result, status, err){
                 // Run only the callback.
                 if (cb) {
                     cb();
                 }
               },
       dataType: "json"
     });
 }

// Loads the Feed Reader API and defines what function to call when the Feed Reader API is done.
google.setOnLoadCallback(init);

// Code placed in the $() function to ensure it doesn't execute until the DOM is ready.
$(function() {
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');

    // Loop through all of our feeds.
    allFeeds.forEach(function(feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));

        feedId++;
    });

    feedList.on('click', 'a', function() {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
    });
}());
