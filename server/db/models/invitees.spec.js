const {expect} = require('chai')
const db = require('../index')
const Invitee = db.model('invitees')

describe('Invitee model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column defitions and validations', () => {
    it('has a `name` and `email`', async () => {
      const invites = await Invitee.create({
        name: 'serge',
        email: 'serge@email.com'
      })
      expect(invites.name).to.equal('serge')
      expect(invites.email).to.equal('serge@email.com')
    })
    it('`name` and `email` is required', async () => {
      const invite = Invitee.build()
      return invite.validate().then(
        () => {
          throw new Error('validation should have failed')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })
})
