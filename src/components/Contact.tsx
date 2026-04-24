import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data';
import { FiSend, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function Contact() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.open(mailtoLink, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: FiMapPin, label: 'Location', value: personalInfo.address, href: '#' },
  ];

  const socialLinks = [
    { icon: FaGithub, href: personalInfo.github, label: 'GitHub', color: 'hover:text-white' },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FaFacebook, href: personalInfo.facebook, label: 'Facebook', color: 'hover:text-blue-500' },
  ];

  return (
    <section
      id="contact"
      className={`relative py-24 ${
        isDark
          ? 'bg-gradient-to-b from-dark-bg via-dark-card/20 to-dark-bg'
          : 'bg-gradient-to-b from-light-bg via-purple-50/30 to-white'
      }`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className={`max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Have a question or want to work together? Drop me a message!
          </p>
          <div className="w-20 h-1 gradient-bg rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className={isDark ? 'glass-card-dark rounded-2xl p-6' : 'glass-card-light rounded-2xl p-6 shadow-sm'}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className={`p-3 rounded-xl transition-colors ${
                      isDark ? 'bg-purple-500/10 group-hover:bg-purple-500/20' : 'bg-purple-100 group-hover:bg-purple-200'
                    }`}>
                      <item.icon className={isDark ? 'text-purple-400' : 'text-purple-600'} size={18} />
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</p>
                      <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className={isDark ? 'glass-card-dark rounded-2xl p-6' : 'glass-card-light rounded-2xl p-6 shadow-sm'}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Follow Me
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-xl transition-all ${
                      isDark
                        ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                        : 'bg-purple-50 text-gray-500 hover:bg-purple-100'
                    } ${social.color}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className={isDark ? 'glass-card-dark rounded-2xl p-8' : 'glass-card-light rounded-2xl p-8 shadow-sm'}
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:ring-2 focus:ring-purple-500 outline-none ${
                      isDark
                        ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-purple-500/50'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-300 focus:bg-white'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:ring-2 focus:ring-purple-500 outline-none ${
                      isDark
                        ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-purple-500/50'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-300 focus:bg-white'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:ring-2 focus:ring-purple-500 outline-none ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-purple-500/50'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-300 focus:bg-white'
                  }`}
                  placeholder="Let's collaborate!"
                />
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:ring-2 focus:ring-purple-500 outline-none resize-none ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-purple-500/50'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-300 focus:bg-white'
                  }`}
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-green-500'
                    : 'gradient-bg hover:shadow-lg hover:shadow-purple-500/25'
                }`}
              >
                {submitted ? (
                  <>✓ Message Sent!</>
                ) : (
                  <>
                    <FiSend size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
