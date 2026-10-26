# Hoshimura Studio

Buildless website. Static files are in `dist/`. Japanese is the first-visit default; Japanese/English and dark/light preferences are saved in the visitor's browser.

The supplied icon and banner are in `dist/assets/`. Service artwork is an illustrative CSS composition, not a portfolio claim. YouTube and contact information are marked as coming soon until official links are provided.

To edit copy, use the Japanese markup in `dist/index.html` and English dictionary in `dist/app.js`. To add the official channel, replace `.pending` with a real link and update both language versions of the channel description. Add official contact details to `.contact` when available.

Preview: `python -m http.server 4173 --directory dist` from this folder.
