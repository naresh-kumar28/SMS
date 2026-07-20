import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../../components/common/AppIcon';
import SiteLayout from '../../layouts/SiteLayout';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <SiteLayout>
      <main className="min-h-screen -mt-16 bg-linear-to-br from-surface via-surface-container to-surface">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/10"></div>
          
          {/* Main Content */}
          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-32">
            <div className="text-center">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full mb-8 backdrop-blur-sm border border-primary/20 animate-fade-in-up">
                <AppIcon name="support_agent" size={18} className="text-primary" />
                <span className="text-primary font-medium text-sm">We're here to help 24/7</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-headline font-bold text-on-surface mb-8 animate-fade-in-up delay-200">
                Get in <span className="text-primary">Touch</span>
              </h1>
              
              {/* Description */}
              <p className="text-xl lg:text-2xl text-on-surface-variant max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up delay-300">
                Have questions about Skoolnet? Our team of educational technology experts is ready to help you transform your institution with cutting-edge solutions.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up delay-400">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-on-surface-variant">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">&lt;1hr</div>
                  <div className="text-sm text-on-surface-variant">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-on-surface-variant">Happy Schools</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-headline font-bold text-on-surface mb-4">
              Quick Contact Options
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
              Choose the most convenient way to reach us
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <ContactMethod
              icon="mail"
              title="Email"
              description="Get a response within 24 hours"
              action="support@skoolnet.ai"
              link="mailto:support@skoolnet.ai"
            />
            <ContactMethod
              icon="call"
              title="Phone"
              description="Mon-Fri: 9am - 6pm EST"
              action="+1 (555) 000-1234"
              link="tel:+15550001234"
            />
            <ContactMethod
              icon="video_call"
              title="Demo"
              description="30-minute guided tour"
              action="Book a Call"
              link="#demo"
            />
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-outline-variant/20 p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
                  Send us a Message
                </h2>
                <p className="text-on-surface-variant">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-on-surface mb-2">
                      First Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant/40 bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-on-surface mb-2">
                      Last Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant/40 bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-2">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant/40 bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-on-surface mb-2">
                    Company / Institution
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant/40 bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="Your School or Company"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-on-surface mb-2">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Information</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="demo">Request a Demo</option>
                    <option value="billing">Billing & Pricing</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-on-surface mb-2">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant/40 bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <AppIcon name="send" size={18} />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      company: '',
                      subject: '',
                      message: ''
                    })}
                    className="px-8 py-4 bg-surface-container-high text-on-surface font-semibold rounded-xl border border-outline-variant/40 hover:bg-surface-container-highest transition-all"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-outline-variant/20 p-8">
                <h3 className="text-2xl font-headline font-bold text-on-surface mb-6">
                  Visit Our Office
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <AppIcon name="location_on" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface mb-1">Silicon Valley Headquarters</h4>
                      <p className="text-on-surface-variant">101 Innovation Way<br />Silicon Valley, CA 94025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <AppIcon name="schedule" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface mb-1">Business Hours</h4>
                      <div className="text-on-surface-variant space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <AppIcon name="directions_car" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface mb-1">Getting Here</h4>
                      <p className="text-on-surface-variant">Free visitor parking available on-site. Easy access from Highway 101.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-linear-to-br from-primary to-primary/90 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-headline font-bold mb-4">
                  Need Quick Help?
                </h3>
                <p className="text-white/90 mb-6">
                  Check out our comprehensive help center or schedule a demo with our team.
                </p>
                <div className="space-y-3">
                  <Link to="/about" className="w-full px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                    <AppIcon name="help_center" size={20} />
                    Visit Help Center
                  </Link>
                  <Link to="/contact" className="w-full px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                    <AppIcon name="calendar_today" size={20} />
                    Schedule Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative h-96 lg:h-[500px] overflow-hidden bg-surface">
          <div className="absolute inset-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.0684682364!2d-122.08424968468654!3d37.42199997982418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5b5f8b5b5b5%3A0x1234567890abcdef!2s101%20Innovation%20Way%2C%20Silicon%20Valley%2C%20CA%2094025!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-xl"
              title="Silicon Valley Office Location Map"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          
          {/* Map Overlay Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 py-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-end">
                  {/* Location Info */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm">
                    <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">
                      Visit Our Silicon Valley Office
                    </h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <AppIcon name="location_on" size={20} className="text-primary mt-1" />
                        <div>
                          <p className="font-semibold text-on-surface">Address</p>
                          <p className="text-on-surface-variant">101 Innovation Way, Silicon Valley, CA 94025</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AppIcon name="schedule" size={20} className="text-primary mt-1" />
                        <div>
                          <p className="font-semibold text-on-surface">Office Hours</p>
                          <p className="text-on-surface-variant">Mon-Fri: 9:00 AM - 6:00 PM PST</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AppIcon name="directions_car" size={20} className="text-primary mt-1" />
                        <div>
                          <p className="font-semibold text-on-surface">Parking</p>
                          <p className="text-on-surface-variant">Free visitor parking available</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Link to="/contact" className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <AppIcon name="map" size={18} />
                        Get Directions
                      </Link>
                      <Link to="/contact" className="px-6 py-3 bg-surface-container-high text-on-surface font-semibold rounded-xl border border-outline-variant/40 hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                        <AppIcon name="video_call" size={18} />
                        Schedule Visit
                      </Link>
                    </div>
                  </div>
                  
                  {/* Quick Contact */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h4 className="text-xl font-headline font-bold text-black/80 mb-4">
                      Need Immediate Assistance?
                    </h4>
                    <p className="text-black/80 mb-6">
                      Our support team is ready to help you with any questions about Skoolnet.
                    </p>
                    <div className="space-y-3">
                      <a href="tel:+15550001234" className="flex items-center gap-3 text-black/80 hover:text-black/60 transition-colors">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <AppIcon name="call" size={18} />
                        </div>
                        <div>
                          <p className="font-semibold">Call Us</p>
                          <p className="text-sm text-black/80">+1 (555) 000-1234</p>
                        </div>
                      </a>
                      <a href="mailto:support@skoolnet.ai" className="flex items-center gap-3 text-black/80 hover:text-black/60 transition-colors">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <AppIcon name="mail" size={18} />
                        </div>
                        <div>
                          <p className="font-semibold">Email Us</p>
                          <p className="text-sm text-black/80">support@skoolnet.ai</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
};

const ContactMethod = ({ icon, title, description, action, link }) => (
  <div className="bg-white rounded-xl shadow-md border border-outline-variant/20 p-6 hover:shadow-lg transition-shadow">
    {/* First Row: Icon + Title + Description */}
    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <AppIcon name={icon} size={24} className="text-primary" />
      </div>
      <div className="text-left flex-1">
        <h3 className="text-lg font-headline font-bold text-on-surface ">{title}</h3>
        <p className="text-sm text-on-surface-variant leading-relax">{description}</p>
      </div>
    </div>
    
    {/* Second Row: Action Button */}
    <div className="flex justify-start">
      <a 
        href={link}
        className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg text-primary font-semibold hover:bg-primary hover:text-white transition-colors text-sm"
      >
        {action}
        <AppIcon name="arrow_forward" size={14} />
      </a>
    </div>
  </div>
);

export default Contact;
