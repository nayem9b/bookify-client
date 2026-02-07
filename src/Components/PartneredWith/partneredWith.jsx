// Import local company logos
import darazLogo from "../../Assets/Companies/daraz2.png";
import carrybeeLogo from "../../Assets/Companies/cb.png";
import pathaoLogo from "../../Assets/Companies/pathao2.png";
import redxLogo from "../../Assets/Companies/red.avif";
import steadfastLogo from "../../Assets/Companies/std2.png";

// interface Partner {
//   name: string;
//   logo: string;
// }

const defaultPartners = [
  { name: "Daraz", logo: darazLogo },
  { name: "CarryBee", logo: carrybeeLogo },
  { name: "Pathao", logo: pathaoLogo },
  { name: "RedX", logo: redxLogo },
  { name: "Steadfast", logo: steadfastLogo },
];

// interface PartneredWithProps {
//   title?: string;
//   partners?: Partner[];
//   className?: string;
// }

export const PartneredWith = ({ 
  title = "Trusted by Industry Leaders", 
  partners = defaultPartners,
  className = "" 
}) => {
  return (
    <section className={`w-full py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50 relative ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Modern Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <span>Partnerships</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-slate-700 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're proud to work with industry leaders who share our vision of making reading accessible to everyone.
          </p>
        </div>

        {/* Enhanced Logo Carousel */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray-50/5 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Container */}
          <div className="flex overflow-hidden">
            {/* First set of logos */}
            <div className="flex gap-12 animate-scroll-left min-w-max">
              {partners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 w-32 h-20 md:w-36 lg:w-40 flex items-center justify-center rounded-2xl shadow-sm grayscale hover:grayscale-0 opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-105 cursor-pointer group bg-transparent border-0"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="flex gap-12 animate-scroll-left min-w-max">
              {partners.map((partner, index) => (
                <div
                  key={`${partner.name}-duplicate-${index}`}
                  className="flex-shrink-0 w-32 h-20 md:w-36 lg:w-40 flex items-center justify-center rounded-2xl shadow-sm grayscale hover:grayscale-0 opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-105 cursor-pointer group bg-transparent border-0"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
            <div className="text-gray-600 text-sm">Partners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
            <div className="text-gray-600 text-sm">Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">99.9%</div>
            <div className="text-gray-600 text-sm">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
            <div className="text-gray-600 text-sm">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartneredWith;
