const router = require('express').Router()
const {Event, Invitee, Task, User} = require('../db/models')
const main = require('./nodemailer')
module.exports = router

router.post('/invite', async (req, res, next) => {
  try {
    const emails = []
    await Promise.all(
      req.body.map(async member => {
        const isUser = await User.findOne({
          where: {
            email: member.email
          }
        })
        if (!isUser) {
          const invitee = {
            name: member.name,
            email: member.email,
            eventId: member.eventId
          }
          Invitee.create(invitee)
        } else {
          isUser.addEvent(member.eventId)
        }
        await main(
          member.email,
          member.name,
          req.user.firstName,
          member.eventId
        )

        emails.push(member.email)
      })
    )

    res.json(emails)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findOne({
      where: {id: req.params.id},
      include: [Invitee, User, Task]
    })
    res.json(event)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const event = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      startTime: req.body.startTime
    }
    const newEvent = await Event.create(event)
    newEvent.addUser(req.user.id, {
      through: {isOrganizer: true, attending: 'yes'}
    })
    res.json(newEvent)
  } catch (err) {
    next(err)
  }
})
