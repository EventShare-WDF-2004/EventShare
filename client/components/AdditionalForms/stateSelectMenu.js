import React from 'react'
import {
  TextField,
  FormControl,
  FormGroup,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core'

export default class MenuListComposition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'NY'
    }
  }

  render() {
    return (
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-filled-label">
          {/* This state is bigger than The input, Fix later */}
          State
        </InputLabel>
        <Select style={{width: '50px'}} name="state" value={this.state.state}>
          <MenuItem value="NY" onClick={() => this.setState({state: 'NY'})}>
            NY
          </MenuItem>
          <MenuItem value="NJ" onClick={() => this.setState({state: 'NJ'})}>
            NJ
          </MenuItem>
          <MenuItem value="PA" onClick={() => this.setState({state: 'PA'})}>
            PA
          </MenuItem>
          <MenuItem value="FL" onClick={() => this.setState({state: 'FL'})}>
            FL
          </MenuItem>
          <MenuItem value="NY" onClick={() => this.setState({state: 'NY'})}>
            NY
          </MenuItem>
          <MenuItem value="NJ" onClick={() => this.setState({state: 'NJ'})}>
            NJ
          </MenuItem>
          <MenuItem value="PA" onClick={() => this.setState({state: 'PA'})}>
            PA
          </MenuItem>
          <MenuItem value="FL" onClick={() => this.setState({state: 'FL'})}>
            FL
          </MenuItem>
          <MenuItem value="NY" onClick={() => this.setState({state: 'NY'})}>
            NY
          </MenuItem>
          <MenuItem value="NJ" onClick={() => this.setState({state: 'NJ'})}>
            NJ
          </MenuItem>
          <MenuItem value="PA" onClick={() => this.setState({state: 'PA'})}>
            PA
          </MenuItem>
          <MenuItem value="FL" onClick={() => this.setState({state: 'FL'})}>
            FL
          </MenuItem>
        </Select>
      </FormControl>
    )
  }
}
