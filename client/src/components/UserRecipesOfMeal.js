import React, { useContext } from "react"
// import { useNavigate } from "react-router-dom"
import UserContext from "../AppContext"

function UserRecipesOfMeal() {
  const { user, recipes } = useContext(UserContext)
  const recipesList = recipes.map(recipe => {
    return <li key={recipe.id}>
      <h4>{recipe.title}</h4>
      <p>{recipe.description}</p>
    </li>
  })
  return (
    <>
      <h2>{user.username}'s {recipes[0].meal.name} Recipes</h2>
      <ul>{recipesList}</ul>
    </>
  )
}

export default UserRecipesOfMeal