const fs = require("fs-extra");
const inquirer = require("inquirer");
const Octokit = require("@octokit/rest");
const octokit = new Octokit();
const generate = require("./generateHTML.js");
const path = require("path");
const request = require('request');//npm i request
const axios = require("axios");//npm i axios
const util = require("util");//npm i util
const puppeteer = require('puppeteer');//npm i puppeteer
// var pdfMaker = require('pdf-maker'); //npm i --save pdf-maker ==> might not be the best library
// const convertHTMLToPDF = require("pdf-puppeteer");

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

                //function to get the GitHub users info goes here
                let queryURL = 'https://api.github.com/users/' + ghname;
                console.log(queryURL);
                axios
                    .get(queryURL).then(function (response) {
                        let i;
                        const userInfo = {
                            "profileImg": response.data.avatar_url,
                            "userName": response.data.name,
                            "location": response.data.location,
                            "userGitHub": response.data.url,
                            "company": response.data.company,
                            "blog": response.data.blog,
                            "bio": response.data.bio,
                            "repos": response.data.public_repos,
                            "followers": response.data.followers,
                            "stars": response.data.starred_url[i],
                            "following": response.data.following,
                            "ghcolor": userData.color
                        }
                        console.log("userInfo" + userInfo)

                        //Having all the info gathered, proceed to write send the info to generateHTML.js
                        // function here to feed the ghcolor into generateHTML.js
                        //===============================================================================

                        fs.writeFile(`./templates/${ghname}.html`, generate(userInfo), function (err) {
                            if ((err)) {
                                console.log(err)
                            }
                            createPDF = async function(req, res, next) {
                                const content 
                            }


                            // (async() => {
                            //     try {

                            //         const browser = await puppeteer.launch();
                            //         const page = await browser.newPage();

                            //         await page.goto(`./templates/${ghname}.html`);
                            //         waitUntil(domcontentloaded);
                            //         await page.pdf({
                            //             path: `./user-files/${ghname}.pdf`,
                            //             format: 'A4',
                            //             printBackground: true
                            //         });

                            //         console.log('done');
                            //         await browser.close();
                            //         process.exit();
                            //     }
                            //     catch (e) {
                            //         console.log('pdf error', e);
                            //     }
                            // })

                            // var callback = function (pdf) {
                            //     // do something with the PDF like send it as the response
                            //     res.setHeader("Content-Type", "application/pdf");
                            //     res.send(pdf);
                            // }

                            /**
                            *    Usage
                            // *    @param html - This is the html to be converted to a pdf
                            // *    @param callback - Do something with the PDF
                            // *    @param [options] - Optional parameter to pass in Puppeteer PDF options
                            // *    @param [puppeteerArgs] - Optional parameter to pass in Puppeter arguments
                            // *    @param [remoteContent] - Default true. Optional parameter to specify if there is no remote content. Performance will be opitmized for no remote content.
                            */
                        })

                    })
            })
        })


//function init() {
//}

// init()
