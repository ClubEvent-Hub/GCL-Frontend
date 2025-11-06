import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code } from "lucide-react";
import React from "react";


export const ClubStatsSection = () => {
  return (
    <Card className="w-full bg-white rounded-[20px] shadow-[0px_4px_4px_#00000040]">
      <CardContent className="p-0">
        <div className="flex items-start gap-6 p-[30px]">
          <div className="flex-shrink-0 w-[193px] h-[179px] flex items-center justify-center">
            <Code className="w-32 h-32 text-gray-800" strokeWidth={1.5} />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="[font-family:'Inter-Bold',Helvetica] font-bold text-black text-[32px] tracking-[0] leading-[normal]">
                Tech Innovation Club
              </h2>
        
            </div>

            <p className="[font-family:'Inter-ExtraLight',Helvetica] font-extralight text-[#736c6c] text-xl tracking-[0] leading-[normal]">
              Empowering students to build , innovate , and shape the future
              through technology
            </p>

            <Button className="w-fit bg-[#2aff00] hover:bg-[#2aff00]/90 rounded-[20px] px-[35px] h-[60px]">
              <span className="[font-family:'Inter-Black',Helvetica] font-black text-white text-xl tracking-[0] leading-[normal]">
                Follow
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClubStatsSection;
