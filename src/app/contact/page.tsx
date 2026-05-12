'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Formspree placeholder - replace YOUR_FORM_ID with your actual Formspree ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-ink text-bone min-h-screen flex flex-col">
      {/* Hero */}
      <section className="border-b-4 border-bone py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-helvetica text-6xl sm:text-7xl lg:text-9xl leading-[0.92] uppercase">
              [ TRANSMIT_MESSAGE ]
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="flex-1 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {isSuccess ? (
              <div className="bg-brutal text-ink p-8 text-center">
                <p className="font-helvetica text-2xl uppercase tracking-tight">
                  &gt; 200 OK. Response queued within 24h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Field */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest block mb-3 opacity-70">
                    // NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-bone text-ink px-4 py-3 font-helvetica text-lg border-2 border-bone focus:border-brutal focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest block mb-3 opacity-70">
                    // EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-bone text-ink px-4 py-3 font-helvetica text-lg border-2 border-bone focus:border-brutal focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest block mb-3 opacity-70">
                    // MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-bone text-ink px-4 py-3 font-helvetica text-lg border-2 border-bone focus:border-brutal focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brutal text-ink font-helvetica text-lg uppercase tracking-tight py-4 hover:bg-bone hover:text-ink transition-colors duration-100 disabled:opacity-50"
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="border-t-4 border-bone py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-3 font-mono text-sm uppercase tracking-widest">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-brutal transition-colors"
            >
              → GITHUB
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-brutal transition-colors"
            >
              → LINKEDIN
            </a>
            <a href="mailto:ftonrate91@gmail.com" className="block hover:text-brutal transition-colors">
              → EMAIL
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
