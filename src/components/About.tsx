import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data';
import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi';
import { FiDownload } from 'react-icons/fi';

export default function About() {
  const { isDark } = useTheme();

  const infoItems = [
    { icon: HiLocationMarker, text: personalInfo.address },
    { icon: HiPhone, text: personalInfo.phone },
    { icon: HiMail, text: personalInfo.email },
  ];

  return (
    <section
      id="about"
      className={`relative py-24 overflow-hidden ${
        isDark ? 'bg-dark-bg' : 'bg-gradient-to-b from-light-bg to-purple-50/30'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 gradient-bg rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Animated border */}
              <div className="absolute -inset-2 gradient-bg rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />
              
              {/* Image container */}
              <div
                className={`relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden ${
                  isDark ? 'bg-dark-card' : 'bg-white'
                }`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Placeholder with initials */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full gradient-bg flex items-center justify-center animate-float">
                    <span className="text-5xl sm:text-6xl font-bold text-white">UBM</span>
                  </div>
                  <p className={`mt-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Usama Ben Mahmud
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <img src="src/images/usama.jpg" alt="Usama Ben Mahmud" />
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute -top-4 -right-4 px-4 py-2 rounded-xl text-sm font-semibold ${
                  isDark
                    ? 'bg-dark-card text-cyan-400 border border-cyan-500/20'
                    : 'bg-white text-cyan-600 shadow-lg border border-cyan-100'
                }`}
              >
                🎓 Math Major
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`absolute -bottom-4 -left-4 px-4 py-2 rounded-xl text-sm font-semibold ${
                  isDark
                    ? 'bg-dark-card text-purple-400 border border-purple-500/20'
                    : 'bg-white text-purple-600 shadow-lg border border-purple-100'
                }`}
              >
                💻 Web Developer
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className={`absolute top-1/2 -right-12 px-4 py-2 rounded-xl text-sm font-semibold ${
                  isDark
                    ? 'bg-dark-card text-pink-400 border border-pink-500/20'
                    : 'bg-white text-pink-600 shadow-lg border border-pink-100'
                }`}
              >
                🚀 Entrepreneur
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className={`text-2xl md:text-3xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              A passionate developer &{' '}
              <span className="gradient-text">mathematics enthusiast</span>
            </h3>

            <p
              className={`text-base md:text-lg leading-relaxed mb-8 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {personalInfo.summary}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              {infoItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    <item.icon size={18} />
                  </div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Projects', value: '20+' },
                { label: 'Certifications', value: '15+' },
                { label: 'Leadership Roles', value: '7+' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-center p-4 rounded-xl ${
                    isDark ? 'bg-white/5' : 'bg-white shadow-sm'
                  }`}
                >
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div
                    className={`text-xs mt-1 ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/Usama_JUST_CV.pdf"
              download="Usama_JUST_CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl gradient-bg hover:shadow-xl hover:shadow-purple-500/25 transition-shadow"
            >
              <FiDownload size={16} />
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
