import Flatpickr from 'flatpickr';

const dateFromPicker = document.querySelector('.date-from');
const flatpicker = new Flatpickr(dateFromPicker);

const submitButton = document.querySelector('.create-meeting-button');
submitButton.addEventListener('click', () => {
   console.log(flatpicker.formatDate());
});