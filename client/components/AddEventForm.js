import React from 'react'
import {connect} from 'react-redux'
import {createEvent} from '../store/event'

import swal from 'sweetalert'
import {
  TextField,
  FormControl,
  Container,
  FormGroup,
  Button,
  Select,
  MenuItem,
  Box
} from '@material-ui/core'

const isEmpty = e => {
  const event = {}
  for (let i = 0; i < e.target.length; i++) {
    if (e.target.elements[i].value) {
      event[e.target.elements[i].getAttribute('name')] =
        e.target.elements[i].value
    }
  }
  return event
}

export class EventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'NY'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const event = isEmpty(e)
    console.log('EVENT', event)
    if (Object.keys(event).length < 9) {
      swal('', 'Please fill out all input fields', 'error') // to be changed
    } else {
      this.props.createEvent(event)
    }
  }

  render() {
    return (
      <Container maxWidth="sm">
        <h3 align="center">Create An Event!</h3>

        <form
          onSubmit={this.handleSubmit}
          className="addTask-form"
          noValidate
          autoComplete="off"
        >
          <FormGroup>
            <TextField
              size="small"
              name="title"
              label="Title *"
              variant="outlined"
            />
            <FormControl>
              <TextField
                size="small"
                name="description"
                label="Description *"
                variant="outlined"
                multiline
                rowsMax={4}
              />
            </FormControl>
            <FormControl>
              <TextField
                size="small"
                name="date"
                label="Date *"
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                size="small"
                name="time"
                label="Time *"
                type="time"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                size="small"
                name="address"
                label="Street Address *"
                type="address"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <TextField
                size="small"
                name="city"
                label="City *"
                type="city"
                variant="outlined"
              />
            </FormControl>
            <Box pt={0} display="flex" className="form">
              <FormControl style={{maxWidth: 120}} size="small">
                <Select
                  size="small"
                  name="state"
                  value={this.state.state}
                  variant="outlined"
                  onChange={event => this.setState({state: event.target.value})}
                >
                  <MenuItem value="AK">AK</MenuItem>
                  <MenuItem value="AL">AL</MenuItem>
                  <MenuItem value="AR">AR</MenuItem>
                  <MenuItem value="AZ">AZ</MenuItem>
                  <MenuItem value="CA">CA</MenuItem>
                  <MenuItem value="CO">CO</MenuItem>
                  <MenuItem value="CT">CT</MenuItem>
                  <MenuItem value="DE">DE</MenuItem>
                  <MenuItem value="FL">FL</MenuItem>
                  <MenuItem value="GA">GA</MenuItem>
                  <MenuItem value="HI">HI</MenuItem>
                  <MenuItem value="IA">IA</MenuItem>
                  <MenuItem value="ID">ID</MenuItem>
                  <MenuItem value="IL">IL</MenuItem>
                  <MenuItem value="IN">IN</MenuItem>
                  <MenuItem value="KS">KS</MenuItem>
                  <MenuItem value="KY">KY</MenuItem>
                  <MenuItem value="LA">LA</MenuItem>
                  <MenuItem value="MA">MA</MenuItem>
                  <MenuItem value="MD">MD</MenuItem>
                  <MenuItem value="ME">ME</MenuItem>
                  <MenuItem value="MI">MI</MenuItem>
                  <MenuItem value="MN">MN</MenuItem>
                  <MenuItem value="MO">MO</MenuItem>
                  <MenuItem value="MS">MS</MenuItem>
                  <MenuItem value="MT">MT</MenuItem>
                  <MenuItem value="NC">NC</MenuItem>
                  <MenuItem value="ND">ND</MenuItem>
                  <MenuItem value="NE">NE</MenuItem>
                  <MenuItem value="NH">NH</MenuItem>
                  <MenuItem value="NJ">NJ</MenuItem>
                  <MenuItem value="NM">NM</MenuItem>
                  <MenuItem value="NV">NV</MenuItem>
                  <MenuItem value="NY">NY</MenuItem>
                  <MenuItem value="OH">OH</MenuItem>
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="OR">OR</MenuItem>
                  <MenuItem value="PA">PA</MenuItem>
                  <MenuItem value="RI">RI</MenuItem>
                  <MenuItem value="SC">SC</MenuItem>
                  <MenuItem value="SD">SD</MenuItem>
                  <MenuItem value="TN">TN</MenuItem>
                  <MenuItem value="TX">TX</MenuItem>
                  <MenuItem value="UT">UT</MenuItem>
                  <MenuItem value="VA">VA</MenuItem>
                  <MenuItem value="VT">VT</MenuItem>
                  <MenuItem value="WA">WA</MenuItem>
                  <MenuItem value="WI">WI</MenuItem>
                  <MenuItem value="WV">WV</MenuItem>
                  <MenuItem value="WY">WY</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={{maxWidth: 125}}>
                <TextField
                  size="small"
                  name="zipcode"
                  label="Zipcode *"
                  type="number"
                  variant="outlined"
                />
              </FormControl>
            </Box>
            <FormControl />
          </FormGroup>
          <Button
            className="btn-theme"
            type="submit"
            variant="contained"
            style={{
              backgroundColor: '#9370db',
              color: 'white'
            }}
          >
            Create Event
          </Button>
        </form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createEvent: event => dispatch(createEvent(event))
})

export default connect(null, mapDispatchToProps)(EventForm)
