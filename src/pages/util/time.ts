export function minutesToMilitary(minutes: number) {
    const obj = {
        minutes: minutes % 60,
        hours: Math.floor(minutes / 60),
    };

    return `${obj.hours}:${obj.minutes > 10 ? obj.minutes : '0' + obj.minutes}`;
}
