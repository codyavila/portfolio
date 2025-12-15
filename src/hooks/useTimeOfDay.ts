import { useState, useEffect } from "react";

export type TimePhase = "day" | "night";

export function useTimeOfDay() {
  const [phase, setPhase] = useState<TimePhase>("day");
  const [hour, setHour] = useState(12);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      // Return floating point hour for smooth interpolation (e.g. 12.5 for 12:30)
      const currentHour = now.getHours() + now.getMinutes() / 60;
      setHour(currentHour);

      // Day: 6 AM to 6 PM (18:00)
      // Night: 6 PM to 6 AM
      if (currentHour >= 6 && currentHour < 18) {
        setPhase("day");
      } else {
        setPhase("night");
      }
    };

    checkTime();
    // Check every minute
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return { phase, hour };
}
