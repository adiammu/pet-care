import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardBody } from '../components/Card';
import Button from '../components/Button';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Enhanced service details for demonstration
  const serviceDetails = {
    1: {
      features: ['Professional grooming', 'Nail trimming', 'Ear cleaning', 'Teeth brushing', 'Flea treatment'],
      duration: '2-3 hours',
      includes: 'Shampoo, conditioner, blow dry, styling'
    },
    2: {
      features: ['Daily walks', 'Exercise routines', 'Socialization', 'Basic training', 'Health monitoring'],
      duration: '30-60 minutes',
      includes: 'Leash, treats, waste bags, water'
    },
    3: {
      features: ['Teeth cleaning', 'Dental checkup', 'Oral health assessment', 'Preventive care', 'Treatment planning'],
      duration: '1-2 hours',
      includes: 'Professional cleaning, fluoride treatment, dental report'
    },
    4: {
      features: ['Full grooming', 'Styling', 'Breed-specific cuts', 'De-shedding', 'Coat conditioning'],
      duration: '2-4 hours',
      includes: 'Premium products, styling tools, finishing touches'
    }
  };

  if (loading) return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything your pet needs while you're away. Professional care services designed to keep all your pets healthy, happy, and well-groomed.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything your pet needs while you're away. Professional care services designed to keep your furry friends healthy, happy, and well-groomed.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(s => (
          <Card key={s.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative overflow-hidden">
              <img 
                src={`https://source.unsplash.com/collection/190727/400x240?sig=${s.id}`} 
                alt={s.name} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <CardBody className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-gray-900 mb-2">{s.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-brand-600">₹{(s.price_cents/100).toFixed(2)}</div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Professional Service
                </div>
              </div>
              <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3">
                Book This Service
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Book?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Choose from our comprehensive range of pet care services. Our professional team is ready to provide the best care for your beloved pets.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3">
            Book Appointment
          </Button>
          <Button variant="outline" className="px-8 py-3">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}


