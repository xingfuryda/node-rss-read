var feed = require("feed-read"),
    http = require("http"),
    express = require("express"),
    app = express(),
    urls = [];
    
app.get('/', function(req, res){
    // send basic http headers to client
    res.writeHead(200, {
        "Content-Type": "text/html",
        "Transfer-Encoding": "chunked"
    });

    // setup simple html page:
    res.write("<html>\n<head>\n<title>RSS Feeds</title>\n</head>\n<body>");

    // fetch rss feed for the url:
    feed('http://www.reddit.com/r/videos/.rss', function(err, articles) {

        // loop through the list of articles returned
        for (var i = 0; i < articles.length; i++) {

            // stream article title (and what ever else you want) to client
            res.write("<h3>"+articles[i].title +"</h3>"); 

            // check we have reached the end of our list of articles & urls
            if( i === articles.length-1) {
                res.end("</body>\n</html>"); // end http response
            }
        }
    });
});

app.listen(process.env.PORT);
console.log('Express server started on port %s', process.env.PORT);