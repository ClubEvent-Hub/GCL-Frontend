import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import React from "react";

const pastEventsData = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description:
      "Intensive 3-day bootcamp covering HTML , CSS , JavaScript , and React",
    date: "April 10-12, 2025",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    description:
      "Intensive 3-day bootcamp covering HTML , CSS , JavaScript , and React",
    date: "April 10-12, 2025",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description:
      "Intensive 3-day bootcamp covering HTML , CSS , JavaScript , and React",
    date: "April 10-12, 2025",
  },
];

export default function AboutClubSection() {
  return (
    <section className="w-full flex flex-col bg-white rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] p-8">
      <h2 className="[font-family:'Instrument_Sans-Bold',Helvetica] font-bold text-slate-900 text-[32px] tracking-[0] leading-5 mb-8">
        Past Events
      </h2>

      <div className="flex flex-col gap-[15px]">
        {pastEventsData.map((event) => (
          <Card
            key={event.id}
            className="bg-[#f7f7f7] border-0 rounded-[15px] overflow-hidden shadow-none"
          >
            <CardContent className="p-0 h-[75px] relative">
              <div className="flex items-start gap-3 p-2">
                <img
                  className="w-[74px] h-16 object-cover rounded flex-shrink-0"
                  alt="Event thumbnail"
                  src="https://images.unsplash.com/photo-1522071820081-009f5f766de8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                />

                <div className="flex flex-col gap-1 flex-1 pt-[3px]">
                  <h3 className="[font-family:'Instrument_Sans-Bold',Helvetica] font-bold text-black leading-4 text-sm tracking-[0]">
                    {event.title}
                  </h3>

                  <p className="[font-family:'Instrument_Sans-Regular',Helvetica] font-normal text-[#4d4b4b] text-xs tracking-[0] leading-4">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-2 mt-auto">
                    <Calendar className="w-[21px] h-5 text-[#4e4b4b]" />
                    <span className="[font-family:'Instrument_Sans-Regular',Helvetica] font-normal text-[#4e4b4b] text-[10px] tracking-[0] leading-4">
                      {event.date}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
