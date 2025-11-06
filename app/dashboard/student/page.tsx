"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
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
                            <div className="text-xl font-semibold text-gray-900 leading-none">3</div>
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
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold mb-2 text-gray-800">AI Workshop Series</h2>
                                    <div className="space-y-1 text-gray-600">
                                        <div className="text-sm">Tech Innovation Club</div>
                                        <div className="text-sm">March 15, 2024</div>
                                        <div className="text-sm">2:00 PM</div>
                                        <div className="text-sm">Engineering Building</div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 my-4"></div>

                                <div>
                                    <h2 className="text-lg font-semibold mb-2 text-gray-800">Sustainability Fair</h2>
                                    <div className="space-y-1 text-gray-600">
                                        <div className="text-sm">Environmental Club</div>
                                        <div className="text-sm">March 18, 2024</div>
                                        <div className="text-sm">10:00 AM</div>
                                        <div className="text-sm">Student Center</div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 my-4"></div>

                                <div>
                                    <h2 className="text-lg font-semibold mb-2 text-gray-800">Art Exhibition Opening</h2>
                                    <div className="space-y-1 text-gray-600">
                                        <div className="text-sm">Creative Arts Society</div>
                                        <div className="text-sm">March 22, 2024</div>
                                        <div className="text-sm">6:00 PM</div>
                                        <div className="text-sm">Arts Building</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg border border-gray-200">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Notifications</h2>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div>
                                            <div className="font-semibold text-gray-800 text-sm">AI Workshop reminder</div>
                                            <div className="text-gray-600 text-xs">Event starts in 2 days</div>
                                            <div className="text-gray-400 text-xs">3 hours ago</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 my-2"></div>

                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div>
                                            <div className="font-semibold text-gray-800 text-sm">New event from Environmental Club</div>
                                            <div className="text-gray-600 text-xs">Beach Cleanup this weekend</div>
                                            <div className="text-gray-400 text-xs">8 hours ago</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 my-2"></div>

                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                        <div>
                                            <div className="font-semibold text-gray-800 text-sm">Certificate available</div>
                                            <div className="text-gray-600 text-xs">Download your Python workshop certificate</div>
                                            <div className="text-gray-400 text-xs">1 day ago</div>
                                        </div>
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

                                {[ [27, 28, 29, 30, 31, 1, 2], [3, 4, 5, 6, 7, 8, 9], [10, 11, 12, 13, 14, 15, 16], [17, 18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29, 30] ].map((week, i) =>
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