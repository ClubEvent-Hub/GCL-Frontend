import { Facebook, Linkedin, Twitter } from "lucide-react";
import React from "react";

const quickLinks = [
  { text: "Home" },
  { text: "Dashboard" },
  { text: "Clubs" },
  { text: "Events" },
];

const supportLinks = [
  { text: "Help Center" },
  { text: "Contact Us" },
  { text: "Privacy Policy" },
  { text: "Terms of Service" },
];

const socialIcons = [
  { Icon: Facebook, alt: "Facebook" },
  { Icon: Twitter, alt: "Twitter" },
  { Icon: Linkedin, alt: "LinkedIn" },
];

export const ClubLeadershipSection = () => {
  return (
    <footer className="w-full bg-slate-900 py-8">
      <div className="max-w-[1280px] mx-auto px-20">
        <div className="flex gap-6 mb-6">
          <div className="w-[497.59px] flex flex-col gap-[10.5px]">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-indigo-500 rounded-full">
                <span className="[font-family:'Roboto-Bold',Helvetica] font-bold text-white text-xs tracking-[0] leading-4">
                  GCL
                </span>
              </div>
              <span className="[font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-xs tracking-[0] leading-4 whitespace-nowrap">
                GDG Clubs Link
              </span>
            </div>
            <p className="w-[310.62px] [font-family:'Roboto-Regular',Helvetica] font-normal text-slate-400 text-[10px] tracking-[0] leading-4">
              Connecting university students with clubs and events in one
              seamless platform.
            </p>
          </div>

          <div className="w-[236.8px] flex flex-col gap-3">
            <h3 className="[font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-xs tracking-[0] leading-4 whitespace-nowrap">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="[font-family:'Roboto-Regular',Helvetica] font-normal text-slate-400 text-xs tracking-[0] leading-4 whitespace-nowrap hover:text-white transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>

          <div className="w-[236.8px] flex flex-col gap-3">
            <h3 className="[font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-xs tracking-[0] leading-4 whitespace-nowrap">
              Support
            </h3>
            <nav className="flex flex-col gap-2">
              {supportLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="[font-family:'Roboto-Regular',Helvetica] font-normal text-slate-400 text-xs tracking-[0] leading-4 whitespace-nowrap hover:text-white transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>

          <div className="w-[236.81px] flex flex-col gap-3">
            <h3 className="[font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-xs tracking-[0] leading-4 whitespace-nowrap">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, alt }, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label={alt}
                >
                  <Icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="[font-family:'Roboto-Regular',Helvetica] font-normal text-slate-500 text-[10px] tracking-[0] leading-4 whitespace-nowrap">
            © 2024 GCL — GDG Clubs Link. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ClubLeadershipSection;
