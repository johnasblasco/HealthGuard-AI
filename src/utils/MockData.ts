import type {
    // Symptom,
    // HealthReport,
    Location,
    HotspotData,
    PredictionData,
    BayesianParameter,
    RiskScore,
    SuggestedAction,
    DashboardStats
} from '../types';

// Available symptoms
// export const SYMPTOMS: Symptom[] = [
//     { id: 'fever', name: 'Fever', category: 'general', icon: 'Thermometer' },
//     { id: 'cough', name: 'Cough', category: 'respiratory', icon: 'Wind' },
//     { id: 'sore-throat', name: 'Sore Throat', category: 'respiratory', icon: 'Throat' },
//     { id: 'headache', name: 'Headache', category: 'general', icon: 'Brain' },
//     { id: 'fatigue', name: 'Fatigue', category: 'general', icon: 'Battery' },
//     { id: 'runny-nose', name: 'Runny Nose', category: 'respiratory', icon: 'Droplet' },
//     { id: 'nausea', name: 'Nausea', category: 'digestive', icon: 'CircleAlert' },
//     { id: 'vomiting', name: 'Vomiting', category: 'digestive', icon: 'AlertCircle' },
//     { id: 'diarrhea', name: 'Diarrhea', category: 'digestive', icon: 'Activity' },
//     { id: 'body-ache', name: 'Body Ache', category: 'general', icon: 'Zap' },
//     { id: 'chills', name: 'Chills', category: 'general', icon: 'Snowflake' },
//     { id: 'loss-of-taste', name: 'Loss of Taste/Smell', category: 'other', icon: 'Nose' },
// ];

// School locations (FIXED UUIDs)
export const LOCATIONS: Location[] = [
    {
        building: "Main Building",
        rooms: [
            {
                name: "101",
                seats: [
                    { number: "A1", id: "67fec0af-ffa7-4532-a580-b6ead9c1f193" },
                    { number: "A2", id: "c5b1f8e9-4aee-4b2f-8d6a-123456789abc" },
                    { number: "A3", id: "d4a5b6c7-89ef-4567-1234-abcdef123456" },
                ],
            },
            {
                name: "102",
                seats: [
                    // was: e5f6g7h8-9i0j-1234-klmn-567890abcdef (INVALID)
                    { number: "B1", id: "e5f607a8-9a0b-1234-abcd-567890abcdef" },

                    { number: "B2", id: "f1a2b3c4-d5e6-7890-abcd-ef1234567890" },
                ],
            },
            {
                name: "103",
                seats: [
                    { number: "C1", id: "a1b2c3d4-e5f6-7890-abcd-1234567890ef" },

                    // was: b1c2d3e4-f5g6-7890-abcd-0987654321ab (INVALID)
                    { number: "C2", id: "b1c2d3e4-f5a6-7890-abcd-0987654321ab" },
                ],
            },
        ],
    },
    {
        building: "Science Building",
        rooms: [
            {
                name: "Lab-1",
                seats: [
                    { number: "A1", id: "c1d2e3f4-5678-90ab-cdef-1234567890ab" },

                    // was: d1e2f3g4-5678-90ab-cdef-0987654321cd (INVALID)
                    { number: "A2", id: "d1e2f3a4-5678-90ab-cdef-0987654321cd" },
                ],
            },
            {
                name: "Lab-2",
                seats: [
                    // was: e1f2g3h4-5678-90ab-cdef-112233445566 (INVALID)
                    { number: "B1", id: "e1f2a3b4-5678-90ab-cdef-112233445566" },
                ],
            },
        ],
    },
    {
        building: "Arts Building",
        rooms: [
            {
                name: "401",
                seats: [
                    // was: f1g2h3i4-5678-90ab-cdef-556677889900 (INVALID)
                    { number: "E1", id: "f1a2b3c4-5678-90ab-cdef-556677889900" },

                    // was: g1h2i3j4-5678-90ab-cdef-998877665544 (INVALID)
                    { number: "E2", id: "a1b2c3d4-5678-90ab-cdef-998877665544" },
                ],
            },
        ],
    },
];



// Mock health reports
// export const MOCK_REPORTS: HealthReport[] = [
//     {
//         id: 'rep-001',
//         userId: 'student-001',
//         userGradeLevel: 'Grade 10',
//         symptoms: ['fever', 'cough', 'headache'],
//         severity: 'moderate',
//         dateOfOnset: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
//         confirmedDisease: true,
//         diseaseName: 'Influenza',
//         location: { building: 'Main Building', room: '201', seatNumber: 'A12' },
//         timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
//         status: 'reviewed',
//     },
//     {
//         id: 'rep-002',
//         userId: 'student-002',
//         userGradeLevel: 'Grade 10',
//         symptoms: ['fever', 'cough', 'sore-throat'],
//         severity: 'moderate',
//         dateOfOnset: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
//         confirmedDisease: false,
//         location: { building: 'Main Building', room: '201', seatNumber: 'B15' },
//         timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
//         status: 'reviewed',
//     },
//     {
//         id: 'rep-003',
//         userId: 'student-003',
//         userGradeLevel: 'Grade 9',
//         symptoms: ['cough', 'runny-nose'],
//         severity: 'mild',
//         dateOfOnset: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
//         confirmedDisease: false,
//         location: { building: 'Science Building', room: 'Lab-1', seatNumber: 'C3' },
//         timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
//         status: 'pending',
//     },
//     {
//         id: 'rep-004',
//         userId: 'student-004',
//         userGradeLevel: 'Grade 11',
//         symptoms: ['fever', 'body-ache', 'chills'],
//         severity: 'severe',
//         dateOfOnset: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
//         confirmedDisease: false,
//         location: { building: 'Main Building', room: '201', seatNumber: 'D8' },
//         timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
//         status: 'pending',
//     },
//     {
//         id: 'rep-005',
//         userId: 'student-005',
//         userGradeLevel: 'Grade 12',
//         symptoms: ['nausea', 'vomiting', 'diarrhea'],
//         severity: 'moderate',
//         dateOfOnset: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
//         confirmedDisease: false,
//         location: { building: 'Arts Building', room: '401', seatNumber: 'E2' },
//         timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
//         status: 'pending',
//     },
// ];

// Mock hotspot data
export const MOCK_HOTSPOTS: HotspotData[] = [
    {
        building: 'Main Building',
        room: '201',
        reportCount: 3,
        riskLevel: 'high',
        lastUpdated: new Date().toISOString(),
    },
    {
        building: 'Science Building',
        room: 'Lab-1',
        reportCount: 1,
        riskLevel: 'medium',
        lastUpdated: new Date().toISOString(),
    },
    {
        building: 'Arts Building',
        room: '401',
        reportCount: 1,
        riskLevel: 'medium',
        lastUpdated: new Date().toISOString(),
    },
];

// Generate prediction data for the next 14 days
export const generatePredictionData = (): PredictionData[] => {
    const data: PredictionData[] = [];
    const baseDate = new Date();

    // Historical data (7 days)
    for (let i = -7; i < 0; i++) {
        const date = new Date(baseDate);
        date.setDate(date.getDate() + i);
        const confirmed = Math.max(0, Math.floor(5 + Math.random() * 3 + i));
        data.push({
            date: date.toISOString().split('T')[0],
            confirmed,
            predicted: confirmed,
            lowerBound: confirmed,
            upperBound: confirmed,
        });
    }

    // Future predictions (14 days)
    for (let i = 0; i < 14; i++) {
        const date = new Date(baseDate);
        date.setDate(date.getDate() + i);
        const predicted = Math.floor(8 + i * 0.5 + Math.random() * 2);
        data.push({
            date: date.toISOString().split('T')[0],
            confirmed: i === 0 ? 8 : 0,
            predicted,
            lowerBound: Math.floor(predicted * 0.7),
            upperBound: Math.floor(predicted * 1.3),
        });
    }

    return data;
};

// Mock Bayesian parameters
export const MOCK_BAYESIAN: BayesianParameter = {
    priorProbability: 0.15,
    likelihoodRatio: 2.8,
    posteriorProbability: 0.35,
    confidenceInterval: [0.28, 0.42],
};

// Mock risk scores
export const MOCK_RISK_SCORES: RiskScore[] = [
    {
        building: 'Main Building',
        room: '201',
        score: 78,
        trend: 'increasing',
        predictedCases: 5,
    },
    {
        building: 'Science Building',
        room: 'Lab-1',
        score: 52,
        trend: 'stable',
        predictedCases: 2,
    },
    {
        building: 'Arts Building',
        room: '401',
        score: 48,
        trend: 'decreasing',
        predictedCases: 1,
    },
    {
        building: 'Main Building',
        room: '202',
        score: 35,
        trend: 'stable',
        predictedCases: 1,
    },
];

// Mock suggested actions
export const MOCK_ACTIONS: SuggestedAction[] = [
    {
        id: 'act-001',
        priority: 'critical',
        type: 'disinfection',
        title: 'Immediate Disinfection Required',
        description: 'High concentration of respiratory symptoms detected. Schedule immediate sanitization.',
        affectedLocations: ['Main Building - Room 201'],
        timestamp: new Date().toISOString(),
        status: 'pending',
    },
    {
        id: 'act-002',
        priority: 'high',
        type: 'notification',
        title: 'Parent Advisory Notification',
        description: 'Send advisory to parents of students in affected rooms about increased health monitoring.',
        affectedLocations: ['Main Building - Room 201', 'Science Building - Lab-1'],
        timestamp: new Date().toISOString(),
        status: 'pending',
    },
    {
        id: 'act-003',
        priority: 'medium',
        type: 'monitoring',
        title: 'Enhanced Absence Monitoring',
        description: 'Track attendance patterns for early detection of illness spread.',
        affectedLocations: ['Main Building - All Rooms'],
        timestamp: new Date().toISOString(),
        status: 'in-progress',
    },
    {
        id: 'act-004',
        priority: 'medium',
        type: 'disinfection',
        title: 'Regular Sanitization Schedule',
        description: 'Increase cleaning frequency in moderate-risk areas.',
        affectedLocations: ['Science Building - Lab-1', 'Arts Building - Room 401'],
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
    },
];

// Mock dashboard stats
export const MOCK_DASHBOARD_STATS: DashboardStats = {
    totalReportsToday: 3,
    confirmedCases: 1,
    suspectedCases: 4,
    activeHotspots: 3,
    weeklyGrowthRate: 12.5,
};
