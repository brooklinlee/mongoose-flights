import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

function index(req, res) {
  Flight.find({})
  .then (flights => {
    res.render('flights/index', {
    flights: flights,
    title: 'All Flights'
  })
})
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title:'Add New Flight'
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
    res.render('flights/show', {
      flight: flight,
      title: 'Show Flight',
      meals: meals,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
})
.catch(err => {
  console.log(err)
  res.redirect('/flights')
})
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.flightId, req.body)
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    // console.log(flight.tickets)
    flight.save()
    .then(flight => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function addMeal(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  addMeal,
}