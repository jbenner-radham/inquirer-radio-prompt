import radio from 'inquirer-radio-prompt';

const answer = await radio({
  message: 'Select a package manager',
  choices: [
    { name: 'npm', value: 'npm' },
    { name: 'pnpm', value: 'pnpm' },
    { name: 'Yarn', value: 'yarn' }
  ]
});

console.log({ answer });
