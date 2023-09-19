import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.post('/', flightsCtrl.create)
router.post('/:flightId/tickets', flightsCtrl.createTicket)
router.post('/:flightId/meals', flightsCtrl.addMeal)
router.delete('/:flightId', flightsCtrl.delete)
router.get('/:flightId', flightsCtrl.show)
router.get('/:flightId/edit', flightsCtrl.edit)
router.put('/:flightId', flightsCtrl.update)

export { router }
