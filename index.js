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

fs
    .readFile("generateHTML.js", "utf8", function (error, data) {// HTML file being read into the function
        if (error) {
            return console.log(error);
        }
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

            .then(function (userData) {
                let ghname = userData.name;//To be fed into function getting a response from the 
                // let ghcolor = response.color;//To be fed in generateHTML.js

                //function to get the GitHub users info goes here
                let queryURL = 'https://api.github.com/users/' + ghname;
                console.log(queryURL);
                axios
                    .get(queryURL).then(function (response) {
                        const userInfo = {
                            "profileImg":  response.data.avatar_url,
                            "userName":  response.data.login,
                            "location": "https://www.google.com/maps/search/?api=" + response.data.location,
                            "blog": response.data.blog,
                            "bio": response.data.bio,
                            "repos": response.data.public_repos,
                            "followers": response.data.followers,
                            "stars": response.data.starred_url,
                            "following": response.data.following,
                            "ghcolor": userData.color
                            
                        }
                        console.log("userInfo" + userInfo)

                        





                        // writeToFile(); //Having all the info gathered, proceed to write send the info to generateHTML.js
                        // function here to feed the ghcolor into generateHTML.js
                        //===============================================================================


                        fs.writeFile("./template.html",generate(userInfo),function(err){
                            if((err))
                            {

                                console.log(err)
                                
                            }
                        })
                                           



                        var template = './template.html';
                        var pdfPath = `./user-files/${ghname}.pdf`;
                        var option = {

                            paperSize: {
                                format: 'A4',
                                orientation: 'portrait',
                                border: '1.8cm'
                            }

                        };
 
pdfMaker(template, pdfPath, option);
                    })
            // function writeToFile(fileName, data) {//Create individual .pdf filenames according to the user's name (GitHub username)?   
         
    //  generate


    // fs
    //     .writeFile(filename, JSON.stringify(response, null, '\t'), function (err) {//Creates the specific GitHub user pdf, trying to add the folder name, see if that works to organize the cards
    //         console.log(JSON.stringify(response, null, '  '),
    //             console.log(fileName)
    //         );
    //     })
                })
    





})



//function init() {
//}

// init()
