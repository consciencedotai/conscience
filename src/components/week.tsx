import Day from './day';
import { minutesToMilitary } from '../util/time';

import weekStyles from '@/styles/week.module.css';
import dayStyles from '@/styles/day.module.css';

function generateDays() {

    let days = [];
    for (let i = 0; i < 7; i++) {
        days.push(<Day />);
    }

    return days;
}

function generateDayLabels() {
    const mapping: string[] = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    let days = [];
    for (let i = 0; i < 7; i++) {
        days.push(
            <div className={weekStyles.dayLabel}>
                <span className={weekStyles.dayLabelText}>{mapping[i]}</span>
            </div>
        );
    }

    return days;
}

function generateHourLabels() {
    let increments = [];

    const interval = 30;
    for (let i = interval; i < (24 * 60); i += interval) {
        increments.push(
            <div className={dayStyles.incrementLabel}>
                <span className={dayStyles.timeLabel}>
                    {minutesToMilitary(i)}
                </span>
            </div>
        );
    }

    increments.push(
        <div className={dayStyles.incrementLabel} style={{ borderBottom: 0 }} />
    );

    return increments;
}

function Week() {
    return (
        <div className={`${weekStyles.timeTicker} ${weekStyles.weekRoot}`}>
            <div className={weekStyles.header}>
                <div className={weekStyles.timezone}>
                    <span className={weekStyles.timezoneText}>EST</span>
                </div>
                <div className={weekStyles.dayLabels}>
                    {generateDayLabels()}
                </div>
                <div className={weekStyles.filler} />
            </div>
            <div className={dayStyles.incrementContainer}>
                {generateHourLabels()}
            </div>
            <div className={weekStyles.week}>
                {generateDays()}
            </div>
        </div>
    );
}

export default Week;
