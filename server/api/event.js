const Sequelize = require('sequelize')
const Op = Sequelize.Op
const router = require('express').Router()
const {Event, Invitee, Task, User, userEventRel} = require('../db/models')
const main = require('./nodemailer')
const inviteEmail = require('../../client/components/AdditionalForms/InviteEmail')
module.exports = router

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
      through: {isOrganizer: true, attending: 'Attending'}
    })
    res.json(newEvent)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findOne({
      where: {id: req.params.id},

      include: [
        {
          model: userEventRel,
          where: {
            userId: req.user.id
          }
        },
        Invitee,
        User,
        Task,
        userEventRel
      ]
    })

    const areAttending = await event.countUsers_events({
      where: {
        attending: 'Attending'
      }
    })
    const notAttending = await event.countUsers_events({
      where: {
        attending: 'Declined'
      }
    })

    const arePending = await event.countUsers_events({
      where: {
        attending: 'Pending'
      }
    })

    const count = {
      areAttending,
      notAttending,
      arePending
    }
    const eventAndCount = {event, count}

    res.json(eventAndCount)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id/delete', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id)
    event.destroy()
    const events = await userEventRel.findAll({
      attributes: ['isOrganizer', 'eventId', 'userId', 'attending'],
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: Event,
          where: {
            date: {
              [Op.gt]: new Date()
            }
          },
          attributes: {exclude: ['createdAt', 'updatedAt']},
          order: ['date', 'DESC']
        }
      ]
    })
    console.log('EVENT', events)
    res.json(events)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/edit', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id)
    for (let input in req.body) {
      if (event[input]) {
        event[input] = req.body[input]
      }
    }
    await event.save()

    const areAttending = await event.countUsers_events({
      where: {
        attending: 'Attending'
      }
    })
    const notAttending = await event.countUsers_events({
      where: {
        attending: 'Declined'
      }
    })

    const arePending = await event.countUsers_events({
      where: {
        attending: 'Pending'
      }
    })

    const count = {
      areAttending,
      notAttending,
      arePending
    }
    const eventAndCount = {event, count}

    res.json(eventAndCount)
  } catch (err) {
    next(err)
  }
})

router.post('/invite', async (req, res, next) => {
  try {
    let eventId
    let isNew = []
    let isMemberAlready
    await Promise.all(
      req.body.map(async member => {
        eventId = member.eventId
        const isUser = await User.findOne({
          where: {
            email: member.email
          }
        })
        if (!isUser) {
          isNew = await Invitee.findOrCreate({
            where: {
              email: member.email
            },
            defaults: {
              email: member.email,
              name: member.name,
              eventId: member.eventId
            }
          })
        } else {
          const search = await isUser.getUsers_events({
            where: {eventId: member.eventId}
          })
          if (search.length === 0) {
            isMemberAlready = await isUser.addEvent(member.eventId)
          }
        }
        if (isNew[1] || isMemberAlready) {
          const emailTemplate = inviteEmail(
            member.name,
            req.user.firstName,
            member.eventId
          )
          console.log(emailTemplate)
          await main(member.email, req.user.firstName, emailTemplate)
        }
      })
    )
    const event = await Event.findByPk(eventId, {
      include: [
        {
          model: userEventRel,
          where: {
            userId: req.user.id
          }
        },
        Invitee,
        User,
        Task,
        userEventRel
      ]
    })

    const areAttending = await event.countUsers_events({
      where: {
        attending: 'Attending'
      }
    })
    const notAttending = await event.countUsers_events({
      where: {
        attending: 'Declined'
      }
    })

    const arePending = await event.countUsers_events({
      where: {
        attending: 'Pending'
      }
    })

    const count = {
      areAttending,
      notAttending,
      arePending
    }
    const eventAndCount = {event, count}

    res.json(eventAndCount)
  } catch (err) {
    next(err)
  }
})

router.put('/:eventId/updateUser', async (req, res, next) => {
  try {
    const userEvent = await userEventRel.findOne({
      where: {
        userId: req.user.id,
        eventId: req.params.eventId
      }
    })
    userEvent.attending = req.body.decision
    await userEvent.save()
    const event = await Event.findByPk(req.params.eventId, {
      include: [User, Invitee]
    })
    res.json({event})
  } catch (err) {
    next(err)
  }
})
