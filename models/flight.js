import mongoose from "mongoose"

const Schema = mongoose.Schema

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
    // default: () => {
    //     return new Date().getFullYear()
    //   }
    default: () => {
      const currentDate = new Date()
      const nextYearDate = new Date(currentDate)
      nextYearDate.setFullYear(currentDate.getFullYear() +1)
      return nextYearDate
      }
    }
  }, {
    timestamps: true
  })

const Flight = mongoose.model('Flight', flightSchema)

export { Flight }


