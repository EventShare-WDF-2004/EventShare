const html = require('html-template-tag')

module.exports = (invitedName, userName, eventId) => html`
<div>
<h4>Hi, ${invitedName}!</h4>
<b>You have been invited to ${userName}'s event! </b>
<p>Please click the link below, sign in or sign up and let ${userName} know if you can make it.</p>
<p>You can also help ${userName} organize the event via our dashboard!</p>

<a href="https://event-share.herokuapp.com/events/${eventId}/guests"> Take Me To The Event! </a>

</div>
`
