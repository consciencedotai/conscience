import Day from './day';
import { minutesToMilitary } from '../util/time';

import weekStyles from '@/styles/week.module.css';
import dayStyles from '@/styles/day.module.css';

function generateDays() {
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
        days.push(<Day day={ mapping[i] } />);
    }

    return days;
}

function generateHourLabels() {
    let increments = [<div className={ dayStyles.incrementLabel }><span className={ dayStyles.timeLabel }>EST</span></div>];

    const interval = 30;
    for (let i = interval; i < (24 * 60); i += interval) {
        increments.push(
            <div className={ dayStyles.incrementLabel }>
                <span className={ dayStyles.timeLabel }>
                    { minutesToMilitary(i) }
                </span>
            </div>
        );
    }

    increments.push(
        <div className={ dayStyles.incrementLabel } style={{ borderBottom: 0 }} />
    );

    return increments;
}

function Week() {
    return (
        <div className={ weekStyles.timeTicker }>
            <div className={ dayStyles.incrementContainer }>
                { generateHourLabels() }
            </div>
            <div className={ weekStyles.week }>
                { generateDays() }
            </div>
        </div>
    );
}

export default Week;
