"use client";

import React, { useEffect, useState } from "react";
import TimelineCard from "./TimelineCard";
import TimelineProgress from "./TimelineProgress";
import timelineData from "../../data/about.json";

const TimelineComponent = () => {
  const [data, setData] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    // Use timeline data from about.json
    const timelineItems = timelineData.timeline || [];

    // Validate that categories match the allowed types
    const validatedData = timelineItems.map((item) => {
      const category = ["work", "education", "freelance", "other"].includes(
        item.category
      )
        ? item.category
        : "other";

      return { ...item, category };
    });

    // Sort data from oldest to newest
    const sortedData = validatedData.sort((a, b) => {
      if (a.time && b.time) {
        const yearA = parseInt(a.time.split(" ")[1]);
        const yearB = parseInt(b.time.split(" ")[1]);
        return yearA - yearB;
      } else if (a.time && !b.time) {
        const yearA = parseInt(a.time.split(" ")[1]);
        const yearB = parseInt(b.year || "0");
        return yearA - yearB;
      } else if (b.time && !a.time) {
        const yearA = parseInt(a.year || "0");
        const yearB = parseInt(b.time.split(" ")[1]);
        return yearA - yearB;
      }

      const yearA = parseInt(a.year || "0");
      const yearB = parseInt(b.year || "0");
      return yearA - yearB;
    });

    setData(sortedData);
  }, []);

  if (!data.length) {
    return <div className="text-center py-10">Loading timeline data...</div>;
  }

  return (
    <div
      className="rn-contact-area rn-section-gap section-separator"
      id="timeline"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle">My Professional Journey</span>
              <h2 className="title">Timeline</h2>
              <p
                className="description"
                style={{
                  marginTop: "15px",
                  fontSize: "16px",
                  color: "#6c757d",
                }}
              >
                An interactive timeline showcasing my career milestones,
                education, and achievements across the years. Scroll down to
                explore my professional path.
              </p>
            </div>
          </div>
        </div>

        <div className="row mt--50 mt_md--40 mt_sm--40">
          <div className="col-lg-12">
            <div className="mt-8 animate-bounce text-center">
              <svg
                className="mx-auto text-blue-500 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>

            <div className="relative">
              {/* Career Start Indicator */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 z-20">
                <div
                  className="text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  style={{ backgroundColor: "#ff014f" }}
                >
                  Career Start
                </div>
              </div>

              <TimelineProgress />

              <div className="mx-auto relative pt-20 pb-20">
                {data.map((item, index) => {
                  const isActive = item.active === true;
                  const position = index % 2 === 0 ? "left" : "right";

                  return (
                    <div
                      key={item.id}
                      className="relative mb-16 flex items-center"
                    >

                      {/* Left side card - right-aligned to timeline, stretches leftward */}
                      {position === "left" && (
                        <div className="w-1/2 flex justify-end z-20">
                          <div className="w-full mr-12 flex justify-end">
                            <TimelineCard
                              item={item}
                              position={position}
                              isPast={!isActive}
                            />
                          </div>
                        </div>
                      )}

                      {/* Right side spacing for left cards */}
                      {position === "left" && <div className="w-1/2"></div>}

                      {/* Left side spacing for right cards */}
                      {position === "right" && <div className="w-1/2"></div>}

                      {/* Right side card - left-aligned to timeline, stretches rightward */}
                      {position === "right" && (
                        <div className="w-1/2 flex justify-start z-20">
                          <div className="w-full ml-12 flex justify-start">
                            <TimelineCard
                              item={item}
                              position={position}
                              isPast={!isActive}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Present Day Indicator */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 z-20">
                  <div
                    className="text-white px-6 py-3 rounded-full font-bold shadow-lg animate-pulse"
                    style={{ backgroundColor: "#ff014f" }}
                  >
                    Present
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
