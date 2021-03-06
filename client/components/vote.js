import React from 'react'
import {Link} from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Container
} from '@material-ui/core'
import {getPoll, getEventPolls, createAnswer} from '../store/poll'
import {connect} from 'react-redux'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Vote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userVoted: false,
      selectedOption: '',
      userId: null,
      pollId: null
    }
  }
  componentDidMount() {
    this.props.getEventPolls(this.props.match.params.id)
  }

  vote(optionId, pollId, userId) {
    this.setState({
      selectedOption: optionId,
      userId: userId,
      pollId: pollId
    })
  }
  onSubmit() {
    if (this.state.selectedOption) {
      const voteObj = {
        optionId: this.state.selectedOption,
        userId: this.state.userId,
        pollId: this.state.pollId,
        eventId: this.props.events.currEvent.id
      }
      this.props.createAnswer(voteObj)
      this.setState({
        userVoted: true,
        selectedOption: ''
      })
    } else {
      toast.warning('🚀  Please choose an option!')
    }
  }
  render() {
    const {user, polls, events} = this.props

    return (
      <Container maxWidth="sm">
        <Box pt={2} display="flex" className="space-between">
          <Button color="primary">Vote Now!</Button>

          <Link to={`/events/${this.props.events.currEvent.id}/polls/create`}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                className="btn-create"
                color="primary"
                variant="contained"
                size="small"
              >
                Create a Poll
              </Button>
            </Box>
          </Link>
        </Box>
        <ToastContainer />
        <h1 className="heading" />

        {polls.map(poll => {
          return (
            <div key={poll.pollDetails.id}>
              <Card>
                <h3 align="center">{poll.pollDetails.title}</h3>
              </Card>

              {poll.pollDetails.options
                ? poll.pollDetails.options.map(option => {
                    return (
                      <Card
                        className={
                          option.id === this.state.selectedOption
                            ? 'btn-accept'
                            : 'white'
                        }
                        key={option.id}
                      >
                        <CardContent>
                          <Grid container>
                            <Grid item xs={6}>
                              {option.title}
                            </Grid>
                            <Grid item xs={6} style={{textAlign: 'right'}}>
                              {!poll.usersAlreadyVoted.includes(user.id) ? (
                                <Button
                                  className="btn-taken"
                                  color="secondary"
                                  variant="contained"
                                  size="small"
                                  onClick={this.vote.bind(
                                    this,
                                    option.id,
                                    poll.pollDetails.id,
                                    user.id
                                  )}
                                  endIcon={<CheckCircleOutlinedIcon />}
                                >
                                  Pick me
                                </Button>
                              ) : (
                                <div>
                                  <LinearProgress
                                    variant="determinate"
                                    value={Math.round(
                                      option.answers.length /
                                        poll.totalVotes *
                                        100
                                    )}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >{`${Math.round(
                                    option.answers.length /
                                      poll.totalVotes *
                                      100
                                  )}%`}</Typography>
                                </div>
                              )}
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    )
                  })
                : null}
              {poll.usersAlreadyVoted.includes(user.id) ? null : (
                <Card style={{height: '3.4rem'}}>
                  <Box justifyContent="center" display="flex" mt={1}>
                    <Button
                      className="btn-submit"
                      color="secondary"
                      variant="contained"
                      size="medium"
                      m="auto"
                      onClick={this.onSubmit.bind(this)}
                    >
                      Submit
                    </Button>
                  </Box>
                </Card>
              )}
              <br />
              <br />
              <br />
              <br />
            </div>
          )
        })}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  currPoll: state.poll.poll,
  user: state.user,
  options: state.poll.poll.options,
  polls: state.poll.polls,
  events: state.events
})
const mapDispatchToProps = dispatch => ({
  getPoll: id => dispatch(getPoll(id)),
  getEventPolls: id => dispatch(getEventPolls(id)),
  createAnswer: voteObj => dispatch(createAnswer(voteObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
