"use client";

import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import GEO_DATA from "@/data/pakistan-provinces.json";

// d3-geo v3 (used by react-simple-maps v3) follows RFC 7946:
// exterior rings must be counterclockwise, holes must be clockwise.
// Many GeoJSON files (especially from ArcGIS/QGIS) use the opposite convention,
// causing d3 to interpret provinces as holes → renders as a filled box.
function ringArea(ring: number[][]) {
    let area = 0;
    for (let i = 0, len = ring.length, j = len - 1; i < len; j = i++) {
        area += (ring[j][0] - ring[i][0]) * (ring[j][1] + ring[i][1]);
    }
    return area;
}

function rewindRing(ring: number[][], clockwise: boolean) {
    const isClockwise = ringArea(ring) > 0;
    if (isClockwise !== clockwise) ring.reverse();
    return ring;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rewindGeoJSON(geojson: any) {
    const rewound = JSON.parse(JSON.stringify(geojson));
    for (const feature of rewound.features) {
        const { type, coordinates } = feature.geometry;
        if (type === "Polygon") {
            rewindRing(coordinates[0], false); // exterior → counterclockwise
            for (let i = 1; i < coordinates.length; i++) {
                rewindRing(coordinates[i], true); // holes → clockwise
            }
        } else if (type === "MultiPolygon") {
            for (const polygon of coordinates) {
                rewindRing(polygon[0], false);
                for (let i = 1; i < polygon.length; i++) {
                    rewindRing(polygon[i], true);
                }
            }
        }
    }
    return rewound;
}

type Achievement = {
    id: number;
    city: string;
    coordinates: [number, number];
    label: string;
};

const achievements: Achievement[] = [
    {
        id: 1,
        city: "Karachi",
        coordinates: [67.0104, 24.8608],
        label: "Ramadan Bachat Camp With Hammad Foundation",
    },
    {
        id: 2,
        city: "Lahore",
        coordinates: [74.3294, 31.5820],
        label: "Free Education Drive Lahore",
    },
    {
        id: 3,
        city: "Islamabad",
        coordinates: [73.0433, 33.7215],
        label: "Youth Leadership Program",
    },
    {
        id: 4,
        city: "Peshawar",
        coordinates: [71.5785, 34.0080],
        label: "Health Camp Peshawar",
    },
    {
        id: 5,
        city: "Quetta",
        coordinates: [67.0014, 30.1841],
        label: "Clean Water Initiative",
    },
    {
        id: 6,
        city: "Multan",
        coordinates: [71.4782, 30.1968],
        label: "Skills Development Workshop",
    },
    {
        id: 7,
        city: "Faisalabad",
        coordinates: [73.0897, 31.4155],
        label: "Community Health Drive",
    },
    {
        id: 8,
        city: "Rawalpindi",
        coordinates: [73.0479, 33.5973],
        label: "School Renovation Project",
    },
    {
        id: 9,
        city: "Gilgit",
        coordinates: [74.3083, 35.9208],
        label: "Mountain Communities Support",
    },
];

type GeoType = {
    rsmKey: string;
    [key: string]: unknown;
};

export default function AchievementsMap() {
    const [activeId, setActiveId] = useState<number | null>(null);
    const geoData = useMemo(() => rewindGeoJSON(GEO_DATA), []);

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-10 md:py-14 flex flex-col justify-center">
            <h2 className="text-gray-900 font-bold text-3xl md:text-4xl text-center">
                Achievements
            </h2>

            <div className="relative w-full overflow-hidden">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        center: [70, 30],
                        scale: 1900,
                    }}
                    width={1000}
                    height={600}
                    style={{ width: "100%", height: "auto", background: "transparent", filter: "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.12))", transform: "rotate(6deg)", overflow: "visible" }}
                >
                    {/* 3D Base Layer */}
                    <g transform="translate(-6, 18)">
                        <Geographies geography={geoData}>
                            {({ geographies }: { geographies: GeoType[] }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={`base-${geo.rsmKey}`}
                                        geography={geo}
                                        fill="#9ca3af" // Darker gray for 3D extrusion
                                        stroke="#9ca3af"
                                        strokeWidth={1}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { outline: "none" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                    </g>

                    {/* Top Map Layer */}
                    <Geographies geography={geoData}>
                        {({ geographies }: { geographies: GeoType[] }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#d1d5db"
                                    stroke="#ffffff"
                                    strokeWidth={1}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { outline: "none", fill: "#b8bdc8" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {[...achievements]
                        .sort((a, b) => (a.id === activeId ? 1 : b.id === activeId ? -1 : 0))
                        .map((a) => (
                            <Marker
                                key={a.id}
                                coordinates={a.coordinates}
                                onMouseEnter={() => setActiveId(a.id)}
                                onMouseLeave={() => setActiveId(null)}
                            >
                                <g transform="translate(-12, -28)" style={{ cursor: "pointer" }}>
                                    <path
                                        d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z"
                                        fill={a.id === activeId ? "#b91c1c" : "#ef4444"}
                                        stroke="#fff"
                                        strokeWidth="1"
                                    />
                                    <circle cx="12" cy="8" r="3" fill="#fff" />
                                </g>

                                {a.id === activeId && (
                                    <g transform="translate(-75, -105) rotate(-6, 75, 30)">
                                        <rect x="0" y="0" width="150" height="60" rx="10" ry="10" fill="#1a3a7c" />
                                        <polygon points="70,60 80,60 75,70" fill="#1a3a7c" />
                                        <foreignObject x="8" y="6" width="134" height="50">
                                            <div
                                                style={{
                                                    color: "white",
                                                    fontSize: "11px",
                                                    textAlign: "center",
                                                    lineHeight: "1.4",
                                                    fontFamily: "sans-serif",
                                                    fontWeight: "600",
                                                    padding: "2px",
                                                }}
                                            >
                                                {a.label}
                                            </div>
                                        </foreignObject>
                                    </g>
                                )}
                            </Marker>
                        ))}
                </ComposableMap>
            </div>
        </section>
    );
}