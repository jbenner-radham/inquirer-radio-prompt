import radio, { Separator } from './index.js';

const input = await radio({
    default: 4,
    message: 'Select a radio button',
    choices: [
        { name: '#1', value: 1 },
        { name: '#2', value: 2 },
        { name: '#3', value: 3 },
        { name: '#4', value: 4 },
        new Separator(),
        { name: '#5', value: 5, disabled: true },
        { name: '#6', value: 6 },
        { name: '#7', value: 7 },
        { name: '#8', value: 8 },
    ],
    required: true
});

console.log('input', input)