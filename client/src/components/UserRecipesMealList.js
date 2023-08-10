import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../AppContext"

function UserRecipesMealList() {
  const { user, meals, setRecipes } = useContext(UserContext)
  const navigate = useNavigate()
  function getRecipesByMeal(id) {
    // make get request to... meals.show

    fetch(`/meals/${id}/recipes`)
      .then(r => r.json())
      .then(data => {
        console.log('data is', data)
        setRecipes(data)
      })
      .then(() => navigate(`/meals/${id}/recipes`))
    // get the recipes where meal.id === user.id 
  }
  const recipeMealsList = user.meals.map(meal => {
    return <li key={meal.id}
      onClick={() => { getRecipesByMeal(meal.id) }}
    >{meal.name}</li>
  })
  return (
    <>
      <h2>User Recipes by Meal</h2>
      <ol>{recipeMealsList}</ol>
    </>
  )
}

export default UserRecipesMealList