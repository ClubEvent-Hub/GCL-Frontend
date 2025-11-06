import React from "react";
import ClubHeaderSection from "@/components/ui/ClubHeaderSection";
import ClubStatsSection from "@/components/ui/ClubStatsSection";
import UpcomingEventsSection from "@/components/ui/UpcomingEventsSection";
import PastEventsSection from "@/components/ui/PastEventsSection";
import AboutClubSection from "@/components/ui/AboutClubSection";
import ClubLeadershipSection from "@/components/ui/ClubLeadershipSection";

const ClubPage = () => {
  return (
    <div className="bg-[#f8f9fb] overflow-x-hidden w-full min-w-[1440px] relative">
      <ClubHeaderSection />
      <ClubStatsSection />
      <UpcomingEventsSection />
      <PastEventsSection />
      <AboutClubSection />
      <ClubLeadershipSection />
    </div>
  );
};

export default ClubPage;
