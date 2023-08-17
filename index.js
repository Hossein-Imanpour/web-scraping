const PORT  = 5000
const axios = require('axios')
const cheerio = require('cheerio') 
const { log } = require('console')
const express = require('express')
const { get } = require('http')
const { title } = require('process')

const app = express()

// const url = 'https://www.yjc.ir/'
const url = 'https://www.nytimes.com/section/todayspaper'

// axios(url)
// .then(response => {
//     const html = response.data
//     const $ = cheerio.load(html)
//     const articles = []
//     $('.title-news-bartar', html).each(function(){
//     // $('p', html).each(function(){
//         const title = $(this).text()
//         const url = $(this).attr('href')
//         articles.push({
//             title,
//             url
//         })
        

//         console.log(articles);
//     })
    
// })
// .catch((err)=>{
//     console.log(err);
// })

// axios(url)
// .then(response =>{
//     const html = response.data
//     const $ = cheerio.load(html)
//     const articles = []
//     $('.dcr-1g8nl1f' , html).each(function(){
//         const title = $(this).text()
//         const url = $(this).attr('href')
//         articles.push({
//             title,
//             url
//         })
//     })

//     console.log(articles);
// }).catch(err=>{
//     console.log(err);
// })

const articles = []

async function getData () {
    try {
        const dataResponse = await axios.get(url)
        const $ = cheerio.load(dataResponse.data)
        const titles = $("article");
        titles.each(function() {
          const   title = $(this).find(".css-10wtrbd h3").text();
        // const url = $(this).find("h3 a").attr("href");
        const url = $(this).find(".css-10wtrbd a").attr("href");

            articles.push({title , url})
        })
        

            console.log(articles); 
    }  
    catch (error) {
        console.error(error)
    }
}


app.listen(PORT , ()=> {
    console.log(`server is running on port ${PORT}`);
getData()
})