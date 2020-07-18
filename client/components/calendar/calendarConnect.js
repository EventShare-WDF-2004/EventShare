import React from 'react'
import {Button} from '@material-ui/core'

function CalendarConnect(props) {
  console.log('props', props)

  var gapi = window.gapi
  /*
    Update with your own Client Id and Api key
  */
  var CLIENT_ID =
    '808314770859-1c9t6unkt408pf6cak4u4g14jih20csi.apps.googleusercontent.com'
  var API_KEY = 'AIzaSyBHJ7fXAqcoHK3tGW4nrQfc7fP_o7_EOsE'
  var DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  ]
  var SCOPES = 'https://www.googleapis.com/auth/calendar.events'

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          // var event = {
          //   summary: `${props.event.title}`,
          //   location: `${props.event.address}`,
          //   description: `${props.event.description}`,
          //   start: {
          //     dateTime:  `${props.event.date.month}-${props.event.date.day}-20${props.event.date.year}`,
          //     timeZone:`${props.event.startTime}`
          //   },
          //   end: {
          //     dateTime: '2020-06-28T17:00:00-07:00',
          //     // timeZone: 'America/Los_Angeles'
          //   },
          //   // recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
          //   // attendees: [
          //   //   {email: 'lpage@example.com'},
          //   //   {email: 'sbrin@example.com'}
          //   // ],
          // let date = `${props.event.month}`+`${props.event.day}`+`20${props.event.year}`;

          // console.log("date", date)
          var event = {
            summary: `${props.event.title}`,
            location: `${props.event.address}`,
            description: `${props.event.description}`,
            // start: {
            //   date: date.toString(),
            //   time: `${props.event.startTime}`
            //   // timeZone: 'America/Los_Angeles'
            // },

            // start: {
            //   dateTime: '2020-06-28T09:00:00-07:00',
            //   timeZone: 'America/Los_Angeles'
            // },

            end: {
              dateTime: '2020-06-28T17:00:00-07:00',
              time: `${props.event.endTime}`
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
            // attendees: [
            //   {email: 'lpage@example.com'},
            //   {email: 'sbrin@example.com'}
            // ],
            reminders: {
              useDefault: false,
              overrides: [
                {method: 'email', minutes: 24 * 60},
                {method: 'popup', minutes: 10}
              ]
            }
          }
          console.log('event', event)
          var request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event
          })

          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })

          /*
            Uncomment the following block to get events
        */

          // get events
          // gapi.client.calendar.events.list({
          //   'calendarId': 'primary',
          //   'timeMin': (new Date()).toISOString(),
          //   'showDeleted': false,
          //   'singleEvents': true,
          //   'maxResults': 10,
          //   'orderBy': 'startTime'
          // }).then(response => {
          //   const events = response.result.items
          //   console.log('EVENTS: ', events)
          // })
        })
    })
  }

  return (
    <div className="CalendarConnect">
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        Add Event To Your Calendar
      </Button>
    </div>
  )
}

export default CalendarConnect
