// interface Partner {
//   name: string;
//   logo: string;
// }

const defaultPartners = [
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png" },
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
    <section className={`w-full py-16 px-4 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Animated Heading */}
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(262,83%,58%)] via-[hsl(217,91%,60%)] to-[hsl(173,80%,50%)] bg-[length:200%_auto] animate-gradient-shift"
          style={{
            backgroundImage: 'var(--gradient-text)',
          }}
        >
          {title}
        </h2>

        {/* Logo Carousel */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Container */}
          <div className="flex overflow-hidden whitespace-nowrap">
            {/* First set of logos */}
            <div className="flex gap-12 animate-scroll-left">
              {partners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 w-40 h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="flex gap-12 animate-scroll-left">
              {partners.map((partner, index) => (
                <div
                  key={`${partner.name}-duplicate-${index}`}
                  className="flex-shrink-0 w-40 h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hover Hint */}
        <p className="text-center mt-8 text-muted-foreground text-sm">
          Hover over logos to see them in full color
        </p>
      </div>
    </section>
  );
};

export default PartneredWith;
