import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Card, CardBody } from '../components/Card';
import StatusBadge from '../components/StatusBadge';

export default function History() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/appointments');
      setAppointments(data);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Appointments</h1>
      <div className="space-y-3">
        {appointments.map(a => (
          <Card key={a.id}>
            <CardBody>
              <div className="flex items-center justify-between">
                <div className="font-semibold">{a.pet_name}</div>
                <div className="text-sm">{new Date(a.start_at).toLocaleString()} → {new Date(a.end_at).toLocaleString()}</div>
              </div>
              <div className="text-sm mt-2">Status: <StatusBadge status={a.status} /></div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}


