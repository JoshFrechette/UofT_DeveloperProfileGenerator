const fs = require("fs-extra");
const inquirer = require("inquirer");
const generate = require("./generateHTML.js");
const axios = require("axios");//npm i axios
const puppeteer = require('puppeteer');//npm i puppeteer

const questions = [
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
]

async function init() {

    const x = await inquirer
    .prompt(questions)
    // console.log(questions)
    
    .then(async function (userData) {
        let ghname = userData.name;//To be fed into function getting a response from the 
        
        //function to get the GitHub users info goes here
        let queryURL = 'https://api.github.com/users/' + ghname;
        axios
        .get(queryURL).then(async function (response) {
            
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
                'stars': 0,//placeholder
                // "stars": response.data.starred[],
                "following": response.data.following,
                "ghcolor": userData.color
            }
            await fs.writeFileSync(`./templates/${ghname}.html`, generate(userInfo), function (err) {
                if ((err)) {
                    console.log(err);
                }
            })
            
        })
        // starCount()
        return ghname
    })
        return x
    }

// const got = require('got')//npm i got

// const stars = (ghname) =>
// 	got(`https://api.github.com/users/${ghname}/starred`)
// 	.then((res) => JSON.parse(res.body))
// 	.then((starred) => starred.map((s) => ({
// 		  owner:       s.owner.login
// 		, repo:        s.name
// 		, description: s.description
// 		, language:    s.language
// 		, isFork:      false
// 		, stargazers:  s.stargazers_count
// 		, watchers:    s.watchers_count
// 	})))
// console.log(stars)

// const starCount = async (stars, ghname) => {
//     let queryURL = `https://api.github.com/users/${ghname}/starred` ;

//     axios
//     .get(queryURL).then(async function (res) {
//         // console.log(userStars)
        
//         const stars = {
//             "userStars": res.data.length
//         }
//         console.log(stars)

//     })
// }

    
    const pdfMaker = async (ghname) => {
        
        const userHTML = `./templates/${ghname}.html`;
        console.log("pup" + userHTML)
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setViewport({width: 600, height: 1050});
    
    const html = fs.readFileSync(userHTML, "utf-8")

    await page.setContent(html, {
        waitUntil: "networkidle2"
        });

    await page.emulateMedia("screen");
    
    await page.screenshot({path: `./pngs/${ghname}.png`});

    await page.pdf({
        path: `./user-files/${ghname}.pdf`,
        format: "A4",
        pageRanges: '1',
        printBackground: true
    })
    await browser.close()

}

const program = async () =>{
    const ghname = await init()
    // await starCount(stars)
    await pdfMaker(ghname)
}

program()