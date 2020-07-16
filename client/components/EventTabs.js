import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link as RouterLink} from 'react-router-dom'
import {fetchEvent, deleteEvent} from '../store/event'
import DropMenuList from './AdditionalForms/DropDownMenu'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'
import {Box} from '@material-ui/core/'

class EventTabs extends React.Component {
  state = {
    value: '1'
  }

  handleChange(event, newValue) {
    this.setState({value: newValue})
  }

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id)
  }
  render() {
    const eventId = this.props.match.params.id
    const currEvent = this.props.currEvent || []
    return (
      <div>
        <div display="flex">
          <Box display="flex" justifyContent="center">
            <Typography
              align="center"
              component="h1"
              variant="h5"
              color="secondary"
              className="eventTitle"
            >
              {currEvent.title}🎉
            </Typography>
            <Box className="eventTitle">
              <DropMenuList
                eventId={currEvent.id}
                eventLink={`/events/${eventId}/edit`}
                delete={this.props.deleteEvent}
              />
            </Box>
          </Box>
        </div>
        <TabContext value={this.state.value}>
          <AppBar position="static" color="secondary">
            <TabList
              onChange={this.handleChange.bind(this)}
              aria-label="simple tabs example"
            >
              <Tab
                label="Details"
                value="1"
                component={RouterLink}
                to={`/events/${eventId}/details`}
              />
              <Tab
                label="Guests"
                value="2"
                component={RouterLink}
                to={`/events/${eventId}/guests`}
              />
              <Tab
                label="Tasks"
                value="3"
                component={RouterLink}
                to={`/events/${eventId}/tasks`}
              />
              <Tab
                label="Polls"
                value="4"
                component={RouterLink}
                to={`/events/${eventId}/polls/1`}
              />
              <Tab
                label="Photos"
                value="5"
                component={RouterLink}
                to={`/events/${eventId}/photos`}
              />
            </TabList>
          </AppBar>
        </TabContext>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    currEvent: state.events.currEvent,
    isOrganizer: state.events.organizer //not fetching all the time
  }
}

const mapDispatch = dispatch => {
  return {
    getEvent: id => dispatch(fetchEvent(id)),
    deleteEvent: eventId => dispatch(deleteEvent(eventId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(EventTabs))
