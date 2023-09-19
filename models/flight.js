import mongoose from "mongoose"



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

const mealSchema = new Schema({
  seat: String
})

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
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
  }, {
    timestamps: true
  })

const Flight = mongoose.model('Flight', flightSchema)

export { Flight }


