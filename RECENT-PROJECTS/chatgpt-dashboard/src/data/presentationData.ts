import type { PlatformRow, Meeting, Participant } from '../types';

// Helper to create rows
const createSegmentRows = (
    segment: string,
    totalEnabled: number,
    totalActive: number,
    totalMessages: number
): PlatformRow[] => {
    const rows: PlatformRow[] = [];

    // Distribute messages among active users
    // We start with floor average, then distribute remainder
    const baseMsg = totalActive > 0 ? Math.floor(totalMessages / totalActive) : 0;
    let remainder = totalActive > 0 ? totalMessages % totalActive : 0;

    for (let i = 0; i < totalEnabled; i++) {
        const isActive = i < totalActive;
        let msgCount = 0;

        if (isActive) {
            msgCount = baseMsg;
            if (remainder > 0) {
                msgCount += 1;
                remainder--;
            }
        }

        rows.push({
            email: `user${i}@${segment.replace(/\s/g, '').toLowerCase()}.com`,
            userStatus: 'enabled',
            isActive: isActive,
            messages: msgCount,
            toolsMessaged: 0,
            gptsMessaged: 0,
            projectsMessaged: 0,
            projectsCreated: 0,
            businessSegment: segment,
            organization: segment + " Org",
            parentOrg: "NBCUniversal",
            bu: "General",
            jobFunction: "Employee",
            jobTitle: "Staff"
        });
    }
    return rows;
};

// 1. Generate Base Segments
const segments = [
    { name: "News Group HQ", enabled: 210, active: 182, msgs: 15084 },
    { name: "NBCUniversal Local", enabled: 174, active: 137, msgs: 11813 },
    { name: "Telemundo Enterprises", enabled: 169, active: 150, msgs: 19712 },
    { name: "NBC Editorial", enabled: 135, active: 106, msgs: 7027 },
    { name: "Today/Lifestyle", enabled: 2, active: 1, msgs: 11 },
];

let generatedRows: PlatformRow[] = [];
segments.forEach(s => {
    generatedRows = [...generatedRows, ...createSegmentRows(s.name, s.enabled, s.active, s.msgs)];
});

// 2. Distribute Feature Adoption
const assignFeature = (count: number, field: keyof PlatformRow) => {
    let assigned = 0;
    const shuffledIndices = Array.from({ length: generatedRows.length }, (_, i) => i)
        .sort(() => 0.5 - Math.random());

    for (let i of shuffledIndices) {
        if (assigned >= count) break;
        // @ts-ignore
        generatedRows[i][field] = 1;
        assigned++;
    }
};

assignFeature(500, 'toolsMessaged');
assignFeature(106, 'gptsMessaged');
assignFeature(101, 'projectsMessaged');
assignFeature(58, 'projectsCreated');

export const PRELOADED_PLATFORM_DATA = generatedRows;

// Helper to fill participants
const createDummyParticipants = (
    baseParticipants: Partial<Participant>[],
    countNeeded: number
): Participant[] => {
    const result: Participant[] = [];

    // Mix 1: Add Base Participants (Real samples)
    baseParticipants.forEach((p, i) => {
        result.push({
            firstName: p.firstName || "User",
            lastName: p.lastName || String(i + 1),
            email: p.email || `user${i}@nbc.com`,
            regTime: "2026-01-01T10:00:00",
            status: "Registered",
            department: p.department || "General",
            jobTitle: p.jobTitle || "Employee",
            question: p.question || "",
            sourceFile: "Preloaded"
        });
    });

    // Mix 2: Fill the rest with dummies
    const titles = ["Producer", "Editor", "Analyst", "Manager", "Director", "Coordinator", "Specialist"];
    const depts = ["News", "Sports", "Ent", "Corp", "Tech", "Legal", "Ad Sales"];

    for (let i = result.length; i < countNeeded; i++) {
        result.push({
            firstName: "Participant",
            lastName: String(i + 1),
            email: `participant${i}@nbc.com`,
            regTime: "2026-01-01T10:00:00",
            status: "Registered",
            department: depts[i % depts.length],
            jobTitle: titles[i % titles.length],
            question: "", // No question for filler
            sourceFile: "Preloaded"
        });
    }

    return result;
}

// 3. Office Hours Data
export const PRELOADED_MEETINGS: Meeting[] = [
    {
        id: "dec-10-meet",
        title: "Office Hours - Dec 10: Prompt Engineering Basics",
        dateStr: "2025-12-10",
        dateObj: new Date("2025-12-10"),
        pageViews: 5,
        registered: 3,
        canceled: 0,
        conversionRate: 60.0,
        sourceFile: "Preloaded",
        participants: createDummyParticipants([
            { department: "News", jobTitle: "Editor", question: "How to prompt for summaries?" }
        ], 3)
    },
    {
        id: "jan-21-meet",
        title: "Office Hours - Jan 21: Advanced Workflows",
        dateStr: "2026-01-21",
        dateObj: new Date("2026-01-21"),
        pageViews: 10,
        registered: 5,
        canceled: 0,
        conversionRate: 50.0,
        sourceFile: "Preloaded",
        participants: createDummyParticipants([
            { department: "Local", jobTitle: "Producer", question: "Is Copilot better?" },
            { department: "Telemundo", jobTitle: "Marketing", question: "Image generation rights?" }
        ], 5)
    },
    {
        id: "jan-27-meet",
        title: "Office Hours - Jan 27: Data Analysis",
        dateStr: "2026-01-27",
        dateObj: new Date("2026-01-27"),
        pageViews: 15,
        registered: 10,
        canceled: 0,
        conversionRate: 66.7,
        sourceFile: "Preloaded",
        participants: createDummyParticipants([
            { department: "Legal", jobTitle: "Counsel", question: "Governance on uploads?" },
            { department: "Editorial", jobTitle: "Writer", question: "Can it write in Spanish?" }
        ], 10)
    },
    {
        id: "feb-4-meet",
        title: "Office Hours - Feb 4: New Features",
        dateStr: "2026-02-04",
        dateObj: new Date("2026-02-04"),
        pageViews: 9,
        registered: 7,
        canceled: 0,
        conversionRate: 77.8,
        sourceFile: "Preloaded",
        participants: createDummyParticipants([
            { department: "Corp", jobTitle: "Analyst", question: "Measurement ROI?" }
        ], 7)
    }
];
