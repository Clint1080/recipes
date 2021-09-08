import { APIKEY } from "./config.js";

const categoryForm = document.querySelector(".category-form");
const categoryButton = document.querySelector(".category-button");
const searchByIngredientsContainer = document.querySelector(
  "#container-search-ingredients"
);

// Saves a recipe to my recipes "db"
let myRecipes = [];
function saveToMyRecipes(recipe) {
  myRecipes.push(recipe);
  console.log(myRecipes);
}

// Delete button
function deleteRecipe(recipeName) {
  for (let i = 0; i < myRecipes.length; i++) {
    if (recipeName === myRecipes[i].label) {
      myRecipes.splice(i, 1);
    }
  }
  const savedRecipeContainer = document.querySelector(
    ".container-save-recipes"
  );
  savedRecipeContainer.innerHTML = "";
  myRecipes.map((recipe) => {
    let ingredients = recipe.ingredients;
    return savedRecipeCard(ingredients, recipe.label, recipe);
  });
}

// Display our save recipes
const savedRecipeCard = (ingredientArr, name, recipe) => {
  const savedRecipeContainer = document.querySelector(
    ".container-save-recipes"
  );

  const newRecipeCard = document.createElement("div");
  newRecipeCard.classList.add("recipe-card");
  const newRecipeList = document.createElement("ul");
  const newRecipeCardName = document.createElement("h2");

  newRecipeCardName.textContent = name;
  newRecipeList.innerHTML = ingredientArr
    .map((ingredient) => {
      return `
        <li class="ingredient">${ingredient.text}</li>
        
        `;
    })
    .join("");
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteRecipe(name);
  });
  savedRecipeContainer.appendChild(newRecipeCard);
  newRecipeCard.appendChild(newRecipeCardName);
  newRecipeCard.appendChild(newRecipeList);
  newRecipeCard.appendChild(deleteButton);
};

// Category search
const getFoodByCategory = (e) => {
  e.preventDefault();

  let categories = document.querySelector(".category-search-input").value;

  const createRecipeCard = (ingredientArr, name, recipe) => {
    const searchByCategoryContainer = document.querySelector(
      ".container-search-category"
    );
    const newRecipeCard = document.createElement("div");
    newRecipeCard.classList.add("recipe-card");
    const newRecipeList = document.createElement("ul");
    const newRecipeCardName = document.createElement("h2");

    newRecipeCardName.textContent = name;
    newRecipeList.innerHTML = ingredientArr
      .map((ingredient) => {
        return `
                <li class="ingredient">${ingredient.text}</li>
                
                `;
      })
      .join("");
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save__button");
    saveButton.addEventListener("click", () => {
      saveToMyRecipes(recipe);
      savedRecipeCard(ingredientArr, name, recipe);
    });

    searchByCategoryContainer.appendChild(newRecipeCard);
    newRecipeCard.appendChild(newRecipeCardName);
    newRecipeCard.appendChild(newRecipeList);
    newRecipeCard.appendChild(saveButton);
  };
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
      let recipes = [...response.data.hits];
      recipes.map((recipe) => {
        let ingredients = recipe.recipe.ingredients;
        return createRecipeCard(
          ingredients,
          recipe.recipe.label,
          recipe.recipe
        );
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

myRecipes.map((recipe) => {
  let ingredients = recipe.recipe.ingredients;
  return savedRecipeCard(ingredientArr, name, recipe);
});

categoryForm.addEventListener("submit", getFoodByCategory);
