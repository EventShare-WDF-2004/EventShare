import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllTasksForAnEvent, addTaskToUser} from '../store/task'
import {
  Container,
  Button,
  Chip,
  List,
  ListItem,
  Divider,
  ListItemText,
  Box,
  Avatar,
  Typography,
  IconButton
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

export class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventId: null
    }
  }

  async componentDidMount() {
    const eventId = await this.props.match.params.id
    await this.props.getAllTasksForAnEvent(eventId)
  }

  async handleChooseTask(taskId) {
    const asigneedId = this.props.user.id
    const eventId = this.props.match.params.id
    let updateTask = {
      taskId: taskId,
      userId: asigneedId,
      eventId: eventId
    }
    await this.props.addTaskToUser(updateTask, taskId)
  }

  delete(taskId) {
    console.log('TaskList -> delete -> delete', taskId)
  }

  render() {
    const {tasks} = this.props
    const eventId = this.props.match.params.id
    return (
      <Container maxWidth="sm">
        <Box pt={2} display="flex" className="space-between">
          <Button color="primary">What to bring:</Button>
          <Link to={`/events/${eventId}/add-task`}>
            <Button color="primary" variant="contained" size="small">
              Create a task
            </Button>
          </Link>
        </Box>
        <Divider />
        <List className="task-list">
          {tasks ? (
            tasks.map(task => {
              if (task.category === 'to bring') {
                return (
                  <div key={task.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={task.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className="inline"
                              color="textPrimary"
                            />
                            {task.description}
                          </React.Fragment>
                        }
                      />

                      {task.user ? (
                        <div>
                          <Chip
                            avatar={
                              <Avatar
                                alt={task.user.firstName}
                                src={task.user.profile_pic}
                              />
                            }
                            label={task.user.firstName}
                            color="primary"
                            style={{backgroundColor: '#ff2400', width: '80px'}}
                          />
                          <IconButton
                            color="secondary"
                            aria-label="add an alarm"
                            size="small"
                            onClick={this.delete.bind(this, task.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <Chip
                          label="Accept"
                          color="primary"
                          style={{backgroundColor: '#32CD32', width: '80px'}}
                          onClick={this.handleChooseTask.bind(this, task.id)}
                        />
                      )}
                    </ListItem>
                    <Divider />
                  </div>
                )
              }
            })
          ) : (
            <h3>There are not tasks</h3>
          )}
          <Divider />
        </List>

        <Box pt={2}>
          <Button color="primary">What to Do:</Button>
        </Box>

        <Divider />
        <List className="task-list">
          {tasks ? (
            tasks.map(task => {
              if (task.category === 'to do') {
                return (
                  <div key={task.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={task.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className="inline"
                              color="textPrimary"
                            />
                            {task.description}
                          </React.Fragment>
                        }
                      />

                      <Chip
                        label="Accept"
                        color="primary"
                        style={{backgroundColor: '#32CD32', width: '80px'}}
                        onClick={this.handleChooseTask.bind(this, task.id)}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                )
              }
            })
          ) : (
            <h3>There are not tasks</h3>
          )}
          <Divider />
        </List>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    email: state.user.email,
    errorsTask: state.task.errorsTask,
    tasks: state.task.tasks
  }
}

const mapDispatch = dispatch => {
  return {
    setTask: task => dispatch(setTask(task)),
    getAllTasksForAnEvent: eventId => dispatch(getAllTasksForAnEvent(eventId)),
    addTaskToUser: (updateTask, taskId) =>
      dispatch(addTaskToUser(updateTask, taskId))
  }
}

export default connect(mapState, mapDispatch)(TaskList)
