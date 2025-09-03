import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            AI Blog
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
