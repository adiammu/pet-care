import { Card, CardBody } from '../components/Card';
import Button from '../components/Button';

export default function About() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop" 
            alt="Happy family with pets" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            About <span className="text-brand-300">PetsCare</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Your trusted partner in providing exceptional care for all your beloved pets - from dogs and cats to birds, rabbits, fish, and exotic animals. 
            We've been serving pet families with love, dedication, and professional expertise.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                alt="Our story" 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2018 by passionate pet lovers, PetsCare began as a small local service 
                with a simple mission: to provide the highest quality care for all types of pets when their families 
                can't be there. What started as a neighborhood pet-sitting service has grown into a 
                comprehensive pet care platform serving thousands of happy pets of all species and their families.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our founders, Sarah and Michael, both veterinarians with over 15 years of combined 
                experience, recognized the need for reliable, professional pet care services that 
                pet owners could trust completely for all their animals. Today, we're proud to be the leading pet care 
                service provider in the region, specializing in care for dogs, cats, birds, rabbits, fish, reptiles, and exotic pets.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-2">5+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-2">10K+</div>
                  <div className="text-gray-600">Happy Pets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gradient-to-br from-brand-50 to-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are driven by our commitment to excellence and our love for animals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
              <CardBody>
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-2xl text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional pet care services that prioritize the health, happiness, 
                  and well-being of every pet in our care, regardless of species. We strive to create a safe, loving, 
                  and professional environment where all pets can thrive and families can have peace of mind.
                </p>
              </CardBody>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
              <CardBody>
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-2xl text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading pet care service provider, setting the standard for excellence 
                  in pet health and happiness for all types of animals. We envision a world where every pet receives the 
                  love, attention, and professional care they deserve, creating stronger bonds 
                  between pets and their families, regardless of the pet's species or special needs.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl text-gray-900">Love & Compassion</h3>
              <p className="text-gray-600">
                Every pet deserves unconditional love and compassion, regardless of their species. We treat each animal 
                as if they were our own, providing the emotional support and care they need.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl text-gray-900">Professional Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards of professionalism in all our services, 
                ensuring consistent quality and reliability for every pet and family we serve, regardless of the type of animal.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl text-gray-900">Trust & Reliability</h3>
              <p className="text-gray-600">
                Building trust through transparent communication, reliable service delivery, 
                and consistent care that pet owners can depend on every single day, for all their beloved animals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Expert Team</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Our dedicated professionals are passionate about providing the best care for all types of pets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardBody className="text-center p-6">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dr. Sarah Johnson" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-xl mb-2">Dr. Sarah Johnson</h3>
                <p className="text-brand-300 mb-3">Founder & Lead Veterinarian</p>
                <p className="text-sm opacity-90">
                  With 12 years of veterinary experience, Sarah founded PetsCare to provide 
                  exceptional pet care services for all types of animals. She specializes in preventive care and emergency medicine for dogs, cats, birds, and exotic pets.
                </p>
              </CardBody>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardBody className="text-center p-6">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Michael Chen" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-xl mb-2">Michael Chen</h3>
                <p className="text-brand-300 mb-3">Co-Founder & Operations Director</p>
                <p className="text-sm opacity-90">
                  Michael brings 10 years of business management experience and a deep love for animals. 
                  He ensures our operations run smoothly and efficiently.
                </p>
              </CardBody>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardBody className="text-center p-6">
                <img 
                  src="https://images.unsplash.com/photo-1594824388852-8a7b8b8b8b8b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Emma Rodriguez" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-xl mb-2">Emma Rodriguez</h3>
                <p className="text-brand-300 mb-3">Senior Pet Care Specialist</p>
                <p className="text-sm opacity-90">
                  Emma has been caring for pets for over 8 years. She's certified in pet first aid 
                  and specializes in senior pet care and behavioral training for all types of animals.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose PetsCare?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure all your pets receive the best possible care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Certified Professionals</h3>
              <p className="text-gray-600 text-sm">
                All our staff are certified and trained in pet care, first aid, and animal behavior for all types of pets.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock support and emergency services to ensure all your pets are always safe.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Personalized Care</h3>
              <p className="text-gray-600 text-sm">
                Customized care plans tailored to each pet's unique needs and personality, regardless of species.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Transparent Communication</h3>
              <p className="text-gray-600 text-sm">
                Regular updates and photos so you can stay connected with all your pets while you're away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container-page text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied pet families who trust PetsCare for their pets' well-being. 
            Let us provide the love and care all your beloved animals deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-brand-600 hover:bg-gray-100 px-8 py-3">
              Book Your First Service
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
