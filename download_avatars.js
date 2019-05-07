var request = require('request');
var secrets = require("./secrets")
var fs = require('fs')
var owner = process.argv[2]
var repo = process.argv[3]
function downloadImageByURL(url, filePath) {
    request.get(url)               
    .on('error', function (err) {                                   
      throw err; 
    })
    .on('response', function (response) {                           
        response.pipe(fs.createWriteStream(
            './avatars/' +
            filePath +
            '.' + 
            response.headers['content-type'].split('/')[1]
        ));  
    })
  }
// console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
    if (repoName === undefined||repoOwner===undefined){
        console.log('Inputs invalid');
        return 'Inputs invalid';
        //if one of the values is undefined, return inputs invalid
      }
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
        var avatars = data.map((obj)=> ({
            name: obj.login,
            url: obj.avatar_url,
        }))
        cb(err, avatars);
        return avatars
    });
  }
getRepoContributors(owner, repo, function(err, result) {
    result.map(avatar => downloadImageByURL(avatar.url, avatar.name))
});
// getRepoContributors(owner, repo, downloadImageByURL)

// getRepoContributors("jquery", "jquery", function(err, result) {
//     result.map(avatar => downloadImageByURL(avatar.url, avatar.name))
// });
