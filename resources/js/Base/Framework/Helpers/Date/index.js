import { differenceInSeconds, format, isValid } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { defaultTimezone } from '~/Application/Config';

let daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const monthShortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const daysName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

let getMonthName = (month, shortNames) => {
    return shortNames ? monthShortNames[month] : monthNames[month];
};

let getDayName = (day) => {
    return daysName[day];
};

let createCalendarList = (month, year) => {
    let dateDays = [];

    let numOfDays = daysInMonth(month, year);

    for (let i = 1; i <= numOfDays; i++) {
        const date = new Date(`${getMonthName(month)} ${i}, ${year}`);

        dateDays.push({
            date: i,
            day: getDayName(date.getDay()),
        });
    }

    return dateDays;
};

const fixDateForAllBrowsers = (date) => {
    const hasADot = date.indexOf('.') !== -1;
    const utcLikeFormat = hasADot ? date.substr(0, date.indexOf('.')) : date;
    return utcLikeFormat.replace(/-/g, '/');
};

const formatDate = (date, formatDate) => {
    const jsDate = toJsDate(date);
    return jsDate ? format(jsDate, formatDate) : null;
};

const toJsDate = (date) => {
    if (!date || typeof date !== 'string') {
        return null;
    }
    const jsDate = new Date(fixDateForAllBrowsers(date));

    return isValid(jsDate) ? jsDate : null;
};

const dateDiffWithTimezone = (
    leftDate,
    rightDate,
    timeZone = defaultTimezone,
    format = 'seconds'
) => {
    const date1 = toJsDate(leftDate) ?? new Date();

    const date2 = rightDate
        ? utcToZonedTime(toJsDate(rightDate), defaultTimezone)
        : utcToZonedTime(new Date(), defaultTimezone);

    return differenceInSeconds(date2, date1);
};

//momentjs is just too heavy
export {
    getMonthName,
    getDayName,
    daysInMonth,
    createCalendarList,
    daysName,
    formatDate,
    dateDiffWithTimezone,
    fixDateForAllBrowsers,
    toJsDate,
};
