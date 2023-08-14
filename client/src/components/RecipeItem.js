import _ from 'lodash';
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
    const filteredSelectMealRecipeList = user.recipes_by_meal[selectedMeal].filter(recipe => recipe.id !== id)
    if (filteredSelectMealRecipeList.length === 0) {
      const recipes_by_mealCopy = _.cloneDeep(user.recipes_by_meal)
      delete recipes_by_mealCopy[selectedMeal]
      setUser({
        ...user,
        recipes_by_meal: recipes_by_mealCopy
      })
    } else {
      setUser({
        ...user,
        recipes_by_meal: {
          ...user.recipes_by_meal,
          [selectedMeal]: filteredSelectMealRecipeList
        }
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
      setUser({
        ...user,
        recipes_by_meal: {
          ...user.recipes_by_meal,
          [selectedMeal]: updateRecipesArray(user.recipes_by_meal[selectedMeal], updatedRecipe)
        }
      })


      setEditModal({
        title: recipe.title,
        description: recipe.description
      })
      setToggleEditModal(false)
    } else {
      console.error('errors', updatedRecipe)
      setErrors(Object.values(updatedRecipe.errors))
    }


  }

  function updateRecipesArray(recipes, updatedRecipe) {
    return recipes.map(recipe => {
      if (recipe.id === updatedRecipe.id) {
        return updatedRecipe
      } else {
        return recipe
      }
    })
  }
  function handleChange(e) {
    const { name, value } = e.target
    setEditModal({
      ...editModal,
      [name]: value
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
              <button onClick={() => setToggleEditModal(!toggleEditModal)}>Cancel Update</button>
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