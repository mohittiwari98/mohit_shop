import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Contact = () => {
  const { navigate } = useAppContext();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Demo UI: no backend wired.
    setSubmitted(true);
  };

  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Contact <span className="text-[#4fbf8b]">Us</span>
            </p>
            <p className="mt-2 text-gray-600">We’re here to help. Send us your query.</p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-fit px-5 py-2 rounded-xl bg-gray-900 text-white hover:bg-black transition"
          >
            Back to Home
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white/80 p-6">
            <p className="font-medium text-lg">Store Details</p>
            <div className="mt-4 space-y-3 text-gray-600 text-sm">
              <p>
                <span className="font-medium text-gray-800">Email:</span> support@example.com
              </p>
              <p>
                <span className="font-medium text-gray-800">Phone:</span> +91 99999 99999
              </p>
              <p>
                <span className="font-medium text-gray-800">Hours:</span> Mon-Sat, 9am-6pm
              </p>
            </div>

            <div className="mt-6 rounded-xl bg-[#4fbf8b]/10 border border-[#4fbf8b]/30 p-4">
              <p className="font-medium">Tip</p>
              <p className="text-gray-600 text-sm mt-1">
                Include your order id (if any) and we’ll respond faster.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#4fbf8b]"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#4fbf8b]"
                    placeholder="you@example.com"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#4fbf8b] min-h-[140px]"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#4fbf8b] text-white font-semibold hover:bg-[#44ae7c] transition"
              >
                Send Message
              </button>

              {submitted && (
                <div className="rounded-xl border border-[#4fbf8b]/30 bg-[#4fbf8b]/10 p-4">
                  <p className="font-semibold text-[#2e8a66]">Message sent!</p>
                  <p className="text-sm text-gray-600 mt-1">Thanks for contacting us. We’ll get back to you soon.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

