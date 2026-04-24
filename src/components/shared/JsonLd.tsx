export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arsenius Audley Wahyu Djatmiko",
    alternateName: "Arsenius Audley",
    jobTitle: "Fullstack Developer & Machine Learning Engineer",
    description:
      "Computer Engineering graduate from ITS Surabaya. Fullstack developer with ML/AI expertise. Bangkit Academy alumnus.",
    url: "https://arsendev.net",
    email: "arseniuswahyu@gmail.com",
    image: "https://arsendev.net/images/profile/arsenius.jpg",
    sameAs: [
      "https://github.com/EevnxyEgo",
      "https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Machine Learning",
      "TensorFlow",
      "Python",
      "Fullstack Development",
      "Computer Vision",
      "Unreal Engine",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Institut Teknologi Sepuluh Nopember",
      alternateName: "ITS Surabaya",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}