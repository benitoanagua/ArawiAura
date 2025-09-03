export interface WordPressPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  language?: {
    code: string;
    name: string;
  };
  translations?: Array<{
    title: string;
    slug: string;
    language: {
      code: string;
    };
  }>;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  author?: {
    node: {
      name: string;
    };
  };
  tags?: {
    nodes: Array<{
      name: string;
    }>;
  };
}

export interface WordPressPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  date: string;
  status: string;
}

export interface SearchablePost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  language?: {
    code: string;
  };
  categories?: {
    nodes: Array<{
      name: string;
    }>;
  };
  tags?: {
    nodes: Array<{
      name: string;
    }>;
  };
}
