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
  app.get('/api/surveys', requireLogin, async(req, res) => {
    const surveys = await Survey.find({_user: req.user.id})
      .select({recipients: false})

    res.send(surveys)
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    console.log(Survey)
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice')

    // chaining diffirent methodes on an array
    _.chain(req.body)
      .map(({email, url}) => {
        const match = p.test(new URL(url).pathname)
        if(match) {
          const {surveyId, choice} = match
          return {email, surveyId, choice}
        }
      })
      // removes all undefinds
      .compact()
      // extract uniq elements
      .uniqBy('email', 'surveyId')
      // it returns the end value
      .each(({surveyId, email, choice}) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: {email, responded: false}
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec()
      })
      .value()
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
