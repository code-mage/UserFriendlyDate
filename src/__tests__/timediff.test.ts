import { UserFriendlyDateHelper } from '../index';

test('Test Today - Same dates', () => {
    var inputDate = new Date("2019/10/25  14:45:10");
    expect(UserFriendlyDateHelper(inputDate, inputDate, true)).toBe("Just now");
});

test('Test Today - Few Seconds Apart', () => {
    var inputDate = new Date("2019/10/25  14:45:10");
    var currentDate = new Date("2019/10/25  14:45:30");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Just now");
});

test('Test Today - Hours Apart Backward', () => {
    var inputDate = new Date("2019/10/25  14:45:10");
    var currentDate = new Date("2019/10/25  4:45:30");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Due in 9 hours");
});

test('Test Today - Hours Apart Forward', () => {
    var inputDate = new Date("2019/10/25  14:45:10");
    var currentDate = new Date("2019/10/25  16:45:30");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("2 hours ago");
});

test('Test Today - At the two extremes of a day', () => {
    var inputDate = new Date("2019/10/25  0:0:0");
    var currentDate = new Date("2019/10/25  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Today");
});


test('Test Yesterday - At the two extremes of a day, just over the threshold', () => {
    var inputDate = new Date("2019/10/25  0:0:0");
    var currentDate = new Date("2019/10/26  0:0:0");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Yesterday");
});

test('Test Yesterday - Few Seconds Apart on the threshold', () => {
    var inputDate = new Date("2019/10/25  23:59:40");
    var currentDate = new Date("2019/10/26  0:0:0");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Just now");
});

test('Test Yesterday - less than 24 hours apart', () => {
    var inputDate = new Date("2019/10/25  14:20:20");
    var currentDate = new Date("2019/10/26  12:20:20");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Yesterday");
});

test('Test Yesterday - over 24 hours apart', () => {
    var inputDate = new Date("2019/10/25  14:20:20");
    var currentDate = new Date("2019/10/26  16:20:20");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Yesterday");
});

test('Test Yesterday - At the two extremes of two days', () => {
    var inputDate = new Date("2019/10/25  0:0:0");
    var currentDate = new Date("2019/10/26  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Yesterday");
});

test('Test Yesterday - Over a month extreme', () => {
    var inputDate = new Date("2019/10/31,  0:0:0");
    var currentDate = new Date("2019/11/1,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Yesterday");
});

test('Test Days Ago - At the two extremes of 2 days, just over the threshold', () => {
    var inputDate = new Date("2019/10/25  0:0:0");
    var currentDate = new Date("2019/10/27  0:0:0");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("2 days ago");
});

test('Test Days Ago - Few Seconds Apart on the threshold', () => {
    var inputDate = new Date("2019/10/25  23:59:40");
    var currentDate = new Date("2019/10/27  0:0:0");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("1 day ago");
});

test('Test Days Ago - less than 48 hours apart', () => {
    var inputDate = new Date("2019/10/25  14:20:20");
    var currentDate = new Date("2019/10/27  12:20:20");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("1 day ago");
});

test('Test Days Ago - over 48 hours apart', () => {
    var inputDate = new Date("2019/10/25  14:20:20");
    var currentDate = new Date("2019/10/27  16:20:20");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("2 days ago");
});

test('Test Days Ago - At the two extremes of two days', () => {
    var inputDate = new Date("2019/10/25  0:0:0");
    var currentDate = new Date("2019/10/27  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("2 days ago");
});

test('Test Days Ago - Over a month extreme', () => {
    var inputDate = new Date("2019/10/30,  0:0:0");
    var currentDate = new Date("2019/11/1,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("2 days ago");
});

test('Test Days Ago - Over 10 days', () => {
    var inputDate = new Date("2019/10/20,  0:0:0");
    var currentDate = new Date("2019/10/30,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("10 days ago");
});

test('Test Days Ago - Over 28 days', () => {
    var inputDate = new Date("2019/10/20,  0:0:0");
    var currentDate = new Date("2019/11/10,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("21 days ago");
});

test('Test Days Ago - Over 2 months', () => {
    var inputDate = new Date("2019/10/20,  0:0:0");
    var currentDate = new Date("2019/12/30,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("2 months ago");
});

test('Test Days Ago - Over an year', () => {
    var inputDate = new Date("2018/10/20,  0:0:0");
    var currentDate = new Date("2019/12/30,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("1 year ago");
});


test('Test Days Ago - Just under an year', () => {
    var inputDate = new Date("2018/10/20,  0:0:0");
    var currentDate = new Date("2019/10/19,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("12 months ago");
});


test('Test Days Ago - 12 months', () => {
    var inputDate = new Date("2018/10/20,  0:0:0");
    var currentDate = new Date("2019/10/20,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("1 year ago");
});

test('Test Days Ago - 5 years', () => {
    var inputDate = new Date("2018/10/20,  0:0:0");
    var currentDate = new Date("2023/10/20,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("5 years ago");
});



test('Test Tomorrow - At the two extremes of a day, just over the threshold', () => {
    var curentDate = new Date("2019/10/25  0:0:0");
    var inputDate = new Date("2019/10/26  0:0:0");
    expect(UserFriendlyDateHelper(inputDate, curentDate, true)).toBe("Due tomorrow");
});

test('Test Tomorrow - Few Seconds Apart on the threshold', () => {
    var curentDate = new Date("2019/10/25  23:59:40");
    var inputDate = new Date("2019/10/26  0:0:0");
    expect(UserFriendlyDateHelper(inputDate, curentDate, true)).toBe("Due just now");
});

test('Test Tomorrow - less than 24 hours apart', () => {
    var curentDate = new Date("2019/10/25  14:20:20");
    var inputDate = new Date("2019/10/26  12:20:20");
    expect(UserFriendlyDateHelper(inputDate, curentDate, true)).toBe("Due tomorrow");
});

test('Test Tomorrow - over 24 hours apart', () => {
    var curentDate = new Date("2019/10/25  14:20:20");
    var inputDate = new Date("2019/10/26  16:20:20");
    expect(UserFriendlyDateHelper(inputDate, curentDate, true)).toBe("Due tomorrow");
});

test('Test Tomorrow - At the two extremes of two days', () => {
    var curentDate = new Date("2019/10/25  0:0:0");
    var inputDate = new Date("2019/10/26  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, curentDate, true)).toBe("Due tomorrow");
});

test('Test Tomorrow - Over a month extreme', () => {
    var curentDate = new Date("2019/10/31,  0:0:0");
    var inputDate = new Date("2019/11/1,  23:59:59");
    expect(UserFriendlyDateHelper(inputDate, curentDate, true)).toBe("Due tomorrow");
});

test('Test Future - just crossing over the extremes of two days', () => {
    var curentDate = new Date("2019/10/25  0:0:0");
    var inputDate = new Date("2019/10/27  0:0:0");
    expect(UserFriendlyDateHelper(inputDate, curentDate, true)).toBe("Due in the future");
});

test('Test Future - two days and a few hours', () => {
    var curentDate = new Date("2019/10/25  0:0:0");
    var inputDate = new Date("2020/10/27,  3:0:0");
    expect(UserFriendlyDateHelper(inputDate, curentDate, true)).toBe("Due in the future");
});

test('Test Future - a little more time', () => {
    var curentDate = new Date("2019/10/25  0:0:0");
    var inputDate = new Date("2020/10/27,  0:0:0");
    expect(UserFriendlyDateHelper(inputDate, curentDate, true)).toBe("Due in the future");
});