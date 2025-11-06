import { Button } from "@/components/ui/button";
import React from "react";

const navigationItems = [
  { label: "Home", width: "w-[41px]" },
  { label: "Dashboard", width: "w-[73px]" },
  { label: "Clubs", width: "w-[38px]" },
  { label: "Events", width: "w-[45px]" },
];

const logoTextSegments = [
  { text: "GDG", color: "text-blue-600" },
  { text: " ", color: "text-slate-900" },
  { text: "Clubs", color: "text-[#ff0000]" },
  { text: " ", color: "text-slate-900" },
  { text: "Link", color: "text-[#00bf63]" },
];

export default function ClubHeaderSection() {
  return (
    <header className="w-full h-16 bg-[#d9e4f9] rounded-sm shadow-[0px_4px_4px_#00000040]">
      <div className="relative w-full h-full">
        <div className="absolute top-[11px] left-8 flex items-center gap-[13.8px] bg-white rounded-[10.5px] w-[193px] h-[42px]">
          <div className="ml-[6.5px] mt-[2.6px] w-[37.39px] h-[37.39px]">
            <img src="" alt="GDG Logo" className="w-full h-full" />
          </div>
          <div className="mt-[7.9px] w-32 h-[27px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[18.4px] tracking-[0] leading-[26.2px] whitespace-nowrap">
            {logoTextSegments.map((segment, index) => (
              <span key={index} className={segment.color}>
                {segment.text}
              </span>
            ))}
          </div>
        </div>

        <nav className="absolute top-[22px] left-[calc(50.00%_-_143px)] flex items-center gap-[29px] h-5">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className={`${item.width} h-5 [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-5 whitespace-nowrap hover:opacity-70 transition-opacity`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Button className="absolute top-5 left-[1345px] h-auto px-3 py-1 rounded shadow-[0px_4px_4px_#00000040] bg-[linear-gradient(263deg,rgba(255,0,0,1)_0%,rgba(0,191,99,1)_100%)] hover:opacity-90">
          <span className="[font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-xs tracking-[0] leading-4 whitespace-nowrap">
            Log out
          </span>
        </Button>
      </div>
    </header>
  );
}
