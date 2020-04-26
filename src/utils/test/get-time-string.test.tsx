import getTimeString from "../get-time-string";

test('should convert ISO time string to formatted readable string', () => {
    const input = (new Date(2020, 2, 5, 11, 30)).toISOString();
    expect(getTimeString(`${input}`)).toBe('5 Mar, 2020 - 11:30')
});

test('should prefix "0" to single digit hour', () => {
    const input = (new Date(2020, 2, 5, 2, 30)).toISOString();
    expect(getTimeString(`${input}`)).toBe('5 Mar, 2020 - 02:30')
});

test('should prefix "0" to single digit minute', () => {
    const input = (new Date(1990, 2, 5, 11, 3)).toISOString();
    expect(getTimeString(`${input}`)).toBe('5 Mar, 1990 - 11:03')
});