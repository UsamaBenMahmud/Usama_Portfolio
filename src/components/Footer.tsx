import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  const { isDark } = useTheme();

  const socialLinks = [
    { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: FaFacebook, href: personalInfo.facebook, label: 'Facebook' },
  ];

  return (
    <footer
      className={`relative py-12 ${
        isDark
          ? 'bg-dark-card/50 border-t border-dark-border'
          : 'bg-white/80 border-t border-purple-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            Usama Ben Mahmud
          </motion.a>

          {/* Social links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-xl transition-colors ${
                  isDark
                    ? 'text-gray-500 hover:text-white hover:bg-white/5'
                    : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6">
            {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-sm transition-colors ${
                  isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className={`w-full h-px ${isDark ? 'bg-dark-border' : 'bg-purple-100'}`} />

          {/* Credit */}
          <p className={`text-sm flex items-center gap-1 ${
            isDark ? 'text-gray-600' : 'text-gray-400'
          }`}>
            © {new Date().getFullYear()} Usama Ben Mahmud.
          </p>
        </div>
      </div>
    </footer>
  );
}
