import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-900 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-50 mb-4">Get in Touch</h1>
        <p className="text-brand-200 max-w-xl mx-auto text-lg">
          Have questions about our blends, shipping, or ancient grains? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info Side */}
          <div>
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-brand-900 mb-6">Our Mill & Office</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 p-3 rounded-full text-brand-700">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">The Ancient Harvest Co.</h3>
                    <p className="text-slate-600 mt-1">
                      Plot No. 42, Organic Food Park,<br />
                      Near Vedic Village, Jaipur,<br />
                      Rajasthan - 302012, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 p-3 rounded-full text-brand-700">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Phone Support</h3>
                    <p className="text-slate-600 mt-1">+91 98765 43210</p>
                    <p className="text-xs text-slate-400 mt-1">Mon-Sat, 9am - 6pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 p-3 rounded-full text-brand-700">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email Us</h3>
                    <p className="text-slate-600 mt-1">hello@ancientharvest.co</p>
                    <p className="text-slate-600">support@ancientharvest.co</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h3 className="font-serif font-bold text-brand-900 text-lg mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-500" /> Wholesale & Bulk Inquiries
              </h3>
              <p className="text-slate-600 mb-4">
                Looking to stock our blends in your store or use them in your restaurant? We offer special pricing for bulk orders.
              </p>
              <a href="mailto:wholesale@ancientharvest.co" className="text-brand-700 font-bold hover:underline">
                Contact Wholesale Team →
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600">
                  Thank you for reaching out, {formData.name}. We'll get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-brand-700 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-serif font-bold text-brand-900 mb-6">Send us a Message</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                    >
                      <option value="">Select a topic...</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-brand-800 hover:bg-brand-900 text-white py-4 rounded-xl font-bold transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;