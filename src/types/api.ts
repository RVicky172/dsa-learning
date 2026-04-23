export type Role = 'user' | 'premium_user' | 'admin';

export type SubscriptionTier = 'free' | 'pro_monthly' | 'pro_yearly';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  roles: Role[];
  subscriptionTier: SubscriptionTier;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface ProblemListItemApi {
  id: string;
  topicId: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isPremium: boolean;
  canAccess?: boolean;
  description: string;
}

export interface ProblemDetailApi extends ProblemListItemApi {
  statement: string;
  constraints: string;
}

export interface ProblemAttemptPayload {
  language: string;
  submittedCode: string;
}

export interface ProblemAttemptResult {
  id: string;
  status: 'accepted' | 'wrong_answer' | 'compile_error' | 'runtime_error' | 'timeout';
  runtimeMs?: number;
  memoryKb?: number;
}

export interface TopicProgress {
  topicId: string;
  attemptedCount: number;
  solvedCount: number;
  masteryScore: number;
}

export interface UserProgressResponse {
  topics: TopicProgress[];
  completedProblemIds?: string[];
}

export interface ProgressRecommendationItem {
  problemId: string;
  topicId: string;
  topicTitle: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isPremium: boolean;
  canAccess: boolean;
  description: string;
  reason: string;
}

export interface ProgressRecommendationsResponse {
  items: ProgressRecommendationItem[];
}

export interface UpdateProblemProgressPayload {
  completed: boolean;
}

export interface ProblemProgressUpdateResponse {
  problemId: string;
  completed: boolean;
}

export interface SubscriptionState {
  tier: SubscriptionTier;
  status: 'active' | 'canceled' | 'expired' | 'none' | 'pending';
  currentPeriodEnd?: string;
}

export interface RunCodePayload {
  problemId?: string;
  language: 'javascript' | 'python' | 'typescript' | 'js' | 'py' | 'ts';
  sourceCode: string;
  stdin?: string;
  timeoutMs?: number;
  waitForCompletion?: boolean;
}

export type ExecutionStatus =
  | 'queued'
  | 'running'
  | 'completed'
  | 'runtime_error'
  | 'timeout'
  | 'failed';

export interface RunCodeResult {
  id: string;
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  exitCode?: number | null;
  runtimeMs?: number;
  memoryKb?: number;
}

export interface ExecutionRecord {
  id: string;
  problemId: string | null;
  language: string;
  sourceHash: string | null;
  stdin: string;
  stdout: string;
  stderr: string;
  status: ExecutionStatus;
  exitCode: number | null;
  runtimeMs: number | null;
  memoryKb: number | null;
  createdAt: string;
  completedAt: string | null;
}

export interface ExecutionHistoryQuery {
  problemId?: string;
  language?: 'javascript' | 'python' | 'typescript';
  status?: ExecutionStatus;
  page?: number;
  pageSize?: number;
}

export interface ExecutionHistoryResponse {
  items: ExecutionRecord[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  status: number;
  message: string;
}

export interface AdminOverview {
  users: number;
  problems: number;
  topics: number;
  attempts: number;
}

export interface AdminTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProblem {
  id: string;
  topicId: string;
  topicTitle: string;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isPremium: boolean;
  statement: string;
  constraints: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminListResponse<TItem> {
  items: TItem[];
}

export interface AdminTopicPayload {
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
  isPublished: boolean;
}

export interface AdminProblemPayload {
  topicId: string;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isPremium: boolean;
  statement: string;
  constraints: string;
}
