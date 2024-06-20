export class DateTimeUtility
{
    static getFormattedHourAndMinute(date: Date): string
    {

        var hours: string = date.getUTCHours().toString();
        var minutes: string = date.getUTCMinutes().toString();
        if(hours.length === 1)
        {
            hours = "0"+hours;
        }
        if(minutes.length === 1)
        {
            minutes = "0"+minutes;
        }
        return hours + ":" + minutes;
    }

    static getStartOfDayMilli(date: Date): number
    {
        const startOfDay: Date = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        return startOfDay.getTime();
    }

    static getEndOfDayMilli(date: Date): number
    {
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);
        return endOfDay.getTime();
    }   
}