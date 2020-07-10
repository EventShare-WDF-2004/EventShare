import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'

class Login extends Component {
  componentDidMount() {
    if (this.props.match.params.id && !window.localStorage.getItem('eventId')) {
      window.localStorage.setItem(
        'eventId',
        JSON.stringify(this.props.match.params.id)
      )
    }
  }

  render() {
    const {displayName, handleSubmit, error} = this.props
    return (
      <div className="loginpage-form">
        <div className="logo-place-holder-login-form">logo</div>
        {/* <Login /> */}
        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleSubmit(e, this.props.match.params.id)
            }}
            name="login"
          >
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>

              <input name="email" type="text" />
            </div>
            <br />
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>

              <input name="password" type="password" />
            </div>
            <br />
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <a href="/auth/google">{displayName} with Google</a>
          <br />
          <h1>Need an account</h1>
          <br />
          <div>
            {/* <button type="submit">Sign Up</button> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign up!
              </Link>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, id) {
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const eventId = id
      dispatch(auth(email, password, null, null, formName, eventId))
    }
  }
}
export default connect(mapLogin, mapDispatch)(Login)

Login.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
