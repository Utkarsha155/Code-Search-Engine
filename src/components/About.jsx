import React from 'react'
import { NavLink } from "react-router-dom"

const About = () => {
  const features = [
    {
      icon: "🔍",
      title: "Lightning Fast Search",
      description: "Search through your entire codebase with instant results using advanced indexing algorithms."
    },
    {
      icon: "📁",
      title: "Multi-Language Support",
      description: "Supports various programming languages including C++, JavaScript, Python, and more."
    },
    {
      icon: "🎯",
      title: "Precise Results",
      description: "Get exact matches with highlighted keywords and context-aware search results."
    },
    {
      icon: "📊",
      title: "Search History",
      description: "Keep track of your previous searches with detailed result history and timestamps."
    },
    {
      icon: "⚡",
      title: "Real-time Indexing",
      description: "Automatically indexes your codebase for faster and more accurate search results."
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your code stays on your local machine. No data is sent to external servers."
    }
  ];

  return (
    <div className="min-h-screen gradient-bg py-12 px-6">
      <div className="max-w-6xl mx-auto fade-in">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-6">
            About CodeSearchEngine
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            A powerful, lightning-fast code search engine built for developers who need to quickly find and navigate through their codebase. 
            Built with modern web technologies and optimized for performance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="gradient-card p-6 rounded-2xl slide-in hover:transform hover:scale-105 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
          <p className="text-gray-300 mb-6">Try searching your codebase now and experience the power of fast, accurate code search.</p>
          <button className="gradient-button text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            <NavLink to="/">Start Searching</NavLink>
          </button>
        </div>
      </div>
    </div>
  )
}

export default About