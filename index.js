const fs = require("fs");
const inquirer = require("inquirer");
const Octokit = require("@octokit/rest");
const octokit = new Octokit();
const generate = require("./generateHTML.js");
const request = require('request');//npm i request
const axios = require("axios");//npm i axios
const util = require("util");//npm i util
var pdfMaker = require('pdf-maker'); //npm i --save pdf-maker ==> might not be the best library
const GenHTML = require("./generateHTML");



//for me
fs
    .readFile("generateHTML.js", "utf8", function (error, data) {// HTML file being read into the function
        if (error) {
            return console.log(error);
        }
        // console.log(data)
        //Get data from the user
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
            .then(function (response) //skip this to continue collecting data, save write function for the writefile method towards the end?

            {
                // var filename = response.name.toLowerCase().split(' ').join('') + ".pdf";//Creates the specific GitHub user pdf filename
                // fs.writeFile("user_files/" + filename, JSON.stringify(response, null, '\t'), function (err) {//Creates the specific GitHub user pdf, trying to add the folder name, see if that works to organize the cards
                //     // console.log(JSON.stringify(response, null, '  '));
                // })

                let ghname = response.name;//To be fed into function getting a response from the 
                let ghcolor = response.color;//To be fed in generateHTML.js
                console.log(ghname + " and " + ghcolor)

               

//function to get the GitHub users info goes here
                const queryURL = 'https://api.github.com/users/' + ghname;
                console.log(queryURL);
                axios
                    .get(queryURL).then(function (response) {
                        const userInfo = [
                            "profileImg: " + response.data.avatar_url,
                            "userName: " + response.data.login,
                            "location: " + response.data.location,
                            "blog: " + response.data.blog,
                            "bio: " + response.data.bio,
                            "repos: " + response.data.public_repos,
                            "stars: " + response.data.starred_url,
                            "following: " + response.data.following,
                            "-".repeat(60)
                        ].join("\n\n");

                    console.log("data" + data)
                    console.log("userInfo" + userInfo)

                
// function here to feed the ghcolor into generateHTML.js

 

    
//===============================================================================

                    // function writeToFile(fileName, data) {//Create individual .pdf filenames according to the user's name (GitHub username)?
                    //     //  generate
                    // }

                    // function init() {
                    // }
                })

            }
            )})
// init()

