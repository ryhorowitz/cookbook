import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../AppContext"

function UserMealsList() {
  const { user } = useContext(UserContext)
  const [mealRecipes, setMealRecipes] = useState([])

  function filterRecipesByMeal(mealName) {
    const filteredRecipes = user.recipes.filter(recipe => {
      return recipe.meal_type === mealName
    })
    setMealRecipes(filteredRecipes)
  }

  const recipeMealsList = user.meals.map(meal => {
    return <li key={meal.id}
      onClick={() => { filterRecipesByMeal(meal.name) }}
    >{meal.name}</li>
  })

  return (
    <>
      <h2>{user.username}'s Recipes by Meal</h2>
      <ol>{recipeMealsList}</ol>
      <div>
        <h3>
          {mealRecipes.length > 0 ? `${mealRecipes[0].meal_type} Recipes`
            : null}
        </h3>
        <ol>
          {mealRecipes.length > 0 ?
            mealRecipes.map(recipe => {
              return <li key={recipe.id}>
                <h4>{recipe.title}</h4>
                <p>{recipe.description}</p>
              </li>
            })
            : null}
        </ol>
      </div>
    </>
  )
}

export default UserMealsList