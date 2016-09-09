import Flatpickr from 'flatpickr';
import {createMeeting} from './client/meetings';
import {getIssue, getIssueWatchers, saveIssueMeetingData} from './client/jira';

const options = {
    minDate: 'today',
    enableTime: true,
    time_24hr: true,
    utc: true
};

const datePickerFrom = new Flatpickr(document.querySelector('.date-from'), options);
const datePickerTo = new Flatpickr(document.querySelector('.date-to'), options);

AP.require(['dialog'], (dialog) => {
    console.log('inside dialog');
    dialog.getButton('submit').bind(() => {
        Promise.all([getIssue(), getIssueWatchers()]).then((params) => {
            const issue = params[0];
            const watchers = params[1];
            const from = new Date(datePickerFrom.input.value);

            createMeeting({
                summary: `[${issue.key}] ${issue.fields.summary}`,
                description: issue.fields.description,
                attendees: watchers.watchers.map((watcher) => ({email: watcher.emailAddress})),
                from: from,
                to: new Date(datePickerTo.input.value),
                timeZone: 'Europe/Warsaw'
            }).then((response) => {
                console.log('Event created', response.result);
                console.log('Event created', response.result.hangoutLink);
                saveIssueMeetingData(from, response.result.hangoutLink).then((response) => {console.log(response)});
            }).then(() => {
                dialog.close();
            });
        });
    });
});
