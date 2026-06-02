export interface Experience {
  role: string;
  company: string;
  period: string;
}

export interface Project {
  id: string;
  title: string;
  titleZh: string;
  year: number;
  video: string;
  poster: string;
  description: string;
  techStack: string[];
  featured?: boolean;
}

export interface Profile {
  nameEn: string;
  nameZh: string;
  title: string;
  email: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  avatar: string;
  lifestyleImage: string;
  about: string;
}

export interface SocialLinks {
  twitter: string;
  instagram: string;
  linkedin: string;
  wechat: string;
  telegram: string;
  github: string;
}

export interface ContactInfo {
  intro: string;
  location: string;
}

export interface SiteContent {
  profile: Profile;
  experience: Experience[];
  skills: string[];
  education: string;
  projects: Project[];
  social: SocialLinks;
  contact: ContactInfo;
}
