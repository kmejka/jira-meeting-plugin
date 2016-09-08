import Flatpickr from 'flatpickr';
import {get} from './client/meetings';

const datePickerFrom = new Flatpickr(document.querySelector('.date-from'));
const datePickerTo = new Flatpickr(document.querySelector('.date-to'));

document
    .querySelector('.create-meeting-button')
    .addEventListener('click', () => {
        get();
        console.log(datePickerFrom);
        console.log(datePickerTo);
    });