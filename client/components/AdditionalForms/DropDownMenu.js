import React from 'react'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import swal from 'sweetalert'
import {withRouter, Link as RouterLink} from 'react-router-dom'

function MenuListComposition(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    var shouldDelete = confirm('Do you really want to delete this event?')

    if (shouldDelete) {
      props.delete(props.eventId)
    }
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <RouterLink to={props.eventLink}>
          <MenuItem onClick={handleClose} style={{color: 'black'}}>
            Edit
          </MenuItem>
        </RouterLink>
      </Menu>
    </div>
  )
}

export default withRouter(MenuListComposition)
