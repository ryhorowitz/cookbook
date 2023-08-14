/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import UserContext from "../AppContext"
import RecipeItem from "./RecipeItem"

function UserMealsList() {
  const { user } = useContext(UserContext)
  const [clickedMeal, setClickedMeal] = useState('')
  const [mealRecipes, setMealRecipes] = useState([])

  // useEffect when user updates rerun mealRecipes

  useEffect(() => {
    filterRecipesByMeal(clickedMeal)
  }, [user, clickedMeal])

  function filterRecipesByMeal(mealName, id) {
    const filteredRecipes = user.recipes.filter(recipe => {
      return recipe.meal_type === mealName
    })
    setMealRecipes(filteredRecipes)
  }

  const recipeMealsList = user.meals.map(meal => {
    return <li key={meal.id}
      onClick={() => { setClickedMeal(meal.name) }}
    >{meal.name}</li>
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
          {mealRecipes.length > 0 ? `${mealRecipes[0].meal_type} Recipes`
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