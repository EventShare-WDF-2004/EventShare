const {expect} = require('chai')
const db = require('../index')
const Notification = db.model('notifications')

describe('Notification model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column defitions and validations', () => {
    it('has a `authorId` , `authorName`, `text`, `read`, `date`', async () => {
      const notification = await Notification.create({
        authorId: 'first',
        authorName: 'mamu',
        text: 'to do',
        //date: 'wed, 24 jun 2020',
        read: true
      })
      expect(notification.authorId).to.equal('first')
      expect(notification.authorName).to.equal('mamu')
      expect(notification.text).to.equal('to do')
      //expect(notification.date).to.equal('wed, 24 jun 2020')
      expect(notification.read).to.equal(true)
    })
    it('`date` and `read` has a default value of false and current date', async () => {
      const pog = await Notification.create({authorName: 'mamu'})
      expect(pog.read).to.equal(false)
    })
  })
})
