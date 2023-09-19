import { Flight } from '../models/flight.js'

function newMeal(req, res) {
  res.render('meals/new', {
    title: 'New Meals'
  })
}

export {
  newMeal as new,
}