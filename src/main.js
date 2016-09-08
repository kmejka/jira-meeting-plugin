import Flatpickr from 'flatpickr';
import {create} from './client/meetings';
import {getIssue} from './client/watchers';
import {getIssueWatchers} from './client/watchers';

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

            create({
                summary: `[${issue.key}] ${issue.fields.summary}`,
                description: issue.fields.description,
                attendees: watchers.watchers.map((watcher) => ({email: watcher.emailAddress})),
                from: new Date(datePickerFrom.input.value),
                to: new Date(datePickerTo.input.value)
            })
        });
    });
