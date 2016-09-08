import Flatpickr from 'flatpickr';
import {create, get} from './client/meetings';

const options = {
    minDate: 'today',
    enableTime: true,
    time_24hr: true,
    utc: true
};
window.datePickerFrom = new Flatpickr(document.querySelector('.date-from'), options);
window.datePickerTo = new Flatpickr(document.querySelector('.date-to'), options);

document
    .querySelector('.create-meeting-button')
    .addEventListener('click', () => {
        const from = new Date(datePickerFrom.input.value);
        const to = new Date(datePickerTo.input.value);
        create({
            from,
            to
        });
    });

document
    .querySelector('.get-meetings-button')
    .addEventListener('click', get);