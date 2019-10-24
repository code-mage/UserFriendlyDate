import format = require('string-format');


/**
 * This will return a user friendly date in the below categories
 * In the Future, Tomorrow, Today, Yesterday, {x} days ago
 * @param date This is the date value you want to convert to user friendly string
 * @param isCurrentTimeZone This value expresses whether the date provided is in the current timezone. If set to false, it is assumed that the date provided is in UTC
 */
export function UserFriendlyDate(date: Date, isCurrentTimeZone?: boolean): string{
    return UserFriendlyDateHelper(date, new Date(), isCurrentTimeZone);
}

/**
 * This will return a user friendly date diff in the below categories
 * In the Future, Tomorrow, Today, Yesterday, {x} days ago
 */
export function UserFriendlyDateHelper(inputDate: Date, currentDate: Date, isCurrentTimeZone?: boolean): string{
    var millisecondsInADay = 1000 * 60 * 60 * 24;

    if (!isCurrentTimeZone){
        inputDate = convertUTCToLocalDate(inputDate);
        //Convert from UTC to current time zone to get our answers.
    }

    var timeDifference = currentDate.getTime()-inputDate.getTime();
    var timeDifferenceInDays = timeDifference / millisecondsInADay;

    if (isToday(inputDate,currentDate)){
        return Today;
    }

    if (timeDifference >= 0){
        //Yesterday and x days ago            
        var yesterday = getDateFromNow(currentDate, -1);
        if (yesterday.getDate() === inputDate.getDate()) {
            return Yesterday;
        }
        else {
            var daysAgo = Math.floor(timeDifferenceInDays);
            return format(DaysAgo, daysAgo.toString());
        }
    }
    else if (timeDifference < 0){
        var tomorrow = getDateFromNow(currentDate, 1);

        if (tomorrow.getDate() === inputDate.getDate()){
            return Tomorrow;
        }
        else{
            return Future;
        }        
    }

    //!This is the default, although this will never be reached
    return inputDate.toDateString()

}


function convertUTCToLocalDate(inputDate: Date): Date{
    return new Date( inputDate.getTime() - (inputDate.getTimezoneOffset() * 60000));
}


function isToday(inputDate: Date, currentDate: Date){
    var dayDifference = Math.abs(currentDate.getDate() - inputDate.getDate());
    var monthDifference = Math.abs(currentDate.getMonth() - inputDate.getMonth());
    var yearDifference = Math.abs(currentDate.getFullYear() - inputDate.getFullYear());

    return dayDifference == 0 && monthDifference == 0 && yearDifference == 0;
}

/**
 * This function will return the date *days* days by now
 * If days is set to 1, it will return tomorrow's date
 * If set to -1, it will return yesterday's date
 */
function getDateFromNow(currentDate: Date, days: number): Date{
    var yesterday = currentDate;
    yesterday.setDate(yesterday.getDate() + days);
    return yesterday
}

export const Future = "In the future";
export const Tomorrow = "Tomorrow";
export const Today = "Today";
export const Yesterday = "Yesterday";
export const DaysAgo = "{0} day(s) ago";
