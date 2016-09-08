export function get() {
    console.log('get meetings');

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
        console.log('!!!!!!!!!!!!!! Upcoming events:');

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