var request = require('request');
var secrets = require("./secrets")
var fs = require('fs')

function downloadImageByURL(url, filePath) {
    request.get(url)               
    .on('error', function (err) {                                   
      throw err; 
    })
    .on('response', function (response) {                           
        // console.log('Response Status Code: ', response.statusCode);
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

    });
  }


getRepoContributors("jquery", "jquery", function(err, result) {
    // console.log("Errors:", err);
    // console.log("Result:", result);
    result.map(avatar => downloadImageByURL(avatar.url, avatar.name))
});



// downloadImageByURL('https://avatars3.githubusercontent.com/u/192451?v=4', 1)