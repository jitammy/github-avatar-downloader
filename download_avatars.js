var request = require('request');
var secrets = require("./secrets")
console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
        headers:{
            'User-Agent': 'request',
            'Authorization': secrets.GITHUB_TOKEN
        }
    }
    request(url, function(err, res, body) {
      cb(err, body);
    });
  }
getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});