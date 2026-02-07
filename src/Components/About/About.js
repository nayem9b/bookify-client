import React from "react";
import { motion } from "framer-motion";
import { 
  FiBook, 
  FiUsers, 
  FiHeart, 
  FiAward, 
  FiTrendingUp, 
  FiGlobe,
  FiTarget,
  FiZap,
  FiShield,
  FiStar,
  FiCoffee,
  FiBookOpen,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube
} from "react-icons/fi";

const About = () => {
  const stats = [
    { number: "50K+", label: "Active Readers", icon: <FiUsers className="w-8 h-8" /> },
    { number: "100K+", label: "Books Available", icon: <FiBook className="w-8 h-8" /> },
    { number: "4.9", label: "User Rating", icon: <FiStar className="w-8 h-8" /> },
    { number: "24/7", label: "Support", icon: <FiZap className="w-8 h-8" /> },
  ];

  const values = [
    {
      icon: <FiHeart className="w-12 h-12" />,
      title: "Passion for Reading",
      description: "We believe every book has the power to transform lives and open new worlds of possibility."
    },
    {
      icon: <FiTarget className="w-12 h-12" />,
      title: "Quality First",
      description: "We curate only the finest books and provide exceptional reading experiences for our community."
    },
    {
      icon: <FiUsers className="w-12 h-12" />,
      title: "Community Driven",
      description: "Our platform is built by readers, for readers, fostering connections and shared experiences."
    },
    {
      icon: <FiZap className="w-12 h-12" />,
      title: "Innovation",
      description: "We continuously evolve our platform with cutting-edge technology to enhance your reading journey."
    }
  ];

  const team = [
    {
      name: "Rezwan Nayem",
      role: "CEO & Founder",
      image: "https://avatars.githubusercontent.com/u/78756747?v=4",
      description: "Passionate about democratizing access to knowledge through technology."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://t4.ftcdn.net/jpg/03/25/73/59/360_F_325735908_TkxHU7okor9CTWHBhkGfdRumONWfIDEb.jpg",
      description: "Tech visionary building the future of digital reading experiences."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      image: "https://www.denverheadshotco.com/wp-content/uploads/2023/06/Company-Headshots-scaled.jpg",
      description: "Curating the world's most engaging and diverse book collection."
    },
    {
      name: "David Kim",
      role: "Head of Community",
      image: "https://images.squarespace-cdn.com/content/v1/5ec689480cc22c2d441e152f/0b348836-1857-4ab0-b1b8-a06809b51366/personal-branding-portraits-professional-headshot-photography-connecticut-ct-photo-westport-studio-nlalor-21.jpg",
      description: "Building meaningful connections between readers worldwide."
    }
  ];

  const features = [
    {
      icon: <FiBookOpen className="w-8 h-8" />,
      title: "Unlimited Access",
      description: "Read thousands of books without limits"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Personalized Recommendations",
      description: "AI-powered suggestions tailored to your taste"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your reading data is always protected"
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Global Community",
      description: "Connect with readers from around the world"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-slate-700 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                About Bookify
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We're on a mission to make reading accessible, enjoyable, and transformative for everyone.
            </motion.p>

            {/* <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              
                <span className="text-gray-700 font-medium">Founded 2020</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
             
                <span className="text-gray-700 font-medium">Global Platform</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              
                <span className="text-gray-700 font-medium">Reader-First</span>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:shadow-xl transition-all duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                To democratize access to knowledge and stories by creating a platform where every reader can discover, 
                connect, and grow through the power of books. We believe that reading should be accessible, 
                affordable, and enjoyable for everyone, regardless of their background or circumstances.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FiTarget className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-600">Making quality books accessible to everyone</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FiUsers className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-600">Building a global community of passionate readers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FiZap className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-600">Innovating the future of digital reading</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-cyan-500 to-blue-800 rounded-3xl shadow-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <FiBook className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">50,000+</h3>
                    <p className="text-lg">Happy Readers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Bookify
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind Bookify's success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Bookify?</h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Experience the future of reading with our innovative platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:bg-white/30 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-indigo-100 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl p-12 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-blue-900 -skew-y-3 transform origin-top-left"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Reading Community
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Start your reading journey today and discover a world of endless possibilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-lg"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
