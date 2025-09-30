import { useEffect, useRef } from 'react';
import api from '../lib/api';

export default function useNotifications() {
  const notifiedIdsRef = useRef(new Set());

  useEffect(() => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
    const interval = setInterval(async () => {
      try {
        const { data } = await api.get('/appointments');
        const now = Date.now();
        data.forEach((a) => {
          const start = new Date(a.start_at).getTime();
          const minutes = Math.round((start - now) / 60000);
          if (minutes > 0 && minutes <= 60 && !notifiedIdsRef.current.has(a.id)) {
            if (Notification.permission === 'granted') {
              new Notification('Upcoming Pet Appointment', {
                body: `${a.pet_name} starts in ${minutes} minutes`
              });
            }
            notifiedIdsRef.current.add(a.id);
          }
        });
      } catch {}
    }, 60000);
    return () => clearInterval(interval);
  }, []);
}



