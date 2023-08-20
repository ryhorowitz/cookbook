import React, { useContext, useState } from "react"
import UserContext from "../AppContext"

function RecipeItem({ recipe, selectedMeal }) {
  const { user, setUser } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  const [toggleEditModal, setToggleEditModal] = useState(false)
  const [editModal, setEditModal] = useState({
    title: recipe.title,
    description: recipe.description
  })

  function handleDelete(id) {
    fetch(`/recipes/${id}`, { method: 'DELETE' })
      .then(() => { filterOutDeletedRecipe(id) })
      .then(() => {
        console.log('filterRecipesByMeal block')
      })
      .catch((e) => console.error('error is ', e.message))
  }

  function filterOutDeletedRecipe(id) {
    const meal = findMealObj()
    const recipeListWithoutDeletedRecipe = meal.recipes.filter(recipe => recipe.id !== id)
    if (recipeListWithoutDeletedRecipe.length === 0) {
      // remove the meal object from the recipes_by_meal array
      const recipesByMealWithoutMealObj = user.recipes_by_meal.filter(meal => meal.name !== selectedMeal)
      setUser({
        ...user,
        recipes_by_meal: recipesByMealWithoutMealObj
      })
    } else {
      meal.recipes = recipeListWithoutDeletedRecipe
      const updatedMealsArray = user.recipes_by_meal.map(m => {
        if (m.name === meal.name) {
          return meal
        } else {
          return m
        }
      })
      setUser({
        ...user,
        recipes_by_meal: updatedMealsArray
      })
    }
  }

  async function handleEditRecipe(e) {
    e.preventDefault()
    const res = await fetch(`/recipes/${recipe.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editModal)
    })
    const updatedRecipe = await res.json()

    if (res.ok) {
      console.log('updated review is ', updatedRecipe)
      updateRecipesArray(updatedRecipe)

      setEditModal({
        title: updatedRecipe.title,
        description: updatedRecipe.description
      })
      setToggleEditModal(false)
    } else {
      console.error('errors', updatedRecipe)
      setErrors(Object.values(updatedRecipe.errors))
    }
  }
  function findMealObj() {
    return user.recipes_by_meal.find(meal => meal.name === selectedMeal)
  }

  function updateRecipesArray(updatedRecipe) {
    // const mealObj = user.recipes_by_meal.find(meal => meal.name === selectedMeal)
    const mealObj = findMealObj()
    // find the recipe to be update
    const updatedRecipesArray = mealObj.recipes.map(recipe => {
      if (recipe.id === updatedRecipe.id) {
        return updatedRecipe
      } else {
        return recipe
      }
    })
    mealObj.recipes = updatedRecipesArray
    // update the array of meal objs
    const updatedMealsRecipeArray = user.recipes_by_meal.map(meal => {
      if (meal.name === selectedMeal) {
        return mealObj
      } else {
        return meal
      }
    })
    setUser({
      ...user,
      recipes_by_meal: updatedMealsRecipeArray
    })
  }
  function handleChange(e) {
    const { name, value } = e.target
    setEditModal({
      ...editModal,
      [name]: value
    })
  }

  function cancelUpdate() {
    setToggleEditModal(!toggleEditModal)
    setEditModal({
      title: recipe.title,
      description: recipe.description
    })
  }
  return (
    <>
      {toggleEditModal ?
        <li>
          <div>
            {errors.length > 0 && (
              <ul style={{ color: "red" }}>
                {errors.map(err => {
                  return <li key={err}>{err}</li>
                })}
              </ul>
            )}
            <form onSubmit={handleEditRecipe}>
              <label htmlFor="title">Title: </label>
              <input
                style={{ 'width': '250px' }}
                type="text"
                id='title'
                name="title"
                value={editModal.title}
                onChange={handleChange}
              ></input>
              <div>
                <label htmlFor="body">Description: </label>
                <textarea
                  type="text"
                  id='description'
                  name="description"
                  rows="8"
                  cols="50"
                  value={editModal.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type='submit'>Submit</button>
              <button onClick={cancelUpdate}>Cancel Update</button>
            </form>
          </div >
        </li>
        :
        <li >
          <h4>{recipe.title}</h4>
          <p>{recipe.description}</p>
          <div>
            <button onClick={() => setToggleEditModal(!toggleEditModal)}>Update</button>
            <button onClick={() => handleDelete(recipe.id, recipe.meal_type)}>Delete</button>
          </div>

        </li>
      }
    </>

  )
}

export default RecipeItem