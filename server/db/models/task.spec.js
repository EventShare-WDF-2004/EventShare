const {expect} = require('chai')
const db = require('../index')
const Task = db.model('tasks')

describe('Task model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column defitions and validations', () => {
    it('has a `title` , `description`, `category`, `completed`', async () => {
      const task = await Task.create({
        title: 'cleaning',
        description: 'floor cleaning',
        category: 'to do',
        completed: true
      })
      expect(task.title).to.equal('cleaning')
      expect(task.description).to.equal('floor cleaning')
      expect(task.category).to.equal('to do')
      expect(task.completed).to.equal(true)
    })
    it('`title` and `category` is required', async () => {
      const tasks = Task.build()
      return tasks.validate().then(
        () => {
          throw new Error('validation should have failed')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })

    it('`completed` has a default value of false ', async () => {
      const tks = await Task.create({title: 'cleaning', category: 'to do'})
      expect(tks.completed).to.equal(false)
    })
  })
})
