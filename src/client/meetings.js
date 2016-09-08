export function get() {
    console.log('Getting meetings');

    const request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    });

    request.execute(function(resp) {
        var events = resp.items;

        if (events.length > 0) {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                console.log(event.summary + ' (' + when + ')');
            }
        } else {
            console.log('No upcoming events found.');
        }

    });
}

export function createMeetingRequest(options) {
    console.log('Create meetings');

    const event = {
        'summary': options.summary,
        'description': options.description,
        'start': {
            'dateTime': options.from,
            'timeZone': 'Europe/Warsaw'
        },
        'end': {
            'dateTime': options.to,
            'timeZone': 'Europe/Warsaw'
        },
        'attendees': options.attendees,
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'popup', 'minutes': 10}
            ]
        }
    };

    return gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });
}