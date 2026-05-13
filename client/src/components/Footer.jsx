import assets, { footerLinks } from "../assets/assets";

const Footer = () => {

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-[#a8e6cf] text-gray-800">
            
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-300/40">
                
                {/* Logo & Description */}
                <div>
                    <img className="w-34 md:w-32" src={assets.logo} alt="Logo" />
                    <p className="max-w-[410px] mt-6 text-gray-800/90">
                        At PrebuiltUI, we craft seamless web experiences with modern design and intuitive functionality. Stay connected with our latest updates and offerings.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base md:mb-5 mb-2 text-gray-900">
                                {section.title}
                            </h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link.url}
                                            className="hover:underline hover:text-[#44ae7c] transition-colors"
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>

            {/* Bottom Copyright */}
            <p className="py-4 text-center text-sm md:text-base text-gray-700/80">
                Copyright 2026 © <a href="https://prebuiltui.com" className="hover:underline">GreenCart</a>. All Rights Reserved.
            </p>

        </div>
    );
};

export default Footer;
