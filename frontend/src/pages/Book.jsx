import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Card, CardBody } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Book() {
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [petId, setPetId] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [selected, setSelected] = useState([]);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const [{ data: myPets }, { data: svc }] = await Promise.all([
        api.get('/pets'),
        api.get('/services')
      ]);
      setPets(myPets);
      setServices(svc);
    })();
  }, []);

  const toggleService = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  const book = async (e) => {
    e.preventDefault();
    setMessage('');
    const payload = {
      pet_id: Number(petId),
      start_at: new Date(startAt).toISOString(),
      end_at: new Date(endAt).toISOString(),
      service_ids: selected,
      notes
    };
    const { data } = await api.post('/appointments', payload);
    setMessage(`Appointment booked. Status: ${data.status}`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold mb-4">Book Appointment</h1>
          {message && <div className="mb-2 text-green-700">{message}</div>}
          <form onSubmit={book} className="space-y-5">
            <label className="block space-y-1">
              <span className="label">Pet</span>
              <select value={petId} onChange={(e)=>setPetId(e.target.value)} className="input">
                <option value="">Select Pet</option>
                {pets.map(p => <option key={p.id} value={p.id}>{p.name} ({p.species})</option>)}
              </select>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input type="datetime-local" label="Start" value={startAt} onChange={(e)=>setStartAt(e.target.value)} />
              <Input type="datetime-local" label="End" value={endAt} onChange={(e)=>setEndAt(e.target.value)} />
            </div>
            <div>
              <div className="label mb-2">Services</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map(s => (
                  <label key={s.id} className={`card p-3 flex items-center justify-between cursor-pointer ${selected.includes(s.id)?'ring-2 ring-brand-300':''}`}>
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-gray-600">₹{(s.price_cents/100).toFixed(2)}</div>
                    </div>
                    <input type="checkbox" checked={selected.includes(s.id)} onChange={()=>toggleService(s.id)} />
                  </label>
                ))}
              </div>
            </div>
            <label className="block space-y-1">
              <span className="label">Notes</span>
              <textarea placeholder="Special instructions" value={notes} onChange={(e)=>setNotes(e.target.value)} className="input h-24"/>
            </label>
            <Button className="w-full">Confirm Booking</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}


