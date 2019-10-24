import { UserFriendlyDateHelper } from '../index';

test('Test Today - Same dates', () => {
    var date1 = new Date("2019/10/25  14:45:10");
    expect(UserFriendlyDateHelper(date1, date1, true)).toBe("Today");
});

test('Test Today - Few Seconds Apart', () => {
    var date1 = new Date("2019/10/25  14:45:10");
    var date2 = new Date("2019/10/25  14:45:30");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Today");
});


test('Test Today - Hours Apart Backward', () => {
    var date1 = new Date("2019/10/25  14:45:10");
    var date2 = new Date("2019/10/25  4:45:30");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Today");
});

test('Test Today - Hours Apart Forward', () => {
    var date1 = new Date("2019/10/25  14:45:10");
    var date2 = new Date("2019/10/25  16:45:30");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Today");
});

test('Test Today - At the two extremes of a day', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2019/10/25  23:59:59");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Today");
});


test('Test Yesterday - At the two extremes of a day, just over the threshold', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2019/10/26  0:0:0");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Yesterday");
});

test('Test Yesterday - Few Seconds Apart on the threshold', () => {
    var date1 = new Date("2019/10/25  23:59:40");
    var date2 = new Date("2019/10/26  0:0:0");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Yesterday");
});

test('Test Yesterday - less than 24 hours apart', () => {
    var date1 = new Date("2019/10/25  14:20:20");
    var date2 = new Date("2019/10/26  12:20:20");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Yesterday");
});

test('Test Yesterday - over 24 hours apart', () => {
    var date1 = new Date("2019/10/25  14:20:20");
    var date2 = new Date("2019/10/26  16:20:20");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Yesterday");
});

test('Test Yesterday - At the two extremes of two days', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2019/10/26  23:59:59");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Yesterday");
});

test('Test Yesterday - Over a month extreme', () => {
    var date1 = new Date("2019/10/31,  0:0:0");
    var date2 = new Date("2019/11/1,  23:59:59");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Yesterday");
});

test('Test Days Ago - At the two extremes of 2 days, just over the threshold', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2019/10/27  0:0:0");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("2 days ago");
});

test('Test Days Ago - Few Seconds Apart on the threshold', () => {
    var date1 = new Date("2019/10/25  23:59:40");
    var date2 = new Date("2019/10/27  0:0:0");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("1 day ago");
});

test('Test Days Ago - less than 48 hours apart', () => {
    var date1 = new Date("2019/10/25  14:20:20");
    var date2 = new Date("2019/10/27  12:20:20");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("1 day ago");
});

test('Test Days Ago - over 48 hours apart', () => {
    var date1 = new Date("2019/10/25  14:20:20");
    var date2 = new Date("2019/10/27  16:20:20");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("2 days ago");
});

test('Test Days Ago - At the two extremes of two days', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2019/10/27  23:59:59");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("2 days ago");
});

test('Test Days Ago - Over a month extreme', () => {
    var date1 = new Date("2019/10/30,  0:0:0");
    var date2 = new Date("2019/11/1,  23:59:59");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("2 days ago");
});

test('Test Days Ago - Over 10 days', () => {
    var date1 = new Date("2019/10/20,  0:0:0");
    var date2 = new Date("2019/10/30,  23:59:59");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("10 days ago");
});

test('Test Days Ago - Over 2 months', () => {
    var date1 = new Date("2019/10/20,  0:0:0");
    var date2 = new Date("2019/12/30,  23:59:59");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("2 months ago");
});

test('Test Days Ago - Over 2 YEARS', () => {
    var date1 = new Date("2018/10/20,  0:0:0");
    var date2 = new Date("2019/12/30,  23:59:59");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("14 months ago");
});



test('Test Tomorrow - At the two extremes of a day, just over the threshold', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2019/10/26  0:0:0");
    expect(UserFriendlyDateHelper(date2, date1, true)).toBe("Tomorrow");
});

test('Test Tomorrow - Few Seconds Apart on the threshold', () => {
    var date1 = new Date("2019/10/25  23:59:40");
    var date2 = new Date("2019/10/26  0:0:0");
    expect(UserFriendlyDateHelper(date2, date1, true)).toBe("Tomorrow");
});

test('Test Tomorrow - less than 24 hours apart', () => {
    var date1 = new Date("2019/10/25  14:20:20");
    var date2 = new Date("2019/10/26  12:20:20");
    expect(UserFriendlyDateHelper(date2, date1, true)).toBe("Tomorrow");
});

test('Test Tomorrow - over 24 hours apart', () => {
    var date1 = new Date("2019/10/25  14:20:20");
    var date2 = new Date("2019/10/26  16:20:20");
    expect(UserFriendlyDateHelper(date2, date1, true)).toBe("Tomorrow");
});

test('Test Tomorrow - At the two extremes of two days', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2019/10/26  23:59:59");
    expect(UserFriendlyDateHelper(date2, date1, true)).toBe("Tomorrow");
});

test('Test Tomorrow - Over a month extreme', () => {
    var date1 = new Date("2019/10/31,  0:0:0");
    var date2 = new Date("2019/11/1,  23:59:59");
    expect(UserFriendlyDateHelper(date2, date1, true)).toBe("Tomorrow");
});

test('Test Future - just crossing over the extremes of two days', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2019/10/27  0:0:0");
    expect(UserFriendlyDateHelper(date2, date1, true)).toBe("In the future");
});

test('Test Future - two days and a few hours', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2020/10/27,  3:0:0");
    expect(UserFriendlyDateHelper(date2, date1, true)).toBe("In the future");
});

test('Test Future - a little more time', () => {
    var date1 = new Date("2019/10/25  0:0:0");
    var date2 = new Date("2020/10/27,  0:0:0");
    expect(UserFriendlyDateHelper(date2, date1, true)).toBe("In the future");
});