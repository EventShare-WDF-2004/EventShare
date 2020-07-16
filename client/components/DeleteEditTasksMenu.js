import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditTaskForm from './EditTaskForm'
import {Link} from 'react-router-dom'

export default function DeleteEditTasksMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
        <MenuItem onClick={() => props.deleteTask(props.taskId, props.eventId)}>
          Delete
        </MenuItem>
        <Link
          to={`/events/${props.eventId}/tasks/EditTaskForm/${props.taskId}`}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
        </Link>
      </Menu>
    </div>
  )
}
