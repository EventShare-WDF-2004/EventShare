import React from 'react'
import {connect} from 'react-redux'
import {createPoll} from '../store/poll'

import {
  TextField,
  FormControl,
  Container,
  FormGroup,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText
} from '@material-ui/core'

export class PollForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      options: [],
      title: '',
      currentOption: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddOption(event) {
    event.preventDefault()
    const option = this.state.currentOption

    this.setState({
      options: [...this.state.options, option],
      currentOption: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const newPoll = {
      title: this.state.title,
      options: this.state.options,
      eventId: this.props.match.params.id
    }
    this.props.createPoll(newPoll)
  }

  render() {
    return (
      // <div>
      //    <h1>Create A Poll For Your Event</h1>

      //   <label>
      //     <p>Poll Question</p>
      //     <input
      //       type="text"
      //       name="title"
      //       placeholder="question"
      //       value={this.state.value}
      //       onChange={this.handleChange}
      //     />
      //     <p>Write Your Options</p>

      //     <input
      //       type="text"
      //       name="currentOption"
      //       placeholder="option"
      //       value={this.state.value}
      //       onChange={this.handleChange}
      //     />
      //   </label>
      //   <div>
      //     <button type="button" onClick={this.handleAddOption}>
      //       Add Option
      //     </button>
      //   </div>
      //   <h4>Your Options</h4>
      //   <div>
      //     {this.state.options.map(option => {
      //       return <p>{option}</p>
      //     })}

      //     <form onSubmit={this.handleSubmit}>
      //       <button type="submit">Create Poll</button>
      //     </form>
      //   </div>
      //   </div>
      //    )
      //   }
      // }
      <Container maxWidth="sm">
        <form
          onSubmit={this.handleSubmit}
          className="addTask-form"
          noValidate
          autoComplete="off"
        >
          <h1 align="center">Create A Poll For Your Event</h1>
          <FormGroup>
            <InputLabel id="demo-simple-select-filled-label">
              Poll Questions
            </InputLabel>
            <FormControl>
              <TextField
                type="text"
                name="title"
                label="question"
                variant="outlined"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </FormControl>
            <InputLabel id="demo-simple-select-filled-label">
              Write Your Options
            </InputLabel>
            <FormControl>
              <TextField
                type="text"
                name="currentOption"
                label="option"
                variant="outlined"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </FormControl>
          </FormGroup>
          <Button
            className="btn-theme"
            type="button"
            variant="contained"
            color="secondary"
            onClick={this.handleAddOption}
          >
            Add Options
          </Button>
          <div className="poll-form-yourOption">
            <h4>Your Options</h4>
            {this.state.options.map((option, i) => {
              return <p key={i}>{option}</p>
            })}
          </div>
          <Button
            className="btn-theme"
            type="submit"
            variant="contained"
            color="secondary"
            onClick={this.handleSubmit}
          >
            Create Poll
          </Button>
        </form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createPoll: event => dispatch(createPoll(event))
})

export default connect(null, mapDispatchToProps)(PollForm)
