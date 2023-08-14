import React, { useContext, useState } from "react"
import UserContext from "../AppContext"

function RecipeItem({ recipe }) {
  const { user, setUser } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  const [toggleEditModal, setToggleEditModal] = useState(false)
  const [editModal, setEditModal] = useState({
    title: recipe.title,
    description: recipe.description
  })

  function handleDelete(id, meal_type) {
    fetch(`/recipes/${id}`, { method: 'DELETE' })
      .then(() => {
        setUser({
          ...user,
          recipes: filterOutDeletedRecipe(id)
        })
      })
      .then(() => {
        console.log('filterRecipesByMeal block')
      })
      .catch((e) => console.error('error is ', e.message))
  }

  function filterOutDeletedRecipe(id) {
    return user.recipes.filter(recipe => recipe.id !== id)
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
        recipes: updateRecipesArray(user.recipes, updatedRecipe)
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