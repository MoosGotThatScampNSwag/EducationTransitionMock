import React from 'react';
import { LuBrainCircuit, } from 'react-icons/lu';
import { FaChalkboardTeacher, FaWpforms, FaMoneyBillWave, FaMapMarkedAlt, FaGraduationCap, FaHandsHelping, FaLightbulb, } from 'react-icons/fa';
import { FaSailboat, } from 'react-icons/fa6';
import { MdFamilyRestroom, MdOutlinePolicy, MdChecklist,  } from "react-icons/md";

// --------------------------
// Configuration / constants
// --------------------------
const WIDTH = 672;                // keeps SVG viewBox & layout aligned with tailwind's max-w-2xl (672px)
const STEP = 120;                 // vertical spacing between items
const CENTER_X = WIDTH / 2;
const CURVE_OFFSET = 220;         // how far the loop reaches left/right from the centre
const BUBBLE_SIZE = 80;           // diameter of the icon bubble
const LABEL_WIDTH = 300;          // width of the text label box
const TOP_PADDING = 20;           // small top offset so the path doesn't start flush with the top

const items = [
    { label: "Curriculum & Qualifications", icon: <FaChalkboardTeacher />, side: "left" },
    { label: "Admissions & Enrollment", icon: <FaWpforms />, side: "right" },
    { label: "SEN/ASN/ALN", icon: <LuBrainCircuit />, side: "left" },
    { label: "Funding & Entitlements", icon: <FaMoneyBillWave />, side: "right" },
    { label: "Exams & Key Transition Points", icon: <FaMapMarkedAlt />, side: "left" },
    { label: "Higher & Further Education Pathways", icon: <FaGraduationCap />, side: "right" },
    { label: "Wellbeing & Pastoral Support", icon: <FaHandsHelping />, side: "left" },
    { label: "Overseas Specific Considerations", icon: <FaSailboat />, side: "right" },
    { label: "Parental Engagement & Commnuication", icon: <MdFamilyRestroom />, side: "left" },
    { label: "Policy & Govornence", icon: <MdOutlinePolicy />, side: "right" },
    { label: "Top Tips", icon: <FaLightbulb />, side: "left" },
    { label: "Checklists", icon: <MdChecklist />, side: "right" },
];

// Generates path and anchors
function generatePathAndAnchors(items) {
    let path = `M ${CENTER_X} ${TOP_PADDING}`;
    let anchors = [];
    let currentY = TOP_PADDING;

    items.forEach((item, i) => {
        const topY = i * STEP + TOP_PADDING;
        const anchorY = topY + STEP / 2;
        const anchorX = CENTER_X + (item.side === 'left' ? -CURVE_OFFSET : CURVE_OFFSET);

        const cp1x = CENTER_X;
        const cp1y = currentY + STEP * 0.25;
        const cp2x = anchorX;
        const cp2y = anchorY - STEP * 0.25;
        path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${anchorX} ${anchorY}`;

        const endY = topY + STEP;
        const cp3x = anchorX;
        const cp3y = anchorY + STEP * 0.25;
        const cp4x = CENTER_X;
        const cp4y = endY - STEP * 0.25;
        path += ` C ${cp3x} ${cp3y} ${cp4x} ${cp4y} ${CENTER_X} ${endY}`;

        anchors.push({ x: anchorX, y: anchorY });
        currentY = endY;
    });

    const height = items.length * STEP + TOP_PADDING * 2;
    return { path, anchors, height };
}

// Road component
const TimelinePath = ({ d, height }) => (
    <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute top-0 left-0 w-full h-auto"
    >
        {/* Road border */}
        <path d={d} fill="none" stroke="#111827" strokeWidth={36} strokeLinecap="round" strokeLinejoin="round" />
        {/* Road surface */}
        <path d={d} fill="none" stroke="#3f4b5b" strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" />
        {/* Dashed centre line */}
        <path d={d} fill="none" stroke="#fde047" strokeWidth={6} strokeLinecap="round" strokeDasharray="18 14" strokeDashoffset="8" />
    </svg>
);


export default function App() {
    const { path, anchors, height } = generatePathAndAnchors(items);

    return (
        <div className="flex min-h-auto items-center justify-center bg-gradient-to-br from-[#4ab7e0] to-[#0d173b] py-12 px-4">
            <div className="rounded-lg shadow-xl" style={{ width: `${WIDTH}px` }}>
                <div className="p-6 rounded-t-lg">
                    <h1 className="text-3xl font-bold text-yellow-300 text-center">Education Transitions</h1>
                    <p className="text-sm text-slate-200/80 text-center mt-2">Learn how you can get help</p>
                </div>

                {/* Canvas */}
                <div className="relative bg-transparent max-w-full" style={{ height: `${height}px` }}>
                    {/* Road background */}
                    <TimelinePath d={path} height={height} />

                    {/* Desktop layout (positioned along the road) */}
                    <div className="hidden md:block">
                        {anchors.map((a, i) => {
                            const item = items[i];
                            const bubbleLeft = a.x - BUBBLE_SIZE / 2;
                            const bubbleTop = a.y - BUBBLE_SIZE / 2;
                            const labelLeft =
                                item.side === 'left'
                                    ? bubbleLeft - LABEL_WIDTH - 12
                                    : bubbleLeft + BUBBLE_SIZE + 12;
                            const labelTop = bubbleTop + (BUBBLE_SIZE - 36) / 2;

                            return (
                                <React.Fragment key={i}>
                                    <div
                                        style={{ position: 'absolute', left: bubbleLeft, top: bubbleTop, width: BUBBLE_SIZE, height: BUBBLE_SIZE }}
                                        className="flex items-center justify-center rounded-full border-2 border-[#c2c19f] bg-[#84ac64] text-3xl text-[#2d6668] shadow-lg hover:bg-[#9cc77c] transition-colors hover:scale-105 hover:shadow-2xl transition-transform"
                                    >
                                        {item.icon}
                                    </div>
                                    <div
                                        style={{ position: 'absolute', left: labelLeft, top: labelTop, width: LABEL_WIDTH }}
                                        className="flex items-center px-4 py-2 border-2 border-[#c2c19f] bg-[#84ac64] text-[#2d6668] rounded-lg shadow hover:bg-[#9cc77c] transition-colors hover:scale-105 hover:shadow-2xl transition-transform"
                                    >
                                        <span className="font-semibold text-lg">{item.label}</span>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Mobile layout (stacked column, no bubbles) */}
                    <div className="flex flex-col gap-6 items-center md:hidden relative z-10 pt-8">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="w-[85%] max-w-sm px-4 py-2 border-2 border-[#c2c19f] bg-[#84ac64] text-[#2d6668] rounded-md shadow hover:bg-[#9cc77c] transition-colors hover:scale-105 hover:shadow-2xl transition-transform"
                            >
                                <span className="font-semibold">{item.label}</span>
                            </div>
                        ))}
                    </div>

                </div>


                <div className="p-3 rounded-b-lg text-center">
                    <p className="text-xs text-yellow-200/70">Press Ctrl & click on the terms for further information.</p>
                </div>
            </div>
        </div>
    );
}