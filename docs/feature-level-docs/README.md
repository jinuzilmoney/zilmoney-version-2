# Feature-Level Documentation

This folder stores **feature-specific documentation**. Each feature gets its own dedicated folder for better organization.

## Structure

Each feature should be added as a **separate folder**, not as individual files at the root level.

```
feature-level-docs/
├── README.md
├── signup/
│   └── README.md
├── signin/
│   └── README.md
├── dashboard/
│   └── README.md
├── payments/
│   └── README.md
└── ...
```

## Guidelines

- Create a new folder for each feature (e.g., `signup/`, `signin/`, `dashboard/`)
- Each feature folder must contain at least a `README.md` describing the feature
- Add supporting docs (flow diagrams, API specs, screenshots) inside the feature folder
- Use lowercase and hyphens for folder names (e.g., `forgot-password/`, `user-profile/`)
- For top-level / cross-cutting documentation, use `docs/project-level-docs/` instead
