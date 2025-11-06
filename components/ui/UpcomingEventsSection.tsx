import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const UpcomingEventsSection = () => {
  return (
    <Card className="w-full bg-white rounded-[20px] shadow-[0px_4px_4px_#00000040]">
      <CardContent className="flex flex-col gap-[29px] p-0">
        <h2 className="ml-[76px] mt-[30px] [font-family:'Instrument_Sans-Bold',Helvetica] font-bold text-black text-[32px] tracking-[0] leading-[normal]">
          About the Club
        </h2>

        <p className="ml-[76px] mb-[30px] max-w-[502px] [font-family:'IBM_Plex_Sans_Hebrew-Light',Helvetica] font-light text-[#3f3e3e] text-xl tracking-[0] leading-[normal]">
          Welcome to the Tech Innovators Club! We are a community of passionate
          students dedicated to exploring the latest in technology, from
          software development and AI to hardware engineering and cybersecurity.
          Our mission is to provide a platform for learning, collaboration, and
          innovation. We host weekly workshops, guest speaker sessions with
          industry experts, and hackathons to help members build practical
          skills and create amazing projects. Whether you&#39;re a seasoned
          coder or just starting your tech journey, you&#39;ll find a welcoming
          and supportive environment here.
        </p>
      </CardContent>
    </Card>
  );
};

export default UpcomingEventsSection;
