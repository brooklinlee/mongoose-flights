import mongoose from "mongoose"

// import { Ticket } from "./ticket"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String, 
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0,
  }
})

// const Ticket = mongoose.model('Example', ticketSchema)

const flightSchema = new Schema({
  airline : {
    type: String,
    default: 'n/a'
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: () => {
      const currentDate = new Date()
      const nextYearDate = new Date(currentDate)
      nextYearDate.setFullYear(currentDate.getFullYear() +1)
      return nextYearDate
      }
    },
  tickets: [ticketSchema]
  }, {
    timestamps: true
  })

const Flight = mongoose.model('Flight', flightSchema)

export { Flight }


