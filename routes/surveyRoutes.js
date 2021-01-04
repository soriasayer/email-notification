const mongoose = require('mongoose')
const requireLogin = require( "../middlewares/requireLogin" )
const requiredCredits = require('../middlewares/requiredCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const _ = require('lodash')
const {URL} = require('url')
const { Path } = require( 'path-parser' )

const Survey = mongoose.model('surveys')

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, ({email, url}) => {
      const pathname = new URL(url).pathname
      const p = new Path('/api/surveys/:surveyId/:choice')
      const match = p.test(pathname)
      if(match) {
        const {surveyId, choice} = match
        return {email, surveyId, choice}
      }
    })

    // removes all undefinds
    const compactEvents = _.compact(events)
    // extract uniq elements
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId')
    console.log(uniqueEvents)
    res.send({})
  })

  app.post('/api/surveys', requireLogin, requiredCredits, async(req, res) => {
    const {title, subject, body, recipients} = req.body

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now()
    })

    const mailer = new Mailer(survey, surveyTemplate(survey))
    try{
      await mailer.send()
      await survey.save()
      req.user.credits -= 1
      const user = await req.user.save()

      res.send(user)
    } catch(err){
      res.status(422).send(err)
    }

  })
}
