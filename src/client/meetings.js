export function createMeeting(options) {
    const {summary, description, from, to, attendees, timeZone} = options;

    const event = {
        summary,
        description,
        attendees,
        start: {
            timeZone,
            dateTime: from
        },
        end: {
            timeZone,
            dateTime: to
        },
        reminders: {
            useDefault: false,
            overrides: [{
                method: 'popup',
                minutes: 10
            }]
        }
    };

    return gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
    });
}