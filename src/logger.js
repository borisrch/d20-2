import dayjs from 'dayjs';

const format = 'HH:mm:ss'
const infoColour = '';
const mobColour = '#FF5722';
const playerColour = '#2196F3';

export default class Logger {
  static mob(input) {
    const timestamp = dayjs().format(format);
    console.log(`%c${timestamp} ${input}`, `color: ${mobColour}`);
  }
  static player(input) {
    const timestamp = dayjs().format(format);
    console.log(`%c${timestamp} ${input}`, `color: ${playerColour}`);
  }
}