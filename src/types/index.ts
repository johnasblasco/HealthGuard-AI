// Core Types for Health Monitoring System

export type UserRole = 'student' | 'admin';

export type SeverityLevel = 'mild' | 'moderate' | 'severe';

export interface Symptom {
    key: any;
    id: string;
    name: string;
    category: 'respiratory' | 'digestive' | 'general' | 'other';
    icon: string;
}

export interface Seat {
    number: string;
    id: string; // UUID from backend
}

export interface Room {
    name: string;
    seats: Seat[];
}

export interface Location {
    building: string;
    rooms: Room[];
}

export interface HealthReport {
    studentUserId?: string | undefined;
    gradeLevel: string;
    studentHashedId: string;
    id: string;
    userId: string;
    userGradeLevel: string;
    symptoms: string[];
    severity: SeverityLevel;
    dateOfOnset: string;
    confirmedDisease: boolean;
    diseaseName?: string | null;
    seatId?: string; // matches seat UUID
    location: {
        building: string;
        room: string;
        seatNumber: string;
        seatId?: string; // matches seat UUID
    };
    timestamp: string;
    status: 'pending' | 'reviewed' | 'resolved' | 'investigating';
}

export interface CreateHealthReport {
    studentUserId: string;
    userGradeLevel: string;
    gradeLevel: string;
    location: any;
    severity: SeverityLevel;
    dateOfOnset: string;
    confirmedDisease: boolean;
    diseaseName?: string | null;
    seatId: string;
    symptoms: string[];
}

export interface HotspotData {
    building: string;
    room: string;
    reportCount: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    lastUpdated: string;
}

export interface PredictionData {
    date: string;
    confirmed: number;
    predicted: number;
    lowerBound: number;
    upperBound: number;
}

export interface BayesianParameter {
    priorProbability: number;
    likelihoodRatio: number;
    posteriorProbability: number;
    confidenceInterval: [number, number];
}

export interface RiskScore {
    building: string;
    room: string;
    score: number; // 0-100
    trend: 'increasing' | 'stable' | 'decreasing';
    predictedCases: number;
}

export interface SuggestedAction {
    id: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    type: 'disinfection' | 'notification' | 'monitoring' | 'closure';
    title: string;
    description: string;
    affectedLocations: string[];
    timestamp: string;
    status: 'pending' | 'in-progress' | 'completed';
}

export interface DashboardStats {
    totalReportsToday: number;
    confirmedCases: number;
    suspectedCases: number;
    activeHotspots: number;
    weeklyGrowthRate: number;
}
