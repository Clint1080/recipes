import { APIKEY } from './config.js'

const categoryForm = document.querySelector(".category-form")
const categoryButton = document.querySelector(".category-button")

const keywordInput = document.querySelector(".keyword-search-input")
const keywordButton = document.querySelector(".keyword-button")

const searchByIngredientsContainer = document.querySelector("#container-search-ingredients");


// Category search
const getFoodByCategory = (e) => {
    e.preventDefault()
    
    let categories = document.querySelector(".category-search-input").value;

    const createRecipeCard = ( ingredientArr, name ) => {
        const searchByCategoryContainer = document.querySelector(".container-search-category");
        const newRecipeCard = document.createElement("div");
        const newRecipeList = document.createElement('ul');
        const newRecipeCardName = document.createElement("h2");

        newRecipeCardName.textContent = name
        newRecipeList.innerHTML = ingredientArr.map((ingredient) => {
            return `<li class="ingredient">${ingredient.text}</li>`
        }).join('')
        
        searchByCategoryContainer.appendChild(newRecipeCard)
        newRecipeCard.appendChild(newRecipeCardName)
        newRecipeCard.appendChild(newRecipeList)
    }
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
        // console.log(response.data);
        let recipes = [...response.data.hits]
        recipes.map((recipe) => {
            let ingredients = recipe.recipe.ingredients
            return createRecipeCard(ingredients, recipe.recipe.label)
        })

    })
    .catch(function (error) {
        console.error(error);
    });
}



categoryForm.addEventListener('submit', getFoodByCategory)



