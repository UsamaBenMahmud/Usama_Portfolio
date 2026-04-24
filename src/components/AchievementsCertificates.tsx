import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { achievements, certificates } from '../data';
import { FiAward, FiX, FiZoomIn } from 'react-icons/fi';

export function Achievements() {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative py-24 ${
        isDark ? 'bg-dark-bg' : 'bg-light-bg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Awards & <span className="gradient-text">Achievements</span>
          </h2>
          <div className="w-20 h-1 gradient-bg rounded-full mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={isDark ? 'glass-card-dark rounded-2xl p-6 text-center' : 'glass-card-light rounded-2xl p-6 text-center shadow-sm'}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h3>
              <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {item.org}
                {item.year && ` • ${item.year}`}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certificates() {
  const { isDark } = useTheme();
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <section
      id="certificates"
      className={`relative py-24 ${
        isDark
          ? 'bg-gradient-to-b from-dark-bg via-dark-card/20 to-dark-bg'
          : 'bg-gradient-to-b from-light-bg via-purple-50/20 to-light-bg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="gradient-text">Certificates</span>
          </h2>
          <p className={`max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            My professional certifications and recognitions
          </p>
          <div className="w-20 h-1 gradient-bg rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedCert(cert)}
              className={`cursor-pointer group relative overflow-hidden rounded-2xl ${
                isDark ? 'glass-card-dark' : 'glass-card-light shadow-sm'
              }`}
            >
              {/* Certificate card visual */}
              <div className={`h-40 relative overflow-hidden ${
                isDark ? 'bg-gradient-to-br from-purple-900/30 to-cyan-900/30' : 'bg-gradient-to-br from-purple-100 to-cyan-100'
              }`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiAward
                    className={`${
                      isDark ? 'text-purple-500/30' : 'text-purple-300/50'
                    } group-hover:scale-110 transition-transform duration-500`}
                    size={80}
                  />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <FiZoomIn size={16} />
                    View Details
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {cert.title}
                </h3>
                <p className={`text-sm mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {cert.issuer}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {cert.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Detail Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative max-w-lg w-full rounded-2xl p-8 ${
                  isDark ? 'bg-dark-card border border-dark-border' : 'bg-white shadow-2xl'
                }`}
              >
                <button
                  onClick={() => setSelectedCert(null)}
                  className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                    isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <FiX size={20} />
                </button>

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  isDark ? 'bg-purple-500/10' : 'bg-purple-100'
                }`}>
                  <FiAward className={isDark ? 'text-purple-400' : 'text-purple-600'} size={32} />
                </div>

                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedCert.title}
                </h3>
                <p className={`text-lg font-medium mb-1 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  {selectedCert.issuer}
                </p>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {selectedCert.date}
                </p>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedCert.description}
                </p>

                {/* Placeholder for certificate image upload */}
                <div className={`mt-6 border-2 border-dashed rounded-xl p-6 text-center ${
                  isDark ? 'border-gray-700 text-gray-600' : 'border-gray-200 text-gray-400'
                }`}>
                  
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
