# CONTENT DATA — Arsenius Audley Portfolio
> Single source of truth untuk semua konten: projects, copy, skills, experience.
> Gunakan data ini saat populate Keystatic CMS content files dan menulis copy.

---

## 👤 PERSONAL COPY

### Hero Tagline
```
Label    : "FULLSTACK DEVELOPER × ML ENGINEER"
Headline : "ARSENIUS\nAUDLEY"
Sub      : "Building intelligent systems at the intersection of\nweb, AI, and immersive technology."
CTA 1    : "View My Work"   → href="#projects"
CTA 2    : "Download CV"    → href="/cv.pdf"
```

### About Bio
```
Paragraph 1:
"I'm a Computer Engineering graduate from ITS Surabaya — where I learned
that the most interesting problems live at the boundary between disciplines.
I build things that are smart: web apps with AI at their core, ML models
that run in the real world, and systems that feel alive."

Paragraph 2:
"From real-time exercise detection on mobile to voice-powered AI fitness
trainers and dynamic camera systems in Unreal Engine 5 — my projects share
one common thread: I don't stop until the idea actually works."

Paragraph 3 (Bangkit):
"As a Google Bangkit Academy Machine Learning alumnus, I was trained to
ship AI solutions at scale — combining research rigor with the speed
of a startup engineer."
```

### About Stats (animated counter on scroll)
```
5+    → Projects Built
3     → ML Models Deployed
2     → Platforms (Mobile + Web)
1     → Undergraduate Thesis
```

### Section Taglines
```
Skills       : "My Technical Arsenal"
               sub: "Technologies I use to turn ideas into reality"

Projects     : "Things I've Built"
               sub: "A selection of projects at the intersection of web, AI, and engineering"

Experience   : "My Journey"
               sub: "From student to builder — the path that shaped my skills"

Certs        : "Credentials & Recognition"
               sub: "Continuous learning, formally verified"

Contact      : "Let's Build Something Together."
               sub: "Open for full-time roles, freelance projects, and interesting collaborations."
               left-sub: "I'm currently looking for opportunities where I can combine
                          fullstack development with AI — if that sounds like something
                          your team needs, let's talk."
```

---

## 🛠️ SKILLS DATA

### Frontend
```yaml
- React
- Next.js
- TypeScript
- JavaScript (ES2022+)
- HTML5 / CSS3
- Tailwind CSS
- shadcn-ui
- Bootstrap
- Framer Motion
```

### Backend
```yaml
- Express.js
- Node.js
- Python
- REST APIs
- Convex
- Clerk (Auth)
```

### AI / Machine Learning
```yaml
- TensorFlow / Keras
- scikit-learn
- OpenCV
- MLKit
- TensorFlow Recommenders
- Gemini API
- vapi.ai (Voice AI)
- Pose Detection
- Transfer Learning
- CNN (Convolutional Neural Networks)
- Recommendation Systems
- Natural Language Processing (basics)
```

### Mobile & Cross-platform
```yaml
- Kotlin (Android)
- Android Development
```

### 3D & Creative Tech
```yaml
- Unreal Engine 5
- Blender
- MetaHuman
- Rokoko (Motion Capture)
- React Three Fiber
- Three.js
```

### Tools & DevOps
```yaml
- Git / GitHub
- Docker
- Nginx
- Linux (Ubuntu)
- Vercel
- Google Cloud Platform (basics)
- Jupyter Notebook
- Google Colab
- Figma
- VS Code
```

---

## 📁 PROJECTS DATA

### Project 1: BAKI

```yaml
# src/content/projects/baki.yaml
title: BAKI
slug: baki
tagline: "AI-powered fitness app that counts your reps in real time"
category: ml-ai
status: archived
year: 2024
type: group
context: "Telematics Engineering Final Project — ITS Surabaya"
role: "Machine Learning Developer"
featured: true
order: 1

techStack:
  - Kotlin
  - TensorFlow
  - OpenCV
  - Python
  - MLKit
  - Android

summary: >
  BAKI is an AI-powered fitness application that helps users track and
  improve their workouts more effectively. It leverages MLKit technology
  to detect and count exercises such as push-ups, sit-ups, and lunges in
  real time using only a smartphone camera. Acting as a smart RepCounter,
  BAKI provides structured workout programs, reflex measurement, and
  real-time feedback — making self-training more accessible and efficient.

myRole: >
  As the Machine Learning Developer, I designed, trained, and deployed
  models for exercise detection and repetition counting. I handled data
  collection, preprocessing, and model integration into the mobile app,
  while collaborating with the Mobile App and Backend teams to ensure
  seamless system integration.

impact: >
  My contribution enabled BAKI to perform real-time exercise detection
  and repetition counting, helping users stay focused on their workout
  instead of manual tracking. This innovation has the potential to
  democratize structured fitness training by giving people access to
  features usually only available through personal trainers.

learnings: >
  This project strengthened my expertise in pose detection, transfer
  learning, and real-time ML integration into mobile platforms. More
  importantly, I learned the value of cross-functional collaboration —
  working with mobile and backend developers taught me that even
  well-prepared technical solutions can face unexpected integration
  challenges. Communication and adaptability are as crucial as
  technical skills.

links:
  canva: "[presentation link from PDF]"
  report: "[report link from PDF]"
```

---

### Project 2: FitBuddy AI

```yaml
# src/content/projects/fitbuddy-ai.yaml
title: "FitBuddy AI"
slug: fitbuddy-ai
tagline: "Voice AI fitness trainer — talk to your workout plan"
category: fullstack
status: dev
year: 2024
type: individual
context: "Self-initiated project — learning journey in Next.js & TypeScript (Coursera + Udemy)"
role: "Sole Developer (End-to-End)"
featured: true
order: 2

techStack:
  - Next.js
  - TypeScript
  - Gemini API
  - vapi.ai
  - Clerk
  - Convex
  - shadcn-ui
  - Tailwind CSS

summary: >
  FitBuddy AI is a web-based fitness trainer powered by a voice agent
  that provides personalized workout plans, diet recommendations, and
  interactive guidance. Users can speak directly with the AI for
  consultation, making the training experience more natural and engaging.

myRole: >
  As the sole developer, I built the application end-to-end — from the
  Next.js + TypeScript web app with shadcn-ui, to implementing Clerk for
  authentication and Convex as the database. I integrated vapi.ai as a
  voice agent for real-time AI conversations, and used the Gemini API to
  generate personalized workout plans and diet programs displayed
  seamlessly within the web interface.

impact: >
  FitBuddy AI demonstrates how AI can make fitness training personalized,
  interactive, and accessible. With its voice consultation feature and
  automated plan generation, the project highlights the potential of
  combining web development, voice AI, and generative AI to create a
  genuinely engaging user experience.

learnings: >
  Through this project, I leveled up in full-stack web development with
  Next.js and TypeScript, while gaining hands-on experience in AI
  integration, authentication flows, and database management. I also
  learned how to design a smooth AI-to-user interaction flow — where
  voice consultation, workout planning, and diet generation come together
  in a single cohesive web platform.

links:
  github: "https://github.com/EevnxyEgo/FitBuddyAI"
  demo: "[akan di-deploy — tambahkan link saat sudah live]"
```

---

### Project 3: Digital Twin Concert

```yaml
# src/content/projects/digital-twin-concert.yaml
title: "Digital Twin Concert"
slug: digital-twin-concert
tagline: "360° dynamic camera system for a virtual music concert"
category: 3d
status: archived
year: 2024
type: individual
context: "Undergraduate Thesis — Institut Teknologi Sepuluh Nopember (ITS) Surabaya"
role: "Sole Researcher & Developer"
featured: true
order: 3

techStack:
  - "Unreal Engine 5"
  - "C++"
  - Blender
  - MetaHuman
  - Rokoko
  - "Level Sequencer"

summary: >
  This project focused on developing an interactive 360° camera system
  with dynamic view control for a digital twin of a live music concert
  built in Unreal Engine 5. The system was designed to replicate real
  concert experiences, enabling smooth camera transitions, immersive
  perspectives, and cinematic storytelling in a virtual environment.

myRole: >
  As the sole researcher and developer, I built four types of cameras —
  fixed, orbit, spectator, and cinematic — integrated into one unified
  system. I implemented a Finite State Machine (FSM) for managing camera
  states, applied interpolation techniques for smooth movements, and
  created a real-time UI for seamless camera switching. I also designed
  cinematic shots with Unreal Engine's Level Sequencer to replicate real
  concert videography.

impact: >
  This project successfully delivered an interactive and intelligent
  virtual camera system for digital twin concerts. It demonstrated how
  engineering principles like FSM and interpolation can improve user
  immersion and realism in virtual environments — with potential
  applications in digital events, simulation, and virtual training
  beyond entertainment.

learnings: >
  Through this thesis, I deepened my expertise in Unreal Engine 5, camera
  system design, real-time rendering, and virtual environment interaction.
  I also learned the importance of combining research, engineering, and
  creative design to solve complex problems — approaching system
  development from both technical and user-experience perspectives.

links:
  report: "[poster/report link from PDF]"
```

---

### Project 4: Healthylicious

```yaml
# src/content/projects/healthylicious.yaml
title: Healthylicious
slug: healthylicious
tagline: "Smart recipe recommendations tailored to your ingredients and diet"
category: ml-ai
status: archived
year: 2024
type: group
context: "Bangkit Academy — Study Independent Final Project (Capstone)"
role: "Machine Learning Developer"
featured: false
order: 4

techStack:
  - Python
  - "TensorFlow Recommenders"
  - scikit-learn
  - "Google Cloud Platform"
  - Flutter
  - "Bangkit Academy"

summary: >
  Healthylicious is an innovative mobile application that makes maintaining
  a healthy diet more accessible. It helps users make informed food choices
  by recommending healthy recipes tailored to available ingredients and
  dietary preferences — because healthy should be delicious.

myRole: >
  As the Machine Learning Developer, I designed and implemented the Recipe
  Recommendation System. This included collecting and preprocessing recipe
  data, training the recommendation model using TensorFlow Recommenders and
  scikit-learn, and integrating the system with the mobile app. I worked
  closely with the Cloud Team and the Mobile Development Team to ensure
  seamless cross-platform integration.

impact: >
  My contribution enabled the application to provide personalized and
  intelligent meal suggestions — significantly enhancing the app's core
  functionality and user experience. The project was presented as the
  Bangkit Academy capstone, representing the team's ability to ship a
  complete ML-powered mobile product.

learnings: >
  Through this project, I gained technical expertise in ML pipelines,
  feature engineering, and system deployment in mobile environments.
  Working across cloud and app development teams reinforced that
  adaptability, resilience, and continuous communication are what
  ultimately determine project success — not just technical preparation.

links:
  github: "[appHealthylicious/machinelearning repo]"
  report: "https://shorturl.at/lhkHt"
  linkedin: "[Bangkit LinkedIn post]"
```

---

### Project 5: 41-Card Game

```yaml
# src/content/projects/41-card-game.yaml
title: "41-Card Game"
slug: 41-card-game
tagline: "Play cards with your webcam — real-time CNN card detection"
category: cv
status: archived
year: 2023
type: individual
context: "Final Project — Computer Vision/Image Processing Course (PCV), ITS"
role: "Sole Developer"
featured: false
order: 5

techStack:
  - Python
  - TensorFlow
  - Keras
  - OpenCV
  - CNN

summary: >
  The 41-Card Game integrates machine learning and computer vision to
  create an interactive card game where physical playing cards are detected
  and classified in real time. By combining Convolutional Neural Networks
  with game logic, players can use actual physical cards while the
  application processes inputs through a camera or webcam.

myRole: >
  As the sole developer, I designed and built the complete system. I
  trained a CNN-based card detection model using TensorFlow/Keras and
  OpenCV, created a custom dataset of 500+ images per card class, and
  optimized the model for real-time classification. I also developed the
  full game logic and user interface — ensuring smooth integration between
  card recognition and gameplay.

impact: >
  This project demonstrated how deep learning can enhance traditional
  gameplay by enabling physical card interaction with digital systems.
  The real-time card detection showed strong performance, illustrating
  the practical potential of AI in interactive applications.

learnings: >
  I gained hands-on experience in CNN design, dataset preparation, image
  preprocessing, and real-time video processing. More importantly, it
  taught me how to bring computer vision models into practical, interactive
  applications — reinforcing my ability to translate ML theory into
  innovative, working solutions.

links:
  sourceCode: "[github link]"
  report: "[final report link]"
  video: "[demo video link]"
```

---

## 📅 EXPERIENCE / TIMELINE DATA

```
2024 — Present
  🎓 Fresh Graduate
  Computer Engineering, Institut Teknologi Sepuluh Nopember (ITS)
  Surabaya, Indonesia
  [tags: C++, Python, Computer Networks, Computer Vision, Embedded Systems]

2024
  📝 Undergraduate Thesis
  "Pengembangan Sistem Kamera 360° dengan Dynamic View Control untuk
   Digital Twin Konser Musik Menggunakan Unreal Engine 5"
  ITS Surabaya
  Supervisor: Mochamad Hariadi, S.T., M.Sc., Ph.D & Dr. Soo Jongtailor
  [tags: Unreal Engine 5, C++, Blender, MetaHuman, FSM, Interpolation]

2024
  🏆 Bangkit Academy — Machine Learning Cohort
  Program by Google × Tokopedia × Traveloka × Gojek
  Capstone Project: Healthylicious (ML Developer)
  [tags: TensorFlow, Python, ML Pipelines, Google Cloud, Collaboration]

2024
  🌱 Self-Directed Learning & Project Building
  Next.js Advanced & TypeScript — Coursera + Udemy
  Output: FitBuddy AI (voice AI fitness trainer)
  [tags: Next.js, TypeScript, vapi.ai, Gemini API, Clerk, Convex]

2023
  🎮 Computer Vision Final Project
  41-Card Game: Real-time playing card detection with CNN + OpenCV
  ITS Computer Vision/Image Processing Course
  [tags: Python, TensorFlow, Keras, OpenCV, CNN, Dataset Creation]

2023
  📱 Telematics Final Project
  BAKI: AI-powered fitness app with real-time exercise detection
  Group project, ITS
  [tags: Python, TensorFlow, OpenCV, MLKit, Kotlin, Mobile Integration]
```

---

## 📬 CONTACT SECTION COPY

```
Left Headline : "Let's Build\nSomething\nTogether."
Left Sub      : "Open for full-time roles, freelance projects,
                 and interesting collaborations."
Left Body     : "I'm currently looking for opportunities where I can
                 combine fullstack web development with AI and automation.
                 If that sounds like something your team needs — let's talk."

Email label   : "Drop me a line"
Email link    : arseniuswahyu@gmail.com

Form labels:
  Name        : "Your Name"
  Email       : "Your Email"
  Subject     : "What's this about?"
  Message     : "Tell me about your project or opportunity"
  Submit btn  : "Send Message"
  Loading btn : "Sending..."
  Success msg : "Message sent! I'll get back to you soon."
  Error msg   : "Something went wrong. Please try again or email directly."
```

---

## 🔍 SEO METADATA

```typescript
export const siteConfig = {
  name: "Arsenius Audley Wahyu Djatmiko",
  title: "Arsenius Audley | Fullstack Developer & ML Engineer",
  description:
    "Portfolio of Arsenius Audley W.D. — Computer Engineering graduate from ITS Surabaya. " +
    "Building fullstack web apps with AI at their core. Next.js, Python, TensorFlow. " +
    "Alumni Bangkit Academy ML Cohort.",
  url: "https://arsendev.net",
  ogImage: "/og-image.png",
  keywords: [
    "Arsenius Audley",
    "Arsenius Audley Wahyu Djatmiko",
    "Fullstack Developer Indonesia",
    "Machine Learning Engineer Indonesia",
    "Next.js Developer",
    "React Developer",
    "TensorFlow Developer",
    "Bangkit Academy Alumni",
    "ITS Surabaya",
    "Fresh Graduate Developer",
    "AI Engineer Indonesia",
    "Portfolio Website",
    "arsendev.net",
  ],
  links: {
    github: "https://github.com/EevnxyEgo",
    linkedin: "https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251",
    email: "arseniuswahyu@gmail.com",
  },
};
```

### JSON-LD Person Schema (homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Arsenius Audley Wahyu Djatmiko",
  "alternateName": "Arsenius Audley",
  "jobTitle": "Fullstack Developer & Machine Learning Engineer",
  "description": "Computer Engineering graduate from ITS Surabaya. Fullstack developer with ML/AI expertise. Bangkit Academy alumnus.",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Institut Teknologi Sepuluh Nopember",
    "alternateName": "ITS Surabaya"
  },
  "url": "https://arsendev.net",
  "email": "arseniuswahyu@gmail.com",
  "image": "https://arsendev.net/images/profile/arsenius.jpg",
  "sameAs": [
    "https://github.com/EevnxyEgo",
    "https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251"
  ],
  "knowsAbout": [
    "React", "Next.js", "TypeScript", "Machine Learning",
    "TensorFlow", "Python", "Fullstack Development",
    "Computer Vision", "Unreal Engine"
  ]
}
```

---

## 📝 KEYSTATIC CMS CONTENT FILES LOCATION

```
src/content/
├── projects/
│   ├── baki.yaml                  ← data di atas
│   ├── fitbuddy-ai.yaml
│   ├── digital-twin-concert.yaml
│   ├── healthylicious.yaml
│   └── 41-card-game.yaml
└── certifications/
    └── [akan diisi Arsenius via /keystatic admin]
```

Saat populate content files, gunakan data YAML di atas verbatim.
Schema dari keystatic.config.ts harus match dengan field names di sini.

---

*File ini adalah single source of truth untuk semua konten.*
*Update sini sebelum update di CMS atau komponen.*