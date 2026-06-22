# GitHub Pages deployment

This repository is prepared for automatic static deployment with GitHub Actions.

## Supported URL patterns

The workflow detects the repository name automatically.

### Project site

Repository:

```text
Chatur27/moris-beauty
```

Published URL:

```text
https://chatur27.github.io/moris-beauty/
```

### User or organisation site

For a root URL such as:

```text
https://moris-beauty.github.io/
```

create a GitHub user or organisation named `moris-beauty`, then create this repository inside it:

```text
moris-beauty/moris-beauty.github.io
```

The same workflow will automatically deploy without a sub-path.

## GitHub configuration

After the first push:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. Open the **Actions** tab and watch the `Deploy to GitHub Pages` workflow.
5. When it completes, open the deployment URL shown by the workflow.

## Local static-export test

```bash
npm ci
npm run build
npm run preview
```

The static build is created in `out/`.
