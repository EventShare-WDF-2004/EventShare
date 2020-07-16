const router = require('express').Router()
const {Poll, Options, Answers, User, Event} = require('../db/models')
const main = require('./nodemailer')
const PollEmail = require('../../client/components/AdditionalForms/PollEmail')

module.exports = router

const dummyData = {
  title: 'What to do for breakfast',
  options: ['pancakes', 'french Toast', 'burgers'],
  eventId: 1
}

const dummyData2 = {
  userId: 2,
  optionId: 1,
  pollId: 9
}

router.get('/:pollId', async (req, res, next) => {
  try {
    const currPoll = await Poll.findByPk(req.params.pollId, {
      include: Options
    })
    res.json(currPoll)
  } catch (err) {
    next(err)
  }
})

router.get('/:eventId/polls', async (req, res, next) => {
  try {
    const polls = await Poll.findAll({
      where: {
        eventId: req.params.eventId
      }
    })
    res.json(polls)
  } catch (err) {
    next(err)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const poll = {
      title: req.body.title,
      userId: req.user.id,
      eventId: req.body.eventId
    }

    const newPoll = await Poll.create(poll)

    for (let i = 0; i < req.body.options.length; i++) {
      let title = req.body.options[i]
      let option = await Options.create({title})
      option.setPoll(newPoll.id)
    }

    const currEvent = await Event.findByPk(req.body.eventId)
    const guests = await currEvent.getUsers({
      attributes: ['firstName', 'email']
    })

    for (let i = 0; i < guests.length; i++) {
      let member = guests[i]
      const emailTemplate = PollEmail(
        member.firstName,
        req.user.firstName,
        req.body.eventId,
        poll.title
      )

      await main(member.email, req.user.firstName, emailTemplate)
    }

    res.status(201).json(newPoll)
  } catch (error) {
    next(error)
  }
})

router.put('/:pollId', async (req, res, next) => {
  try {
    const answer = {
      optionId: 1,
      userId: 1
    }
    const newAnswer = await Answers.create(answer)
    //to be finished
    res.status(201).json(newAnswer)
  } catch (error) {
    next(error)
  }
})
