import format = require('string-format');

declare global {
    interface Date {
        getUserFriendlyDate(isCurrentTimeZone?: boolean): string;
    }
}


Date.prototype.getUserFriendlyDate = function (isCurrentTimeZone?: boolean): string {
    return UserFriendlyDate(this,isCurrentTimeZone);
};

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

    if (!isCurrentTimeZone){
        inputDate = convertUTCToLocalDate(inputDate);
        //Convert from UTC to current time zone to get our answers.
    }

    var timeDifference = currentDate.getTime()-inputDate.getTime();
    var timeDifferenceInDays = Math.floor(Math.abs(timeDifference / day));
    var timeDifferenceInMinutes = Math.floor(Math.abs(timeDifference /minute));
    var timeDifferenceInHours = Math.floor(Math.abs(timeDifference / hour));
    

    //Past
    if (timeDifference >= 0){
        
        if (timeDifferenceInMinutes <= 5){
            return JustNow;
        }

        if (timeDifferenceInMinutes < 60){
            return format(MinutesAgo, timeDifferenceInMinutes.toString());
        }

        if (timeDifferenceInHours <= 12){
            if (timeDifferenceInHours == 1){
                return format(HourAgo, timeDifferenceInHours.toString());
            }
            return format(HoursAgo, timeDifferenceInHours.toString());
        }

        if (isToday(inputDate,currentDate)){
            return Today;
        }


        var yesterday = getDateFromNow(currentDate, -1,0,0);
        var lastMonth = getDateFromNow(currentDate, 0,-1,0);
        var lastYear = getDateFromNow(currentDate, 0,0,-1);
        
        //If the date is same as yesterday, return yesterday
        if (yesterday.getDate() === inputDate.getDate()) {
            return Yesterday;
        }
        //if less than a month's time has passed, return in {x} days fromat
        else if(inputDate.getTime()-lastMonth.getTime() >= 0) {
            if (timeDifferenceInDays == 1){
                return format(DayAgo, timeDifferenceInDays.toString());
            }
            return format(DaysAgo, timeDifferenceInDays.toString());
        }
        // if more than a month but less than a year has passed, return in {x} months format
        else if(inputDate.getTime()-lastYear.getTime() >= 0){
            var monthDifference = getMonthDifference(inputDate, currentDate);
            if (monthDifference == 1){
                return format(MonthAgo, monthDifference.toString());
            }
            return format(MonthsAgo, monthDifference.toString());
        }
        //if more than a year has passed, return in {x} years format
        else{
            var yearDifference = getYearDifference(inputDate, currentDate);
            if (yearDifference == 1){
                return format(YearAgo, yearDifference.toString());
            }
            return format(YearsAgo, yearDifference.toString());
        }
    }
    //Future
    else if (timeDifference < 0){
        if (timeDifferenceInMinutes <= 5){
            return DueJustNow;
        }

        if (timeDifferenceInMinutes < 60){
            return format(DueMinutesAgo, timeDifferenceInMinutes.toString());
        }

        if (timeDifferenceInHours <= 12){
            if (timeDifferenceInHours == 1){
                return format(DueHourAgo, timeDifferenceInHours.toString());
            }
            return format(DueHoursAgo, timeDifferenceInHours.toString());
        }

        if (isToday(inputDate,currentDate)){
            return DueToday;
        }

        var tomorrow = getDateFromNow(currentDate, 1,0,0);

        if (tomorrow.getDate() === inputDate.getDate()){
            return DueTomorrow;
        }
        else{
            return DueFuture;
        }        
    }

    //!This is the default, although this will never be reached
    return inputDate.toDateString()

}


function convertUTCToLocalDate(inputDate: Date): Date{
    //the timeOffset gives offset in minutes. Converting it to milliseconds and returning
    return new Date( inputDate.getTime() - (inputDate.getTimezoneOffset() * 60000));
}


function isToday(inputDate: Date, currentDate: Date){
    var dayDifference = Math.abs(currentDate.getDate() - inputDate.getDate());
    var monthDifference = Math.abs(currentDate.getMonth() - inputDate.getMonth());
    var yearDifference = Math.abs(currentDate.getFullYear() - inputDate.getFullYear());

    return dayDifference == 0 && monthDifference == 0 && yearDifference == 0;
}

/**
 * This function will return the date *days* days, *months* months nad *years* years from now
 * If days is set to 1, it will return tomorrow's date
 * If set to -1, it will return yesterday's date
 * If month is set to 1, it will return next month
 */
function getDateFromNow(currentDate: Date, days: number, months: number, years: number): Date{
    var yesterday = new Date(currentDate.valueOf());
    yesterday.setDate(yesterday.getDate() + days);
    yesterday.setMonth(yesterday.getMonth() + months);
    yesterday.setFullYear(yesterday.getFullYear() + years);
    return yesterday
}

function getMonthDifference(inputDate: Date, currentDate: Date): number {
    var months;
    months = (currentDate.getFullYear() - inputDate.getFullYear()) * 12;
    months += currentDate.getMonth() - inputDate.getMonth();
    return months;
}

function getYearDifference(inputDate: Date, currentDate: Date): number {
    return (currentDate.getFullYear() - inputDate.getFullYear());
}

//Future
export const DueFuture = "Due in the future";
export const DueTomorrow = "Due tomorrow";
export const DueHourAgo = "Due in {0} hour";
export const DueHoursAgo = "Due in {0} hours";
export const DueMinutesAgo = "Due in {0} minutes";
export const DueJustNow = "Due just now";
export const DueToday = "Due today";

//Past
export const JustNow = "Just now";
export const MinutesAgo = "{0} minutes ago";
export const HourAgo = "{0} hour ago";
export const HoursAgo = "{0} hours ago";
export const Today = "Today";
export const Yesterday = "Yesterday";
export const DayAgo = "{0} day ago";
export const DaysAgo = "{0} days ago";
export const MonthAgo = "{0} month ago";
export const MonthsAgo = "{0} months ago";
export const YearAgo = "{0} year ago";
export const YearsAgo = "{0} years ago";


export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;