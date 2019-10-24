import { UserFriendlyDate, UserFriendlyDateHelper } from '../index';



test('Test Today - UTC Timezone inbuilt', () => {
    var date1 = new Date("2019/10/25  20:00:00 UTC");
    var date2 = new Date("2019/10/26  3:00:00");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Today");
});



test('Test Tomorrow - UTC Timezone inbuilt', () => {
    var date1 = new Date("2019/10/25  20:00:00 UTC");
    var date2 = new Date("2019/10/25  20:00:00");
    expect(UserFriendlyDateHelper(date1, date2, true)).toBe("Tomorrow");
});


test('Test Today - date1 is in UTC TimeZone, date 2 is local', () => {
    // It's 8pm 25 in GMT, so in India, it would be 1:30am 26th
    var date1 = new Date("2019/10/25  20:00:00");
    var date2 = new Date("2019/10/26  3:00:00");
    expect(UserFriendlyDateHelper(date1, date2)).toBe("Today");
});

test('Test Tomorrow - date1 is in UTC TimeZone, date 2 is local', () => {
    // It's 8pm 25 in GMT, so in India, it would be 1:30am 26th
    var date1 = new Date("2019/10/25  20:00:00");
    var date2 = new Date("2019/10/25  20:00:00");
    expect(UserFriendlyDateHelper(date1, date2)).toBe("Tomorrow");
});

test('Test Now with local Date - Future', () => {
    var date1 = new Date();
    date1.setDate(date1.getDate() +4);
    expect(UserFriendlyDate(date1)).toBe("In the future");
});

test('Test Now with local Date - Yesterday', () => {
    var date1 = new Date();
    date1.setDate(date1.getDate() - 1);
    expect(UserFriendlyDate(date1)).toBe("Yesterday");
});

test('Test Now with local Date - x days ago', () => {
    var date1 = new Date();
    date1.setDate(date1.getDate() - 5);
    date1.setHours(date1.getHours() - 11);
    expect(UserFriendlyDate(date1)).toBe("5 day(s) ago");
});

test('Test Now with local Date - x days ago', () => {
    var date1 = new Date();
    date1.setDate(date1.getDate() - 5);
    date1.setHours(date1.getHours() +1);
    expect(UserFriendlyDate(date1)).toBe("4 day(s) ago");
});
