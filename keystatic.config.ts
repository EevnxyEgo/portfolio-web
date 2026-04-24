import { config, fields, collection } from "@keystatic/core";

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
});
