import Confetti from "./confetti";
import { JSDOM } from "jsdom"

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: any;
            navigator: Navigator;
        }
    }
}

const ID = 'test-confetti-container';
const createDiv = () => {
    const div = document.createElement('DIV');
    div.setAttribute('id', ID);
    document.body.appendChild(div);
};
const removeDiv = () => {
    document.getElementById(ID)?.remove()
};

describe('sprites should not animate outside of the canvas in Math.random() edge cases', () => {
    const tester = (width: number, height: number) => {
        const confetti = new Confetti(ID, {width, height});
        confetti.initSprites();
        while (confetti.sprites.length > 0) {
            confetti.sprites.forEach(_ => {
                expect(_.x).toBeGreaterThanOrEqual(0);
                expect(_.x).toBeLessThanOrEqual(width);
                expect(_.y).toBeGreaterThanOrEqual(0);
                expect(_.y).toBeLessThanOrEqual(height);
            });
            confetti.update();
        }
    };

    const dimensions = [
        [300, 300],
        [500, 500],
    ];

    const spiedMathRandom = jest.spyOn(global.Math, 'random');

    beforeAll(() => {
        const dom = new JSDOM();
        global.document = dom.window.document;
        global.window = dom.window;
    });

    beforeEach(() => {
        createDiv();
    });

    afterEach(() => {
        removeDiv();
        spiedMathRandom.mockRestore();
    });

    describe.each(dimensions)('', (w, h) => {
        test('Math.random returns 1', () => {
            spiedMathRandom.mockReturnValue(1);
            tester(w, h);
        });

        test('Math.random returns 0', () => {
            spiedMathRandom.mockReturnValue(0);
            tester(w, h);
        })
    });
});