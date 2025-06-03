import { useState, useEffect } from 'react';

interface SeatReservationTimerProps {
  expiresAt: Date;
  onExpire?: () => void;
}

const SeatReservationTimer = ({ expiresAt, onExpire }: SeatReservationTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = expiresAt.getTime() - now.getTime();
      
      if (difference <= 0) {
        if (onExpire) onExpire();
        return 0;
      }
      
      return Math.floor(difference / 1000);
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  return (
    <div className={`text-sm font-mono ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-green-600'}`}>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default SeatReservationTimer;