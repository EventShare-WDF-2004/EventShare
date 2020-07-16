const html = require('html-template-tag')

module.exports = (invitedName, userName, eventId, pollTitle) => html`
<div>
<h4>Hi,${invitedName}!</h4>
<b>${userName} has created a new poll for an upcoming event! </b>

<p>${userName} wants to get your input on <i> ${pollTitle} </i>, please click the link below to vote on the poll.</p>

<a href="https://event-share.herokuapp.com/events/${eventId}/polls"> Let's vote!</a>

<p>You can also help ${userName} organize the event via our dashboard!</p>


</div>
`
