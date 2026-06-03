export type TenderStatus = 'draft' | 'analyzing' | 'completed' | 'failed';

export interface Tender {
  id: string;
  title: string;
  organization: string;
  uploadDate: string;
  status: TenderStatus;
  analysisId?: string;
}

export interface AnalysisResult {
  id: string;
  tenderId: string;
  eligibilityScore: number; // 0-100
  riskScore: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High';
  summary: string;
  missingRequirements: string[];
  requiredDocuments: string[];
  deadline?: string;
  contactInfo?: string;
}

export interface DashboardStats {
  totalTenders: number;
  activeAnalyses: number;
  completedReports: number;
  successRate: number; // Percentage
}
