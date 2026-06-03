import { Tender, AnalysisResult, DashboardStats } from "@/types";

export const mockTenders: Tender[] = [
  {
    id: "1",
    title: "City Infrastructure Upgrade 2024",
    organization: "Municipal Council",
    uploadDate: "2024-05-20",
    status: "completed",
    analysisId: "a1",
  },
  {
    id: "2",
    title: "IT Support Services Framework",
    organization: "Department of Education",
    uploadDate: "2024-05-22",
    status: "analyzing",
  },
  {
    id: "3",
    title: "Renewable Energy Research Grant",
    organization: "Ministry of Science",
    uploadDate: "2024-05-25",
    status: "draft",
  },
  {
    id: "4",
    title: "Corporate Legal Consultancy",
    organization: "National Bank",
    uploadDate: "2024-05-15",
    status: "completed",
    analysisId: "a2",
  },
];

export const mockAnalyses: AnalysisResult[] = [
  {
    id: "a1",
    tenderId: "1",
    eligibilityScore: 85,
    riskScore: 20,
    riskLevel: "Low",
    summary: "Strong match for current company certifications. High technical capability overlap.",
    missingRequirements: ["Regional Office Certification"],
    requiredDocuments: ["ISO 9001", "Last 3 Years Audit", "Insurance Certificate"],
    deadline: "2024-06-30",
  },
  {
    id: "a2",
    tenderId: "4",
    eligibilityScore: 45,
    riskScore: 65,
    riskLevel: "High",
    summary: "Company lacks specific banking sector experience required in section 4.2.",
    missingRequirements: ["Financial Sector Portfolio", "Banking License A-1"],
    requiredDocuments: ["Reference Letters from 3 Banks"],
    deadline: "2024-07-15",
  },
];

export const mockStats: DashboardStats = {
  totalTenders: 24,
  activeAnalyses: 3,
  completedReports: 18,
  successRate: 75,
};
