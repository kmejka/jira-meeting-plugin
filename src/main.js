import Flatpickr from 'flatpickr';
import {createMeetingRequest} from './client/meetings';
import {getIssue, getIssueWatchers} from './client/jira';

const options = {
    minDate: 'today',
    enableTime: true,
    time_24hr: true,
    utc: true
};

const datePickerFrom = new Flatpickr(document.querySelector('.date-from'), options);
const datePickerTo = new Flatpickr(document.querySelector('.date-to'), options);

document
    .querySelector('.create-meeting-button')
    .addEventListener('click', () => {
        Promise.all([getIssue(), getIssueWatchers()]).then((params) => {
            const issue = params[0];
            const watchers = params[1];

            createMeetingRequest({
                summary: `[${issue.key}] ${issue.fields.summary}`,
                description: issue.fields.description,
                attendees: watchers.watchers.map((watcher) => ({email: watcher.emailAddress})),
                from: new Date(datePickerFrom.input.value),
                to: new Date(datePickerTo.input.value)
            }).then((response) => {
                console.log('Event created', response.result);
                console.log('Event created', response.result.hangoutLink);
            });
        });
    });
