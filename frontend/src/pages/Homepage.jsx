import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardBody } from '../components/Card';
import Button from '../components/Button';

export default function Homepage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data.slice(0, 4)); // Show only first 4 services on homepage
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/pet.jpg" 
            alt="Pets under umbrella - Golden retriever, tabby cat, and white kitten" 
            className="w-full h-full object-cover"
          />
          {/* Warm gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-beige-900/60 via-beige-800/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
          {/* Subtle floating elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-orange-500/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/15 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-20 w-8 h-8 bg-orange-400/30 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Providing Special Care For <span className="text-orange-300">All Your Beloved Pets!</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            From dogs and cats to birds, rabbits, and exotic pets - we offer comprehensive care services for every type of pet with love, expertise, and professional attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn btn-outline border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300">
              View Our Services
            </Link>
            <Link to="/register" className="btn bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange-100 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-200 rounded-full translate-x-12 translate-y-12"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-orange-50 rounded-full"></div>
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop" 
                alt="Family with dog" 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Us</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are passionate pet lovers dedicated to providing the highest quality care for all types of pets - dogs, cats, birds, rabbits, fish, reptiles, and exotic animals. 
                With years of experience and a team of certified professionals, we ensure every pet receives the love, 
                attention, and specialized care they deserve, tailored to their unique needs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to make pet care convenient, reliable, and stress-free for both you and your beloved companions, regardless of their species, size, or special requirements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Our Mission</h3>
                    <p className="text-gray-600 mt-1">
                      To provide exceptional pet care services that prioritize the health, happiness, and well-being of every pet in our care.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Our Vision</h3>
                    <p className="text-gray-600 mt-1">
                      To be the leading pet care service provider, setting the standard for excellence in pet health and happiness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-200 rounded-full opacity-50"></div>
        
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive pet care services designed to keep all your pets healthy, happy, and well-groomed - from traditional pets like dogs and cats to exotic animals, birds, and small mammals.
            </p>
          </div>
          
          {/* Additional Pet Care Image */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrxfWuW8zHM1xZlIJ7rOTepr-FUdhma-UOnRI5oys9B8MECLZM9oy1h_N4K9F_Y4NgBmk&usqp=CAU" 
                alt="Professional pet care services" 
                className="w-full max-w-lg h-64 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">Professional Pet Care</h3>
                <p className="text-sm opacity-90">Compassionate care for all your beloved pets</p>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={service.id} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardBody className="p-6">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="text-brand-600 font-bold text-lg mb-4">₹{(service.price_cents/100).toFixed(2)}</div>
                    <Link to="/services" className="btn btn-primary w-full">
                      Learn More
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link to="/services" className="btn btn-outline px-8 py-3">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container-page text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Team Is Filled With Highly Dedicated Pet Lovers
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Meet our certified professionals who are passionate about providing the best care for all types of pets. 
              Each team member brings years of experience and genuine love for animals of every species - from the smallest hamster to the largest dog.
            </p>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                alt="Pet care professional" 
                className="w-full max-w-md h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="mt-8">
              <Link to="/register" className="btn bg-white text-brand-600 hover:bg-gray-100 px-8 py-3">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest tips, news, and insights about pet care and health for all types of animals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop" 
                alt="Dog cooling tips" 
                className="w-full h-48 object-cover"
              />
              <CardBody className="p-6">
                <div className="text-sm text-gray-500 mb-2">Mar 29, 2024</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  How to Keep Your Pets Cool This Summer
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Essential tips and tricks to help all your pets stay comfortable and safe during hot weather - from dogs and cats to rabbits and birds.
                </p>
                <a href="#" className="text-brand-600 font-medium hover:text-brand-700">
                  READ MORE →
                </a>
              </CardBody>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2070&auto=format&fit=crop" 
                alt="Dog grooming" 
                className="w-full h-48 object-cover"
              />
              <CardBody className="p-6">
                <div className="text-sm text-gray-500 mb-2">Sep 28, 2024</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Solutions for Pet Grooming Challenges
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn how to address common grooming challenges and make grooming time enjoyable for pets of all types and temperaments.
                </p>
                <a href="#" className="text-brand-600 font-medium hover:text-brand-700">
                  READ MORE →
                </a>
              </CardBody>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop" 
                alt="Pet health" 
                className="w-full h-48 object-cover"
              />
              <CardBody className="p-6">
                <div className="text-sm text-gray-500 mb-2">Dec 15, 2024</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Winter Care for All Pets
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Keep all your pets healthy and happy during the colder months with these essential winter care tips for every type of animal.
                </p>
                <a href="#" className="text-brand-600 font-medium hover:text-brand-700">
                  READ MORE →
                </a>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
