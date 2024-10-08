import radio, { Separator } from './index.js';

const input = await radio({
    // default: 4,
    loop: false,
    message: 'Select a radio button',
    choices: [
        { name: '#1', value: 1 },
        { name: '#2', value: 2 },
        { name: '#3', value: 3 },
        { name: '#4', value: 4 },
        { name: '#5', value: 5 },
        new Separator(),
        { name: '#6', value: 6 },
        { name: '#7', value: 7 },
        { name: '#8', value: 8 },
        { name: '#9', value: 9 },
        { name: '#10', value: 10 },
        { name: '#11', value: 11 },
        { name: '#12', value: 12 },
    ],
    validate: (items: ReadonlyArray<unknown>) => {
        if (items.length !== 1) {
            return 'Please select only one choice';
        }
        return true;
    },
    // required: true
});

console.log('input', input)
