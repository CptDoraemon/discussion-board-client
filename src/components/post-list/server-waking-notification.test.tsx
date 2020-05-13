import React from "react";
import { renderHook, act as hookAct } from '@testing-library/react-hooks';
import ServerWakingNotification, { useServerWaking } from "./server-waking-notification";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

const DELAY = 3000;
const FADE_ANIMATION_DURATION = 500;

describe('hook tests', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should have falsy states on init', () => {
        const { result } = renderHook(() => useServerWaking());
        expect(result.current.active).toBe(false);
        expect(result.current.isMount).toBe(false)
    });

    test('should set states to true automatically after delay', () => {
        const { result } = renderHook(() => useServerWaking());

        hookAct(() => {
            jest.runAllTimers();
        });
        expect(result.current.active).toBe(true);
        expect(result.current.isMount).toBe(true)
    });

    test('should not update states if is loaded during timeout', () => {
        const { result } = renderHook(() => useServerWaking());
        hookAct(() => {
            jest.advanceTimersByTime(DELAY * 0.5);
            result.current.handleLoaded();
            jest.advanceTimersByTime(DELAY);
        });

        expect(result.current.active).toBe(false);
        expect(result.current.isMount).toBe(false);
    });

    test('should be able to set states to false after delay', () => {
        const { result } = renderHook(() => useServerWaking());

        hookAct(() => {
            jest.runAllTimers();
            result.current.turnToInactive();
            result.current.unMount();
        });
        expect(result.current.active).toBe(false);
        expect(result.current.isMount).toBe(false);
    });

    test('should avoid unnecessary state update', () => {
        const mockState = false;
        const mockStateSetter = jest.fn();
        const spiedUseState = jest.spyOn(React, "useState");
        spiedUseState.mockImplementation(() => [mockState, mockStateSetter]);
        const { result } = renderHook(() => useServerWaking());

        hookAct(() => {
            result.current.turnToInactive();
            result.current.unMount();
        });

        expect(mockStateSetter).toBeCalledTimes(0);
        spiedUseState.mockReset();
    })
});

describe('component tests', () => {
    let container: null | HTMLDivElement = null;

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        if (!container) return;
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    describe('loaded from the very beginning', () => {
        test('should return null all the time', () => {
            act(() => {
                render(<ServerWakingNotification isLoaded={true}/>, container)
            });
            expect(container?.innerHTML).toBe("");

            act(() => {
                jest.runAllTimers()
            });
            expect(container?.innerHTML).toBe("");
        });
    });

    describe('loaded during DELAY', () => {
        test('should return null all the time', () => {
            act(() => {
                render(<ServerWakingNotification isLoaded={false}/>, container)
            });
            expect(container?.innerHTML).toBe("");

            act(() => {
                jest.advanceTimersByTime(DELAY * 0.5);
                render(<ServerWakingNotification isLoaded={true}/>, container)
            });
            expect(container?.innerHTML).toBe("");

            act(() => {
                jest.advanceTimersByTime(DELAY * 1.5);
            });
            expect(container?.innerHTML).toBe("");
        });
    });

    describe('loaded after DELAY', () => {
        test('should return null before DELAY, return actual content after DELAY', () => {
            act(() => {
                render(<ServerWakingNotification isLoaded={false}/>, container)
            });
            expect(container?.innerHTML).toBe("");

            act(() => {
                jest.advanceTimersByTime(DELAY * 1.1);
            });
            expect(container?.innerHTML).not.toBe("");
        });

        test('should still return content right after loaded, should return null after fade out animation ended', () => {
            act(() => {
                render(<ServerWakingNotification isLoaded={false}/>, container);
                jest.runAllTimers();
                render(<ServerWakingNotification isLoaded={true}/>, container);
            });
            expect(container?.innerHTML).not.toBe("");

            act(() => {
                jest.advanceTimersByTime(FADE_ANIMATION_DURATION * 2);
            });
            expect(container?.innerHTML).toBe("");
        });

        test('should make component return null if close button is clicked while component is returning actual content', () => {
            // DELAY past
            act(() => {
                render(<ServerWakingNotification isLoaded={false}/>, container);
                jest.advanceTimersByTime(DELAY * 1.1);
            });
            expect(container?.innerHTML).not.toBe("");

            // clicking closeButton
            act(() => {
                document.getElementsByName("close")[0].click();
                // fade out is animating after button is clicked
                // component return null after animation is done
                jest.advanceTimersByTime(FADE_ANIMATION_DURATION);
            });
            expect(container?.innerHTML).toBe("");

            // loaded
            act(() => {
                jest.advanceTimersByTime(DELAY);
                render(<ServerWakingNotification isLoaded={true}/>, container);
            });
            expect(container?.innerHTML).toBe("");
        })
    });
});
