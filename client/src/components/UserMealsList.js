/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import UserContext from "../AppContext"
import RecipeItem from "./RecipeItem"

function UserMealsList() {
  const { user } = useContext(UserContext)
  const [clickedMeal, setClickedMeal] = useState('')
  const [mealRecipes, setMealRecipes] = useState([])
  const meals = Object.keys(user.recipes_by_meal)

  useEffect(() => {
    filterRecipesByMeal(clickedMeal)
  }, [user, clickedMeal])

  function filterRecipesByMeal(mealName) {
    const filteredRecipes = user.recipes_by_meal[mealName] ? user.recipes_by_meal[mealName] : []
    setMealRecipes(filteredRecipes)
  }

  const recipeMealsList = meals.map(meal => {
    return <li key={meal}
      onClick={() => { setClickedMeal(meal) }}
    >{meal}</li>
  })

  return (
    <>
      <h2>{user.username}'s Recipes by Meal</h2>
      {user.recipes.length === 0 &&
        <>
          <h3>{user.username} has 0 recipes</h3>
          <h3>You should create some</h3>
        </>}
      <ol>{recipeMealsList}</ol>
      <div>
        <h3>
          {mealRecipes.length > 0 ? `${clickedMeal} Recipes`
            : null}
        </h3>
        <ol>
          {mealRecipes.length > 0 ?
            mealRecipes.map(recipe => {
              return <RecipeItem key={recipe.id} recipe={recipe} />
            })
            : null}
        </ol>
      </div>
    </>
  )
}

export default UserMealsList