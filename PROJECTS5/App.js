const SearchBox = document.querySelector(".SearchBox");
const searchBtn = document.getElementById("btn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");



// function to get recipe.
const fetchRecipes = async (query) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json();
    // console.log(response.meals[0]);
       
      recipeContainer.innerHTML = ""
     
      response.meals.forEach(meal => {
        //  console.log(meal);
        const recipeDiv = document.createElement('div');
         recipeDiv.classList.add('recipe');
         recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
           <h3>${meal.strMeal}</h3> 
           <p> <span>${meal.strArea}</span Dish</p>
           <p> Belong to <span>${meal.strCategory}</span> Category</p>
         `
         const button = document.createElement('button');
         button.textContent = 'View Recipe'
         recipeDiv.appendChild(button);
        
        // adding evt listner to recipe btn
         button.addEventListener('click',()=>{
            openRecipePopup(meal);
         });
    
    
    
         recipeContainer.appendChild(recipeDiv);


      });
  }
  catch (error){
    recipeContainer.innerHTML = "<h2> Error in Fetching Recipes...</h2>"

  }
}



searchBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  const searchInput = SearchBox.value.trim();
  if(!searchInput){
    recipeContainer.innerHTML = `<h2>Type the meal in search box😋🍴.</h2> `
    return;
  }
  fetchRecipes(searchInput);
});

// finction to fetch Ingeridents and measurements
const fetchIngredients = (meal) => {
  // console.log(meal);
  let ingeridentsList = '';

  for(let i = 1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
      const measure = meal[`strMeasure${i}`];
      ingeridentsList += `<li>${measure} ${ingredient}</li>`
    }

    else{
      break;
    }
  }
  return ingeridentsList; 
};

recipeCloseBtn.addEventListener('click',()=>{
  recipeDetailsContent.parentElement.style.display = 'none';
});

const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}<h2/>
    <h3>Ingredients:<h3/>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    
    <div class="recipeInstructions">
        <h3>Instructions<h3/>
        <p >${meal.strInstructions}<p>
    </div>
  `
  
  recipeDetailsContent.parentElement.style.display = 'block';
};
