// Skill configuration: proficiency levels, category styles, and category mapping

// Proficiency levels: 1 = beginner, 2 = intermediate, 3 = expert
export const skillProficiency: Record<string, 1 | 2 | 3> = {
  // Frontend & Web
  'React': 3,
  'Next.js': 3,
  'TypeScript': 3,
  'JavaScript': 3,
  'HTML/CSS': 3,
  'Tailwind CSS': 3,
  'shadcn-ui': 2,
  'Framer Motion': 2,
  // Backend & APIs
  'Express.js': 2,
  'Node.js': 2,
  'Python': 3,
  'REST APIs': 3,
  'Convex': 2,
  'Clerk Auth': 2,
  // AI / Machine Learning
  'TensorFlow': 3,
  'Keras': 3,
  'scikit-learn': 2,
  'OpenCV': 3,
  'MLKit': 2,
  'TensorFlow Recommenders': 2,
  'Gemini API': 2,
  'vapi.ai': 2,
  'Pose Detection': 3,
  'CNN': 3,
  'NLP': 1,
  // Mobile
  'React Native': 1,
  'Flutter': 1,
  'iOS': 1,
  'Android': 2,
  // 3D & Creative Tech
  'Unreal Engine 5': 2,
  'Blender': 2,
  'MetaHuman': 2,
  'React Three Fiber': 2,
  'Three.js': 2,
  // Tools & DevOps
  'Git': 3,
  'Docker': 2,
  'Nginx': 2,
  'Linux': 2,
  'Vercel': 2,
  'GCP': 1,
  'Figma': 2,
  'VS Code': 3,
}

// Category color styles
export const categoryStyles: Record<string, {
  default: { border: string; bg: string; text: string };
  hover: { border: string; bg: string; text: string };
}> = {
  'Frontend & Web': {
    default: { border: '#E8330A22', bg: '#E8330A08', text: '#888888' },
    hover: { border: '#E8330A', bg: '#E8330A15', text: '#E8330A' },
  },
  'Backend & APIs': {
    default: { border: '#2E78B522', bg: '#2E78B508', text: '#888888' },
    hover: { border: '#2E78B5', bg: '#2E78B515', text: '#2E78B5' },
  },
  'AI / Machine Learning': {
    default: { border: '#D9770622', bg: '#D9770608', text: '#888888' },
    hover: { border: '#D97706', bg: '#D9770615', text: '#D97706' },
  },
  'Mobile': {
    default: { border: '#4A7C5922', bg: '#4A7C5908', text: '#888888' },
    hover: { border: '#4A7C59', bg: '#4A7C5915', text: '#4A7C59' },
  },
  '3D & Creative Tech': {
    default: { border: '#C2556A22', bg: '#C2556A08', text: '#888888' },
    hover: { border: '#C2556A', bg: '#C2556A15', text: '#C2556A' },
  },
  'Tools & DevOps': {
    default: { border: '#88888822', bg: '#88888808', text: '#888888' },
    hover: { border: '#888888', bg: '#88888815', text: '#F5F5F0' },
  },
}

// Maps each skill name to its category
export const categoryMap: Record<string, string> = {
  // Frontend & Web
  'React': 'Frontend & Web',
  'Next.js': 'Frontend & Web',
  'TypeScript': 'Frontend & Web',
  'JavaScript': 'Frontend & Web',
  'HTML/CSS': 'Frontend & Web',
  'Tailwind CSS': 'Frontend & Web',
  'shadcn-ui': 'Frontend & Web',
  'Framer Motion': 'Frontend & Web',
  // Backend & APIs
  'Express.js': 'Backend & APIs',
  'Node.js': 'Backend & APIs',
  'Python': 'Backend & APIs',
  'REST APIs': 'Backend & APIs',
  'Convex': 'Backend & APIs',
  'Clerk Auth': 'Backend & APIs',
  // AI / Machine Learning
  'TensorFlow': 'AI / Machine Learning',
  'Keras': 'AI / Machine Learning',
  'scikit-learn': 'AI / Machine Learning',
  'OpenCV': 'AI / Machine Learning',
  'MLKit': 'AI / Machine Learning',
  'TensorFlow Recommenders': 'AI / Machine Learning',
  'Gemini API': 'AI / Machine Learning',
  'vapi.ai': 'AI / Machine Learning',
  'Pose Detection': 'AI / Machine Learning',
  'CNN': 'AI / Machine Learning',
  'NLP': 'AI / Machine Learning',
  // Mobile
  'React Native': 'Mobile',
  'Flutter': 'Mobile',
  'iOS': 'Mobile',
  'Android': 'Mobile',
  // 3D & Creative Tech
  'Unreal Engine 5': '3D & Creative Tech',
  'Blender': '3D & Creative Tech',
  'MetaHuman': '3D & Creative Tech',
  'React Three Fiber': '3D & Creative Tech',
  'Three.js': '3D & Creative Tech',
  // Tools & DevOps
  'Git': 'Tools & DevOps',
  'Docker': 'Tools & DevOps',
  'Nginx': 'Tools & DevOps',
  'Linux': 'Tools & DevOps',
  'Vercel': 'Tools & DevOps',
  'GCP': 'Tools & DevOps',
  'Figma': 'Tools & DevOps',
  'VS Code': 'Tools & DevOps',
}
