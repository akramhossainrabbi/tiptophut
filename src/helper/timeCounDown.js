export default function timeCounDown(targetDate) {
    
  const now = Date.now();
    const timeLeft = new Date(targetDate).getTime() - now;

    if (timeLeft <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
    };
}
