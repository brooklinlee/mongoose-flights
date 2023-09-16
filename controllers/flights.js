import { Flight } from '../models/flight.js'

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}


export {
  index
}