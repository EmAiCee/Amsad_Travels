import Link from 'next/link'
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaWhatsapp,
  FaLinkedin
} from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import Container from '../ui/Container'

const footerLinks = {
  'Company': [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  'Support': [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  'Destinations': [
    { name: 'Europe', href: '/destinations/europe' },
    { name: 'Asia', href: '/destinations/asia' },
    { name: 'Americas', href: '/destinations/americas' },
    { name: 'Africa', href: '/destinations/africa' },
  ],
}

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook', color: 'hover:text-[#1877F2]' },
  { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
  { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-[#E4405F]' },
  { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:text-[#FF0000]' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="gradient-primary rounded-lg p-2">
                <span className="text-white font-bold text-xl">AT</span>
              </div>
              <span className="text-2xl font-bold">AmsadTravels</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover the world with AmsadTravels. We provide the best travel experiences with affordable prices and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <MdEmail size={20} />
                <span>info@travelhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MdPhone size={20} />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-gray-400">
              <MdLocationOn size={20} />
              <span>123 Travel Street, New York, NY 10001</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} AmsadTravels. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-300 hover:scale-110 transform`}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={22} />
                </Link>
              )
            })}
          </div>
        </div>
      </Container>
    </footer>
  )
}