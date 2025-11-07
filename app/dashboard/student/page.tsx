"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

interface Event {
  id: number;
  name: string;
  club: string;
  date: string;
  time: string;
  location: string;
}

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await api.get("/events/");
        setEvents(res.data);
      } catch (error) {
        console.warn("⚠️ Backend unreachable — showing static examples.");
        setEvents([
          {
            id: 1,
            name: "AI Workshop Series",
            club: "Tech Innovation Club",
            date: "March 15, 2024",
            time: "2:00 PM",
            location: "Engineering Building",
          },
          {
            id: 2,
            name: "Sustainability Fair",
            club: "Environmental Club",
            date: "March 18, 2024",
            time: "10:00 AM",
            location: "Student Center",
          },
          {
            id: 3,
            name: "Art Exhibition Opening",
            club: "Creative Arts Society",
            date: "March 22, 2024",
            time: "6:00 PM",
            location: "Arts Building",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-wrap justify-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
            <div>
              <div className="text-xl font-semibold text-gray-900 leading-none">12</div>
              <div className="text-gray-500 text-sm">Events Attended</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <div>
              <div className="text-xl font-semibold text-gray-900 leading-none">5</div>
              <div className="text-gray-500 text-sm">Clubs Joined</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
            <div>
              <div className="text-xl font-semibold text-gray-900 leading-none">
                {events.length}
              </div>
              <div className="text-gray-500 text-sm">Upcoming Events</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h1>

              {loading ? (
                <p className="text-gray-500">Loading events...</p>
              ) : (
                <div className="space-y-6">
                  {events.map((event: Event) => (
                    <div key={event.id}>
                      <h2 className="text-lg font-semibold mb-2 text-gray-800">{event.name}</h2>
                      <div className="space-y-1 text-gray-600">
                        <div className="text-sm">{event.club}</div>
                        <div className="text-sm">{event.date}</div>
                        <div className="text-sm">{event.time}</div>
                        <div className="text-sm">{event.location}</div>
                      </div>
                      <div className="border-t border-gray-200 my-4"></div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">AI Workshop reminder</div>
                    <div className="text-gray-600 text-xs">Event starts in 2 days</div>
                    <div className="text-gray-400 text-xs">3 hours ago</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-2"></div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">
                      New event from Environmental Club
                    </div>
                    <div className="text-gray-600 text-xs">Beach Cleanup this weekend</div>
                    <div className="text-gray-400 text-xs">8 hours ago</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-2"></div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">Certificate available</div>
                    <div className="text-gray-600 text-xs">
                      Download your Python workshop certificate
                    </div>
                    <div className="text-gray-400 text-xs">1 day ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">November 2025</h2>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <div key={day} className="font-semibold text-gray-600 py-2 text-sm">
                    {day}
                  </div>
                ))}

                {[
                  [27, 28, 29, 30, 31, 1, 2],
                  [3, 4, 5, 6, 7, 8, 9],
                  [10, 11, 12, 13, 14, 15, 16],
                  [17, 18, 19, 20, 21, 22, 23],
                  [24, 25, 26, 27, 28, 29, 30],
                ].map((week, i) =>
                  week.map((d, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`py-2 text-sm ${
                        d >= 1 && d <= 30 ? "text-gray-800" : "text-gray-400"
                      } ${d >= 24 && d <= 30 ? "font-semibold" : ""}`}
                    >
                      {d}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
