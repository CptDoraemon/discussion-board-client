import useUnprotectedGet from "../common/use-unprotected-get";
import { renderHook, act } from '@testing-library/react-hooks';
import GENERIC_ERROR_MESSAGE from "../common/generic-error-message";

const spiedFetch = jest.spyOn(window, 'fetch');
// success mocks
const mockData = {'testDataKey': 'testDataValue'};
const mockSuccessResponse = {status: 'success', data: {...mockData}};
const mockJsonSuccessPromise = Promise.resolve(mockSuccessResponse);
const mockFetchSuccess = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({json: () => mockJsonSuccessPromise})
        }, 200)
    });
};
// error mocks
const mockErrorResponse = {status: 'error', message: 'test error message'};
const mockJsonErrorPromise = Promise.resolve(mockErrorResponse);
const mockFetchError = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({json: () => mockJsonErrorPromise})
        }, 200)
    });
};

afterEach(() => {
    spiedFetch.mockReset()
});

test('should set data when loaded ', async () => {
    spiedFetch.mockImplementation(mockFetchSuccess as jest.Mock);
    const { result, waitForValueToChange } = renderHook(() => useUnprotectedGet('/', false));

    act(() => {
        result.current.doGet()
    });

    await waitForValueToChange(() => result.current.data);

    expect(result.current.data).toEqual(mockData)
});

test('should set error when server responded with error message', async () => {
    spiedFetch.mockImplementation(mockFetchError as jest.Mock);
    const { result, waitForNextUpdate } = renderHook(() => useUnprotectedGet('/', false));

    act(() => {
        result.current.doGet()
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual(true);
    expect(result.current.errorMessage).toEqual(mockErrorResponse.message)
});

test('should set error and error message to generic error message when unknown error occurs', async () => {
    spiedFetch.mockImplementation(() => Promise.reject());
    const { result, waitForNextUpdate } = renderHook(() => useUnprotectedGet('/', false));

    act(() => {
        result.current.doGet()
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual(true);
    expect(result.current.errorMessage).toEqual(GENERIC_ERROR_MESSAGE)
});

test('should set state to loading when start fetching', async () => {
    spiedFetch.mockImplementation(mockFetchSuccess as jest.Mock);
    const { result, waitForNextUpdate } = renderHook(() => useUnprotectedGet('/', false));

    act(() => {
        result.current.doGet()
    });

    expect(result.current.loading).toEqual(true);

    await waitForNextUpdate();
});

test('when fetching, additional fetches should not be invoked', async () => {
    spiedFetch.mockImplementation(mockFetchSuccess as jest.Mock);
    const { result, waitForValueToChange } = renderHook(() => useUnprotectedGet('/', false));

    act(() => {
        result.current.doGet();

        setTimeout(() => {
            result.current.doGet();
        }, 10);

        setTimeout(() => {
            result.current.doGet();
        }, 20);
    });

    await waitForValueToChange(() => result.current.data);

    expect(spiedFetch.mock.calls.length).toBe(1)
});

test('should reset error and errorMessage when new fetch is invoked', async () => {
    // first call gets error response
    spiedFetch.mockImplementation(mockFetchError as jest.Mock);
    const { result, waitForValueToChange } = renderHook(() => useUnprotectedGet('/', false));

    act(() => {
        result.current.doGet()
    });

    await waitForValueToChange(() => result.current.error);
    expect(result.current.error).toEqual(true);
    expect(result.current.errorMessage).toEqual(mockErrorResponse.message);

    // second call gets success response
    // expect error and error message to be reset
    spiedFetch.mockImplementation(mockFetchSuccess as jest.Mock);
    act(() => {
        result.current.doGet()
    });
    await waitForValueToChange(() => result.current.data);
    expect(result.current.error).toEqual(false);
    expect(result.current.errorMessage).toEqual('');
});
