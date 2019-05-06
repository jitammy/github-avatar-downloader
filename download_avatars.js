var request = require('request');
var secrets = require("./secrets")
console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers:{
            'User-Agent': 'request',
            'Authorization': secrets.GITHUB_TOKEN
        }
    }

    request(options, function(err, res, body) {
        if(err){
            throw err
        }
        var data = JSON.parse(body)
        var avatars = data.map((obj)=> obj.avatar_url)
        cb(err, avatars);
    });
  }
  
getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
    // ...
  }

downloadImageByURL()