import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi';
import type { GitHubProject } from '../data';

export default function Projects() {
  const { isDark } = useTheme();
  const [repos, setRepos] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/UsamaBenMahmud/repos?sort=updated&per_page=6')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const langColors: Record<string, string> = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3776ab',
    HTML: '#e34c26',
    CSS: '#1572b6',
    C: '#555555',
    Shell: '#89e051',
  };

  return (
    <section
      id="projects"
      className={`relative py-24 ${
        isDark ? 'bg-dark-bg' : 'bg-light-bg'
      }`}
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            GitHub <span className="gradient-text">Projects</span>
          </h2>
          <p className={`max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            A showcase of my open-source work and personal projects
          </p>
          <div className="w-20 h-1 gradient-bg rounded-full mx-auto mt-4" />
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`animate-pulse rounded-2xl p-6 h-52 ${
                  isDark ? 'bg-dark-card' : 'bg-gray-100'
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={isDark ? 'glass-card-dark rounded-2xl p-6 group' : 'glass-card-light rounded-2xl p-6 shadow-sm group'}
              >
                <div className="flex items-start justify-between mb-4">
                  <FiGithub
                    className={isDark ? 'text-gray-500 group-hover:text-purple-400 transition-colors' : 'text-gray-400 group-hover:text-purple-600 transition-colors'}
                    size={24}
                  />
                  <FiExternalLink
                    className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}
                    size={16}
                  />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white group-hover:text-purple-300' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>
                  {repo.name}
                </h3>
                <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {repo.description || 'No description available'}
                </p>
                <div className="flex items-center gap-4">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: langColors[repo.language] || '#888' }}
                      />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {repo.language}
                      </span>
                    </div>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1">
                      <FiStar size={12} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {repo.stargazers_count}
                      </span>
                    </div>
                  )}
                  {repo.forks_count > 0 && (
                    <div className="flex items-center gap-1">
                      <FiGitBranch size={12} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {repo.forks_count}
                      </span>
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/UsamaBenMahmud"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <FiGithub size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
