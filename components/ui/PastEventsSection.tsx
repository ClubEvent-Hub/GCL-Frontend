import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Heart, MapPin } from "lucide-react";
import React from "react";

const eventsData = [
  {
    image: "/vector.png",
    badgeText: "WorkShop",
    badgeColor: "bg-indigo-100 text-blue-600",
    title: "Web Development Workshop",
    date: "March 15, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Engineering Bldg, Room 301",
    description:
      "Learn modern web development with React and Tailwind CSS. Perfect for beginners!",
  },
  {
    image: "/image.png",
    badgeText: "Meetup",
    badgeColor: "bg-violet-100 text-violet-400",
    title: "UI/UX Design Meetup",
    date: "March 17, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Student Center, 3rd Floor",
    description:
      "Discuss the latest trends in user interface and experience design with industry experts.",
  },
  {
    image: "/vector-2.png",
    badgeText: "Meetup",
    badgeColor: "bg-orange-100 text-orange-500",
    title: "Career Networking Night",
    date: "March 25, 2024",
    time: "5:00 PM - 8:00 PM",
    location: "Business School Atrium",
    description:
      "Bring your resume for business cards and networking opportunities.",
  },
  {
    image: "/vector-3.png",
    badgeText: "Hacakthon",
    badgeColor: "bg-red-100 text-red-500",
    title: "24-Hour Hackathon",
    date: "March 29, 2024",
    time: "6:00 PM - 6:00 PM",
    location: "Innovation Science Building",
    description:
      "Build innovative solutions in 24 hours with prizes and mentorship.",
  },
];

export const PastEventsSection = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {eventsData.map((event, index) => (
          <Card key={index} className="bg-white rounded-lg shadow-sm border-0">
            <CardContent className="p-4 flex flex-col">
              <div
                className="w-full h-[163.19px] bg-cover bg-center rounded"
                style={{ backgroundImage: `url(${event.image})` }}
              />

            

              <h3 className="mt-1 [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-slate-900 text-sm leading-5">
                {event.title}
              </h3>

              <div className="mt-1 flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <Calendar className="w-[8.75px] h-2.5 text-slate-600" />
                  <span className="[font-family:'Roboto-Regular',Helvetica] font-normal text-slate-600 text-[10px] leading-[15px]">
                    {event.date}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-[9.69px] h-[9.69px] text-slate-600" />
                  <span className="[font-family:'Roboto-Regular',Helvetica] font-normal text-slate-600 text-[10px] leading-[15px]">
                    {event.time}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <MapPin className="w-[7.5px] h-2.5 text-slate-600" />
                  <span className="[font-family:'Roboto-Regular',Helvetica] font-normal text-slate-600 text-[10px] leading-[15px]">
                    {event.location}
                  </span>
                </div>
              </div>

              <p className="mt-2.5 [font-family:'Roboto-Regular',Helvetica] font-normal text-slate-600 text-[10px] leading-[15px]">
                {event.description}
              </p>

              <Button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded h-6 [font-family:'Roboto-Regular',Helvetica] font-normal text-xs">
                Register
              </Button>

              <div className="flex justify-end mt-2">
                <Heart className="w-[10.5px] h-3 text-slate-400 cursor-pointer hover:text-red-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PastEventsSection;
