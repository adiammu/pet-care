import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Card, CardBody } from '../components/Card';
import Button from '../components/Button';

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    (async () => {
      const [{ data: appts }, { data: myBills }] = await Promise.all([
        api.get('/appointments'),
        api.get('/bills/my')
      ]);
      setAppointments(appts);
      setBills(myBills);
    })();
  }, []);

  const generate = async (appointmentId) => {
    const { data } = await api.post(`/bills/${appointmentId}/generate`);
    setBills((prev) => [data, ...prev.filter(b => b.appointment_id !== appointmentId)]);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Bills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardBody>
            <h2 className="font-semibold mb-3">Appointments</h2>
            <div className="space-y-2">
              {appointments.map(a => (
                <div key={a.id} className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="text-sm font-medium">{a.pet_name}</div>
                    <div className="text-xs text-gray-600">{new Date(a.end_at).toLocaleString()}</div>
                  </div>
                  <Button onClick={()=>generate(a.id)}>Generate Bill</Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2 className="font-semibold mb-3">My Bills</h2>
            <div className="space-y-2">
              {bills.map(b => (
                <div key={b.id} className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="text-sm font-medium">Total: ₹{(b.total_cents/100).toFixed(2)}</div>
                    <div className="text-xs text-gray-600">{new Date(b.generated_at).toLocaleString()}</div>
                  </div>
                  <div className={`text-xs ${b.paid? 'text-green-700': 'text-red-700'}`}>{b.paid? 'Paid' : 'Unpaid'}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}


