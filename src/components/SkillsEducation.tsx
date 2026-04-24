import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { skills, education, languages } from '../data';
import {
  FiCode,
  FiGlobe,
  FiDatabase,
  FiTool,
  FiBookOpen,
} from 'react-icons/fi';

const skillCategories = [
  { icon: FiCode, title: 'Programming', items: skills.programming, color: 'from-purple-500 to-indigo-500' },
  { icon: FiGlobe, title: 'Web Development', items: skills.webDev, color: 'from-cyan-500 to-blue-500' },
  { icon: FiDatabase, title: 'Databases', items: skills.databases, color: 'from-pink-500 to-rose-500' },
  { icon: FiTool, title: 'Developer Tools', items: skills.tools, color: 'from-amber-500 to-orange-500' },
  { icon: FiBookOpen, title: 'Academic', items: skills.academic, color: 'from-emerald-500 to-green-500' },
];

export function Skills() {
  const { isDark } = useTheme();

  return (
    <section
      id="skills"
      className={`relative py-24 ${
        isDark
          ? 'bg-gradient-to-b from-dark-bg via-dark-card/30 to-dark-bg'
          : 'bg-gradient-to-b from-purple-50/30 via-white to-light-bg'
      }`}
    >
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 gradient-bg rounded-full mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={isDark ? 'glass-card-dark rounded-2xl p-6' : 'glass-card-light rounded-2xl p-6 shadow-sm'}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${cat.color} mb-4`}>
                <cat.icon className="text-white" size={22} />
              </div>
              <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isDark
                        ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Languages
          </h3>
          <div className="flex justify-center gap-6">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`px-6 py-3 rounded-xl ${
                  isDark ? 'glass-card-dark' : 'glass-card-light shadow-sm'
                }`}
              >
                <div className="text-lg font-bold gradient-text">{lang.name}</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lang.level}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Education() {
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
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-1 gradient-bg rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative pl-8 border-l-2 ${
                isDark ? 'border-purple-500/30' : 'border-purple-300'
              }`}
            >
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full gradient-bg`} />

              <div className={isDark ? 'glass-card-dark rounded-2xl p-6' : 'glass-card-light rounded-2xl p-6 shadow-sm'}>
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-3 ${
                  isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  {edu.period}
                </span>
                <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {edu.degree}
                </h3>
                <p className={`font-medium mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  {edu.institution}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
