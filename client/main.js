import { APIKEY } from './config.js'

const searchByCategoryContainer = document.querySelector("#container-search-category")
// const categoryInput = document.querySelector(".category-search-input")
const categoryForm = document.querySelector(".category-form")
const categoryButton = document.querySelector(".category-button")

const searcByKeywordContainer = document.querySelector("#container-search-keyword")
const keywordInput = document.querySelector(".keyword-search-input")
const keywordButton = document.querySelector(".keyword-button")

const searchByIngredientsContainer = document.querySelector("#container-search-ingredients");


// Category search
const getFoodByCategory = (e) => {
    e.preventDefault()
    console.log('hit get food by category')
    let categories = document.querySelector(".category-search-input").value;
    // console.log(categories)
    axios({
        method: "GET",
        url: "https://edamam-recipe-search.p.rapidapi.com/search",
        params: { q: `${categories}` },
        headers: {
            "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
            "x-rapidapi-key": APIKEY,
        },
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
}

// function submitHandler(e) {
//     e.preventDefault()
// }


categoryForm.addEventListener('submit', getFoodByCategory)



// returning chicken so we can see what we should have
// axios({
//   method: "GET",
//   url: "https://edamam-recipe-search.p.rapidapi.com/search",
//   params: { q: "chicken" },
//   headers: {
//     "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
//     "x-rapidapi-key": "316c95ac9dmsh2e6c9f27f0f8e21p14db55jsn2379613b3fb3",
//   },
// })
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });