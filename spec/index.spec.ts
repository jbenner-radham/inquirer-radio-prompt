import { describe, it, expect } from 'vitest';
import { render } from '@inquirer/testing';
import { ValidationError } from '@inquirer/core';
import radio, { Separator } from '../src/index.js';

const numberedChoices = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
    { value: 11 },
    { value: 12 }
];

describe('radio prompt', () => {
    it('uses arrow keys to select an option', async () => {
        const { answer, events, getScreen } = await render(radio, {
            message: 'Select a number',
            choices: numberedChoices,
        });

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select a number (Press <space> to select, and <enter> to proceed)
          ❯◯ 1
           ◯ 2
           ◯ 3
           ◯ 4
           ◯ 5
           ◯ 6
           ◯ 7
          (Use arrow keys to reveal more choices)"
        `);

        events.keypress('down');
        events.keypress('space');

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select a number
           ◯ 1
          ❯◉ 2
           ◯ 3
           ◯ 4
           ◯ 5
           ◯ 6
           ◯ 7"
        `);

        events.keypress('enter');

        await expect(answer).resolves.toEqual(2);

        expect(getScreen()).toMatchInlineSnapshot(`"✔ Select a number 2"`);
    });

    it('works with string choices', async () => {
        const { answer, events, getScreen } = await render(radio, {
            message: 'Select an option',
            choices: ['Option A', 'Option B', 'Option C'],
        });

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select an option (Press <space> to select, and <enter> to proceed)
          ❯◯ Option A
           ◯ Option B
           ◯ Option C"
        `);

        events.keypress('down');
        events.keypress('space');

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select an option
           ◯ Option A
          ❯◉ Option B
           ◯ Option C"
        `);

        events.keypress('enter');

        await expect(answer).resolves.toEqual('Option B');

        expect(getScreen()).toMatchInlineSnapshot(`"✔ Select an option Option B"`);
    });

    it('does not scroll up beyond first item when not looping', async () => {
        const { answer, events, getScreen } = await render(radio, {
            message: 'Select a number',
            choices: numberedChoices,
            loop: false,
        });

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select a number (Press <space> to select, and <enter> to proceed)
          ❯◯ 1
           ◯ 2
           ◯ 3
           ◯ 4
           ◯ 5
           ◯ 6
           ◯ 7
          (Use arrow keys to reveal more choices)"
        `);

        events.keypress('up');
        events.keypress('space');

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select a number
          ❯◉ 1
           ◯ 2
           ◯ 3
           ◯ 4
           ◯ 5
           ◯ 6
           ◯ 7"
        `);

        events.keypress('enter');

        await expect(answer).resolves.toEqual(1);

        expect(getScreen()).toMatchInlineSnapshot(`"✔ Select a number 1"`);
    });

    it('does not scroll up beyond first selectable item when not looping', async () => {
        const { answer, events, getScreen } = await render(radio, {
            message: 'Select a number',
            choices: [new Separator(), ...numberedChoices],
            loop: false,
        });

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select a number (Press <space> to select, and <enter> to proceed)
           ──────────────
          ❯◯ 1
           ◯ 2
           ◯ 3
           ◯ 4
           ◯ 5
           ◯ 6
          (Use arrow keys to reveal more choices)"
        `);

        events.keypress('up');
        events.keypress('space');

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select a number
           ──────────────
          ❯◉ 1
           ◯ 2
           ◯ 3
           ◯ 4
           ◯ 5
           ◯ 6"
        `);

        events.keypress('enter');

        await expect(answer).resolves.toEqual(1);

        expect(getScreen()).toMatchInlineSnapshot(`"✔ Select a number 1"`);
    });


    it('does not scroll down beyond last option when not looping', async () => {
        const { answer, events, getScreen } = await render(radio, {
            message: 'Select a number',
            choices: numberedChoices,
            loop: false,
        });

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select a number (Press <space> to select, and <enter> to proceed)
          ❯◯ 1
           ◯ 2
           ◯ 3
           ◯ 4
           ◯ 5
           ◯ 6
           ◯ 7
          (Use arrow keys to reveal more choices)"
        `);

        numberedChoices.forEach(() => events.keypress('down'));
        events.keypress('down');
        events.keypress('space');

        expect(getScreen()).toMatchInlineSnapshot(`
          "? Select a number
           ◯ 6
           ◯ 7
           ◯ 8
           ◯ 9
           ◯ 10
           ◯ 11
          ❯◉ 12"
        `);

        events.keypress('enter');

        await expect(answer).resolves.toEqual(12);

        expect(getScreen()).toMatchInlineSnapshot(`"✔ Select a number 12"`);
    });
});
