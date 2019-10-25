import { UserFriendlyDate, UserFriendlyDateHelper } from '../index';



test('Test Today - UTC Timezone inbuilt', () => {
    var inputDate = new Date("2019/10/25  20:00:00 UTC");
    var currentDate = new Date("2019/10/26  3:00:00");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("1 hour ago");
});

test('Test Tomorrow - UTC Timezone inbuilt', () => {
    var inputDate = new Date("2019/10/25  20:00:00 UTC");
    var currentDate = new Date("2019/10/25  20:00:00");
    expect(UserFriendlyDateHelper(inputDate, currentDate, true)).toBe("Due in 5 hours");
});

test('Test Today - inputDate is in UTC TimeZone, date 2 is local', () => {
    // It's 8pm 25 in GMT, so in India, it would be 1:30am 26th
    var inputDate = new Date("2019/10/25  20:00:00");
    var currentDate = new Date("2019/10/26  3:00:00");
    expect(UserFriendlyDateHelper(inputDate, currentDate)).toBe("1 hour ago");
});

test('Test Tomorrow - inputDate is in UTC TimeZone, date 2 is local', () => {
    // It's 8pm 25 in GMT, so in India, it would be 1:30am 26th
    var inputDate = new Date("2019/10/25  20:00:00");
    var currentDate = new Date("2019/10/25  20:00:00");
    expect(UserFriendlyDateHelper(inputDate, currentDate)).toBe("Due in 5 hours");
});

test('Test Now with local Date - Future', () => {
    var inputDate = new Date();
    inputDate.setDate(inputDate.getDate() +4);
    expect(UserFriendlyDate(inputDate)).toBe("Due in the future");
});

test('Test Now with local Date - Yesterday', () => {
    var inputDate = new Date();
    inputDate.setDate(inputDate.getDate() - 1);
    expect(UserFriendlyDate(inputDate)).toBe("Yesterday");
});

test('Test Now with local Date - x days ago', () => {
    var inputDate = new Date();
    inputDate.setDate(inputDate.getDate() - 5);
    inputDate.setHours(inputDate.getHours() - 11);
    expect(UserFriendlyDate(inputDate)).toBe("5 days ago");
});

test('Test Now with local Date - x days ago', () => {
    var inputDate = new Date();
    inputDate.setDate(inputDate.getDate() - 5);
    inputDate.setHours(inputDate.getHours() +1);
    expect(UserFriendlyDate(inputDate)).toBe("4 days ago");
});

test('Test with date interface', () => {
    var inputDate = new Date();
    inputDate.setDate(inputDate.getDate() - 5);
    inputDate.setHours(inputDate.getHours() +1);    
    expect(inputDate.getUserFriendlyDate()).toBe("4 days ago");
});
