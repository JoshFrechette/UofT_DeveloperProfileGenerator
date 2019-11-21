const fs = require("fs");
const inquirer = require("inquirer");
const Octokit = require("@octokit/rest"); 
const octokit = new Octokit();
const generate = require("./generateHTML.js");
const request = require('request');//npm i request



//for me
// fs
//     .readFile("generateHTML.js", "utf8", function(error, data) {
//     if (error) {
//         return console.log(error);
//     }
//     console.log(data)
// //Get data from the user
// })
inquirer
    .prompt([
        {
        type: "input",
        message: "What is your GitHub username?",
        name: "name"
        },
        {
        type: "list",
        message: "What is your favourite color?",//Options; green, blue, red, pink.
        name: "color",
        choices: [
            'green',
            'red',
            'blue',
            'pink'
        ]
        }
    ])
//
    .then(function(response) 
    {
        var filename = response.name.toLowerCase().split(' ').join('') + ".pdf";//Creates the specific GitHub user pdf
        fs.writeFile(filename, JSON.stringify(response, null, '\t'), function(err) {
    // console.log(JSON.stringify(response, null, '  '));
    });

let ghname = response.name;//To be fed into function getting a response from the 
let ghcolor = response.color;//To be fed in generateHTML.js

// console.log(ghname + " and " + ghcolor)
options =  {
    url: "https://api.github.com/users/" + ghname,
    headers: {
        "User-Agent": "TwistedPixels"  // Your Github ID or application name, auth# 
    }
}

request.get(options)
    .on('response', function (response) {
        // console.log(response.statusCode);
        console.log(JSON.stringify(response));
    });

// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
// octokit.repos   
//     .listForUser({
//         org: "",
//         type: "public"
//       })
//       .then(({ data }) => {
//         // handle data
//       });
// Octokit
//     .get()

// //user data I need to fill out the card
// // profile Image
// response.avatar_url();
// // username
// response.login();
// // links toString; user location via googlemaps, user github profile, user blog
// response.location();
// response.html_url();
// response.blog();
// // user bio 
// response.bio();
// // #public repos 
// response.public_repos();
// // #GitHub Stars
// response.starred_url();
// // #users following
// response.following();

// function writeToFile(fileName, data) {//Create individual .pdf filenames according to the user's name (GitHub username)?
//  generate
//}

// function init() {
})
// init();
