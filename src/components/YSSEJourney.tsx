import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ysseJourney } from '../data';
import { FiAward, FiHeart } from 'react-icons/fi';

export default function YSSEJourney() {
  const { isDark } = useTheme();

  return (
    <section
      id="ysse"
      className={`relative py-24 overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-dark-bg via-purple-950/20 to-dark-bg'
          : 'bg-gradient-to-br from-purple-50 via-white to-cyan-50'
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="gradient-text">{ysseJourney.title}</span>
          </h2>
          <p className={`text-lg font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            {ysseJourney.org}
          </p>
          <p className={`text-sm ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
            {ysseJourney.role}
          </p>
          <div className="w-20 h-1 gradient-bg rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={isDark ? 'glass-card-dark rounded-2xl p-8' : 'glass-card-light rounded-2xl p-8 shadow-sm'}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-pink-500/10' : 'bg-pink-100'}`}>
                  <FiHeart className={isDark ? 'text-pink-400' : 'text-pink-600'} size={24} />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  My Story
                </h3>
              </div>
              {ysseJourney.content.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className={`mb-4 leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {para}
                </p>
              ))}
              <p className={`text-sm italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Grateful to my mentors, teammates, and the entire YSSE family for their constant support and inspiration.
                This journey gave me skills, memories, and confidence I'll carry forward. ✨
              </p>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className={isDark ? 'glass-card-dark rounded-2xl p-8' : 'glass-card-light rounded-2xl p-8 shadow-sm'}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-100'}`}>
                  <FiAward className={isDark ? 'text-yellow-400' : 'text-yellow-600'} size={24} />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Achievements at YSSE
                </h3>
              </div>
              <div className="space-y-4">
                {ysseJourney.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      isDark ? 'bg-white/5' : 'bg-gradient-to-r from-purple-50 to-cyan-50'
                    }`}
                  >
                    <span className="text-2xl">🏆</span>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className={isDark ? 'glass-card-dark rounded-2xl p-6' : 'glass-card-light rounded-2xl p-6 shadow-sm'}>
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Tags</p>
              <div className="flex flex-wrap gap-2">
                {['Operations Intern', 'Management Trainee', 'YSSE', 'Self-Branding 2026'].map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      isDark
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
