import React from 'react'
import { Heart, Github, Coffee } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} HoldMyBag
            </span>
          </div>

          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <span>Made with</span>
            <Heart size={14} className="text-red-500" />
            <span>for quick gaming fun</span>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Coffee size={14} />
              <span>Powered by caffeine</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            Quick party games for when you're waiting around
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
