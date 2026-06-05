"use client";

import { useEffect, useState } from "react";
import { fetchAnnualReports } from "@/lib/firestore-actions";
import { AnnualReport } from "@/types/database";

const REPORTS: AnnualReport[] = [
    {
        id: "1",
        title: "Annual Report 2022",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,",
        image: "/publications/pub1.png",
        viewUrl: "#",
        downloadUrl: "#",
        order: 1
    },
    {
        id: "2",
        title: "Annual Report 2021",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,",
        image: "/publications/pub1.png",
        viewUrl: "#",
        downloadUrl: "#",
        order: 2
    },
    {
        id: "3",
        title: "Annual Report 2020",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,",
        image: "/publications/pub1.png",
        viewUrl: "#",
        downloadUrl: "#",
        order: 3
    },
];

function ReportCard({ report }: { report: AnnualReport }) {
    return (
        <div className="w-full bg-white rounded-2xl shadow-xl flex flex-col min-[500px]:flex-row overflow-hidden h-auto min-[500px]:h-[350px] items-center md:p-6 p-4 gap-4 min-[500px]:gap-0">
            {/* Image */}
            <div className="w-full min-[500px]:w-[200px] sm:min-[500px]:w-[250px] md:min-[500px]:w-[430px] shrink-0 h-[220px] min-[500px]:h-[300px]">
                <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pl-0 min-[500px]:pl-5 py-2 min-[500px]:py-5 flex flex-col h-full justify-center w-full">
                <h2 className="text-xl lg:text-4xl font-bold text-black leading-snug">
                    {report.title}
                </h2>

                <p className="mt-2 text-gray-500 text-sm md:text-xs lg:text-base leading-relaxed">
                    {report.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-5 flex-col md:flex-row w-full ">
                    {/* View */}
                    <a
                        href={report.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                        w-full
                        min-[830px]:w-[350px] h-[42px] rounded-full text-white font-semibold text-sm flex items-center justify-center hover:opacity-90 transition-opacity "
                        style={{
                            background: "linear-gradient(90deg, #0C2D63 0%, #1560C0 100%)",
                        }}
                    >
                        View
                    </a>

                    {/* Download */}
                    <a
                        href={report.downloadUrl}
                        download
                        className=" w-full min-[830px]:w-[350px]  h-[42px] rounded-full border border-gray-300 text-gray-700 font-medium text-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        Download
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function AnnualReports() {
    const [reports, setReports] = useState<AnnualReport[]>(REPORTS);

    useEffect(() => {
        let active = true;
        const loadReports = async () => {
            const data = await fetchAnnualReports();
            if (active && data && data.length > 0) {
                setReports(data);
            }
        };
        loadReports();
        return () => {
            active = false;
        };
    }, []);

    return (
        <section id="annual-reports" className="w-full px-4 sm:px-8 lg:px-14 py-12">
            {/* Heading */}
            <div className="mb-8 border-b border-gray-300 pb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-black">
                    Annual Reports
                </h1>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-5">
                {reports.map((report) => (
                    <ReportCard key={report.id || report.title} report={report} />
                ))}
            </div>
        </section>
    );
}