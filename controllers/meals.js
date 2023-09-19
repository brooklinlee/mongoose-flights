// import { Meal } from "../models/meal"

function newMeal(req, res) {
  res.render('meals/new', {
    title: 'New Meals'
  })
}

export {
  newMeal as new,
}