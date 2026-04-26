import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: "yaml",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        tagline: fields.text({ label: "Tagline" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "ML/AI", value: "ml-ai" },
            { label: "Fullstack", value: "fullstack" },
            { label: "3D", value: "3d" },
            { label: "Computer Vision", value: "cv" },
            { label: "Mobile", value: "mobile" },
          ],
          defaultValue: "fullstack",
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Active", value: "active" },
            { label: "Archived", value: "archived" },
            { label: "In Development", value: "dev" },
          ],
          defaultValue: "active",
        }),
        year: fields.number({ label: "Year", validation: { min: 2020, max: 2030 } }),
        type: fields.select({
          label: "Project Type",
          options: [
            { label: "Individual", value: "individual" },
            { label: "Group", value: "group" },
          ],
          defaultValue: "individual",
        }),
        context: fields.text({ label: "Context" }),
        role: fields.text({ label: "Role" }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        order: fields.number({ label: "Display Order" }),
        techStack: fields.array(fields.text({ label: "Tech" }), { label: "Tech Stack" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        myRole: fields.text({ label: "My Role", multiline: true }),
        impact: fields.text({ label: "Impact", multiline: true }),
        learnings: fields.text({ label: "Key Learnings", multiline: true }),
        links: fields.object({
          github: fields.url({ label: "GitHub URL" }),
          demo: fields.url({ label: "Demo URL" }),
          report: fields.url({ label: "Report URL" }),
        }),
      },
    }),
    certifications: collection({
      label: "Certifications",
      slugField: "title",
      path: "src/content/certifications/*",
      format: "yaml",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        issuer: fields.text({ label: "Issuer" }),
        date: fields.text({ label: "Issue Date" }),
        expiryDate: fields.text({ label: "Expiry Date" }),
        credentialId: fields.text({ label: "Credential ID" }),
        credentialUrl: fields.url({ label: "Credential URL" }),
        description: fields.text({ label: "Description", multiline: true }),
        skills: fields.array(fields.text({ label: "Skill" }), { label: "Skills" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Academic", value: "academic" },
            { label: "Professional", value: "professional" },
            { label: "ML/AI", value: "ml-ai" },
            { label: "Cloud", value: "cloud" },
            { label: "Development", value: "development" },
          ],
          defaultValue: "development",
        }),
        verified: fields.checkbox({ label: "Verified", defaultValue: true }),
      },
    }),
  },
  singletons: {
    siteConfig: singleton({
      label: "Site Configuration",
      path: "src/content/site-config",
      schema: {
        heroAvailableText: fields.text({
          label: "Hero — Available Status Text",
          defaultValue: "Surabaya, Indonesia · Available for work",
        }),
        heroFirstName: fields.text({
          label: "Hero — First Name",
          defaultValue: "ARSENIUS",
        }),
        heroLastName: fields.text({
          label: "Hero — Last Name",
          defaultValue: "AUDLEY",
        }),
        heroRoleSans: fields.text({
          label: "Hero — Role (sans part)",
          defaultValue: "Fullstack Developer &",
        }),
        heroRoleSerif: fields.text({
          label: "Hero — Role (serif part)",
          defaultValue: "ML Engineer",
        }),
        heroDescription: fields.text({
          label: "Hero — Description",
          multiline: true,
          defaultValue: "Building intelligent systems where web meets AI. ITS Surabaya graduate. Bangkit Academy ML alumnus.",
        }),
        aboutHeading: fields.text({
          label: "About — Heading",
          defaultValue: "The human behind the code.",
        }),
        aboutLocation: fields.text({
          label: "About — Location",
          defaultValue: "Surabaya, Indonesia",
        }),
        aboutAvailability: fields.select({
          label: "About — Availability",
          options: [
            { label: "Available for work", value: "available" },
            { label: "Open to opportunities", value: "open" },
            { label: "Not available", value: "busy" },
          ],
          defaultValue: "available",
        }),
        contactHeadline1: fields.text({
          label: "Contact — Headline 1",
          defaultValue: "Let's build",
        }),
        contactHeadline2: fields.text({
          label: "Contact — Headline 2 (italic)",
          defaultValue: "something",
        }),
        contactHeadline3: fields.text({
          label: "Contact — Headline 3",
          defaultValue: "together.",
        }),
        contactSubtext: fields.text({
          label: "Contact — Subtext",
          multiline: true,
          defaultValue: "Open for full-time roles and interesting collaborations. Currently in Surabaya, Indonesia.",
        }),
        contactEmail: fields.text({
          label: "Contact — Email",
          defaultValue: "arseniuswahyu@gmail.com",
        }),
        socialGithub: fields.text({
          label: "Social — GitHub URL",
          defaultValue: "https://github.com/EevnxyEgo",
        }),
        socialLinkedin: fields.text({
          label: "Social — LinkedIn URL",
          defaultValue: "https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251",
        }),
        showSkills: fields.checkbox({ label: "Show Skills Section", defaultValue: true }),
        showExperience: fields.checkbox({ label: "Show Experience Section", defaultValue: true }),
        showCertifications: fields.checkbox({ label: "Show Certifications Section", defaultValue: true }),
        cvUrl: fields.text({
          label: "CV — Download URL",
          defaultValue: "/cv.pdf",
        }),
      },
    }),
  },
});
