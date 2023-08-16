/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import UserContext from "../AppContext"
import RecipeItem from "./RecipeItem"

function UserMealsList() {
  const { user } = useContext(UserContext)
  const [clickedMeal, setClickedMeal] = useState('')
  const [mealRecipes, setMealRecipes] = useState([])
  const meals = user.recipes_by_meal.map(meal => meal.name)

  useEffect(() => {
    selectRecipesByMeal(clickedMeal)
  }, [user, clickedMeal])

  function selectRecipesByMeal(mealName) {
    const selectedMeal = user.recipes_by_meal.find(meal => meal.name === mealName)
    const selectedMealRecipes = selectedMeal ? selectedMeal.recipes : []
    setMealRecipes(selectedMealRecipes)
  }

  const recipeMealsList = meals.map(meal => {
    return <li key={meal}
      onClick={() => { setClickedMeal(meal) }}
    >{meal}</li>
  })

  return (
    <>
      <h2>{user.username}'s Recipes by Meal</h2>
      {/* {user.recipes.length === 0 &&
        <>
          <h3>{user.username} has 0 recipes</h3>
          <h3>You should create some</h3>
        </>} */}
      <ol>{recipeMealsList}</ol>
      <div>
        <h3>
          {mealRecipes.length > 0 ? `${clickedMeal} Recipes`
            : null}
        </h3>
        <ol>
          {mealRecipes.length > 0 ?
            mealRecipes.map(recipe => {
              return <RecipeItem key={recipe.id} recipe={recipe} selectedMeal={clickedMeal} />
            })
            : null}
        </ol>
      </div>
    </>
  )
}

export default UserMealsList