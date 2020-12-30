const mongoose = require(mongoose)
const {Schema} = mongoose
const RecipientSchema = require('./Recipient')

const survySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  _user: {type: Schema.Type.ObjectId, ref: 'User'},
  dateSent: Date,
  lastResponded: Date
})

mongoose.model('surveys', survySchema)
