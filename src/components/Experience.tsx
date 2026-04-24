import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { experience } from '../data';
import { FiBriefcase } from 'react-icons/fi';

export default function Experience() {
  const { isDark } = useTheme();

  return (
    <section
      id="experience"
      className={`relative py-24 ${
        isDark
          ? 'bg-gradient-to-b from-dark-bg via-dark-card/20 to-dark-bg'
          : 'bg-gradient-to-b from-light-bg via-purple-50/20 to-light-bg'
      }`}
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Experience & <span className="gradient-text">Leadership</span>
          </h2>
          <div className="w-20 h-1 gradient-bg rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={isDark ? 'glass-card-dark rounded-2xl p-6' : 'glass-card-light rounded-2xl p-6 shadow-sm'}
            >
              <div className="flex flex-wrap items-start gap-4">
                <div
                  className={`shrink-0 p-3 rounded-xl ${
                    isDark ? 'bg-purple-500/10' : 'bg-purple-100'
                  }`}
                >
                  <FiBriefcase
                    className={isDark ? 'text-purple-400' : 'text-purple-600'}
                    size={22}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {exp.role}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        isDark
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'bg-cyan-50 text-cyan-600'
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p className={`font-medium mb-3 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    {exp.org}
                  </p>
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-2 text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isDark ? 'bg-purple-400' : 'bg-purple-400'}`} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
