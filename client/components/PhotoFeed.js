import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMe} from '../store/user'
import {fetchUserEvents, deleteEvent} from '../store/event'
import DropMenuList from './AdditionalForms/DropDownMenu'

import {getAllNotifications} from '../store/notifications'
import {formatDate} from './EventDetails'
/**
 * COMPONENT
 */
import {
  Container,
  Button,
  ButtonGroup,
  Chip,
  List,
  ListItem,
  Divider,
  ListItemText,
  Box,
  Avatar,
  Typography
} from '@material-ui/core'
import {useState} from 'react'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

export const PhotoFeed = props => {
  // effect functions can't be async, so declare the
  // async function inside the effect, then call it
  const [setValue, handleValue] = useState(true)
  /*
  useEffect every time a  value change inside the array the useEffect will excute again
  */

  return (
    <div>
      <div className="profile">
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Typography>Photo Feed!</Typography>
        </ButtonGroup>
      </div>
      <div>
        <Container maxWidth="sm" />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(PhotoFeed)
