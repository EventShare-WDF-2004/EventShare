import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchEvent, updateEvent} from '../store/event'
import {
  TextField,
  FormControl,
  Container,
  FormGroup,
  Button,
  Typography,
  Box,
  MenuItem,
  Select
} from '@material-ui/core'

export class EditEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'NY'
    }
  }
  componentDidMount() {
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const event = {}
    for (let i = 0; i < e.target.length; i++) {
      if (e.target.elements[i].value) {
        event[e.target.elements[i].getAttribute('name')] =
          e.target.elements[i].value
      }
    }
    this.props.editEvent(event, this.props.match.params.id)
  }

  render() {
    const event = this.props.currEvent || []
    let date
    if (event.date) {
      date = event.date.slice(0, 10)
    }
    return (
      <Container maxWidth="sm">
        <form
          onSubmit={this.handleSubmit}
          className="addTask-form"
          noValidate
          autoComplete="off"
        >
          <h3 align="center">Edit Your Event</h3>
          <FormGroup>
            <FormControl>
              <Typography>Title</Typography>
              <TextField
                size="small"
                type="title"
                name="title"
                variant="outlined"
                label={event.title}
              />
            </FormControl>
            <FormControl>
              <Typography>Description</Typography>

              <TextField
                id="standard-multiline-static"
                size="small"
                name="description"
                variant="outlined"
                label={event.description}
                multiline
                rowsMax={4}
              />
            </FormControl>
            <FormControl>
              <Typography>Date</Typography>

              <TextField
                size="small"
                name="date"
                type="date"
                variant="outlined"
                label={date}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
            <FormControl>
              <Typography>Time</Typography>

              <TextField
                size="small"
                name="time"
                type="time"
                variant="outlined"
                label={event.startTime}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300
                }}
              />
            </FormControl>
            <FormControl>
              <Typography>Address</Typography>

              <TextField
                size="small"
                name="address"
                type="address"
                variant="outlined"
                label={event.address}
              />
            </FormControl>
            <FormControl>
              <Typography>City</Typography>

              <TextField
                size="small"
                name="city"
                type="city"
                variant="outlined"
                label={event.city}
              />
            </FormControl>
            <Box pt={0} display="flex" className="form">
              <FormControl style={{maxWidth: 120}} size="small">
                <Typography>State</Typography>
                <Select
                  size="small"
                  name="State *"
                  value={this.state.state}
                  variant="outlined"
                  onChange={e => this.setState({state: e.target.value})}
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
                <Typography>Zipcode</Typography>

                <TextField
                  size="small"
                  name="zipcode"
                  type="number"
                  variant="outlined"
                  label={event.zipcode}
                />
              </FormControl>
            </Box>
            <FormControl />
          </FormGroup>
          <Button
            className="btn-theme"
            type="submit"
            variant="contained"
            color="secondary"
          >
            Edit Event
          </Button>
        </form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  currEvent: state.events.currEvent
})
const mapDispatchToProps = dispatch => ({
  getEvent: id => dispatch(fetchEvent(id)),
  editEvent: (event, id) => dispatch(updateEvent(event, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)
