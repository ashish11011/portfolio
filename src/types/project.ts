export type ProjectDocument = {
  type: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  content?: ProjectDocument[];
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  description: string;
  summary: string;
  features: string[];
  technologies: string[];
  images: string[];
  website: string;
  logo: string;
  content: ProjectDocument;
  featuredOrder: number | null;
  sortOrder: number;
  isVisible: boolean;
};

export type ProjectSaveResult =
  | { success: true; project: Project }
  | { success: false; message: string };
