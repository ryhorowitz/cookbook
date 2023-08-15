import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../AppContext"

function CreateRecipe() {
  const { meals, user, setUser } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  const [recipeForm, setRecipeForm] = useState({
    title: '',
    description: '',
    meal_id: 0
  })
  const navigate = useNavigate()

  async function handleSubmitRecipe(e) {
    e.preventDefault()
    if (mealIsNotChoosen()) { return }
    const response = await fetch(`/recipes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipeForm)
    })
    const recipe = await response.json()

    if (response.ok) {
      console.log('recipe is', recipe)

      // setUser({
      //   ...user,
      //   recipes: [...user.recipes, recipe]
      // })
      navigate('/home')
      newMealForUser(recipe)
    } else {
      console.error(recipe.errors)
      setErrors(recipe.errors)
    }
  }
  function newMealForUser(newRecipe) {
    const userMeals = Object.keys(user.recipes_by_meal)
    console.log('newRecipe.mealType', newRecipe.meal_type)
    if (userMeals.includes(newRecipe.meal_type)) {
      console.log('newMealForUser', user.recipes_by_meal[newRecipe.meal_type])
      setUser({
        ...user,
        recipes_by_meal: {
          ...user.recipes_by_meal,
          [newRecipe.meal_type]: [...user.recipes_by_meal[newRecipe.meal_type], newRecipe]
        }
      })
      console.log({
        ...user,
        recipes_by_meal: {
          ...user.recipes_by_meal,
          [newRecipe.meal_type]: [newRecipe]
        }
      })
    } else {
      setUser({
        ...user,
        recipes_by_meal: {
          ...user.recipes_by_meal,
          [newRecipe.meal_type]: [newRecipe]
        }
      })
    }
    //   //search through user.meals 
    //   //does this meal.name === recipe.meal_type?
    //   // yes: do nithing
    //   // no: add in the meal object to the meals array
  }
  function handleChange(e) {
    const { name, value } = e.target
    setRecipeForm({
      ...recipeForm,
      [name]: value
    })
  }
  function mealIsNotChoosen() {
    if (recipeForm.meal_id === 0) {
      alert('Please choose a meal')
      return true
    }
  }

  function handleMealSelection(e) {
    setRecipeForm({ ...recipeForm, meal_id: e.target.selectedOptions[0].id })
  }

  const mealOptions = meals.map(meal => {
    return <option
      key={meal.id}
      id={meal.id}
      value={meal.id}
    >{meal.name}</option>
  })

  mealOptions.unshift(<option
    key={0}
    id={0}
    value={'Choose Meal'}
  >-Choose Meal-</option>)

  return (
    <>
      <form onSubmit={handleSubmitRecipe}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipeForm.title}
            onChange={handleChange}></input>
        </div>
        <div>
          <label htmlFor="meal">Meal:</label>
          <select
            name="meal_id"
            value={recipeForm.meal_id}
            onChange={handleMealSelection}>
            {mealOptions}
          </select>
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            id="description"
            name="description"
            rows="8"
            cols="50"
            value={recipeForm.description}
            onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit</button>
        {errors.length > 0 ?
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}> {error} </li>
            ))}
          </ul>
          : null}
      </form>
    </>
  )
}

export default CreateRecipe