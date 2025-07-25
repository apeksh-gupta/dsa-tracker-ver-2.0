export interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  link?: string;
  notes?: string;
  status: 'not-started' | 'attempted' | 'solved';
  dateAdded: string;
  lastModified: string;
}

export interface Topic {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  dateAdded: string;
}

export interface DSAData {
  topics: Topic[];
  lastUpdated: string;
}