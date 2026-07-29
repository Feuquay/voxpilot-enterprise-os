# Exact iPhone Deployment Steps

## 1. Create the repository

In Safari, visit GitHub and create a repository named:

`voxpilot-chairman`

Do not add a README during creation because this package already includes one.

## 2. Upload the package

Open the repository, choose **Add file → Upload files**, and upload:

- `.github`
- `icons`
- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `service-worker.js`
- `README.md`
- `.nojekyll`

Commit directly to the `main` branch.

## 3. Enable Pages

Open:

**Repository → Settings → Pages**

Set **Source** to:

**GitHub Actions**

The included workflow deploys the app.

## 4. Install on iPhone

After deployment:

1. Open the GitHub Pages address in Safari.
2. Tap Share.
3. Tap **Add to Home Screen**.
4. Name it **Chairman**.
5. Launch it from the Home Screen.

## 5. Preserve the Chairman

Inside the app, periodically use:

**Settings → Export Chairman Data**

Save the JSON file in iCloud Drive. That file contains the runtime memory, decisions, sessions, ventures, and audit data stored on the iPhone.
