# Restored in Him

A comprehensive, faith-based healing application for sexual restoration, wholeness, and covenant intimacy with God.

## Overview

**Restored in Him** is a spiritual healing platform designed to help individuals process trauma, break bondage, and rebuild identity through biblical truth, practical declarations, and guided spiritual work.

**Core Theology:** This is not about willpower. It is about **God's presence.** As you press into Him, the power of sexual sin and bondage loses its grip—not through effort, but through being filled with Him. He is already with you. Turn, and He is there.

## Features

### 📋 Assessment
- Comprehensive personal assessment between you and God
- Three depth levels: Gentle, Adult, Detailed
- Covers past experiences, current struggles, family wounds, and spiritual battles
- Results shape your personalized healing pathway

### 🗺️ Guided Modules (12 Total)
1. **Legal Ground** — Close the doors to the enemy
2. **Breaking Soul Ties** — Sever unhealthy spiritual connections
3. **Father Wound Healing** — Receive God as Father
4. **Renewing the Spirit of the Mind** — Truth declarations and identity in Christ
5. **Communion & The Blood** — Covenant renewal and spiritual protection
6. **Patterns of Demonic Influence** — Identify, break, close doors
7. **Emotional Traps** — Shame, fear, anger, grief cycles
8. **Rebuilding Identity** — After trauma and abuse
9. **Spiritual Warfare in Marriage** — Breaking spiritual strongholds
10. **Scripture vs Christian Culture** — Power and freedom, not religion
11. **Sexual Dysfunction & Trauma** — Professional help resources
12. **Supporting Your Partner** — How to help and protect yourself

### 🛡️ Crisis Support
- Immediate practical and spiritual help
- Situation-specific guidance for acute struggles
- Emergency resources and hotlines

### 🎮 Gamification
- Daily streak tracking 🔥
- Point system (100 pts per module, 10 pts per scripture)
- Progress visualization
- Achievement badges

### 💾 Data Persistence
- All progress saved locally (localStorage)
- Export your data anytime
- Resume where you left off
- Sync across sessions

## Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Storage:** Browser localStorage
- **Deployment:** Netlify (configured via `netlify.toml`)
- **Responsive:** Mobile-first design (390px phone mockup, responsive to larger screens)

## Installation & Setup

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Feathersabound/Restored.git
cd Restored
```

2. Open in a browser:
```bash
# Using Python (any version)
python -m http.server 8000

# Or using Node.js
npx http-server

# Or just open directly
open restored/index.html
```

3. Visit `http://localhost:8000/restored/` in your browser

### Netlify Deployment

This repo is configured for automatic Netlify deployment:

1. Connect your GitHub repo to Netlify
2. Netlify will automatically use `netlify.toml` configuration
3. The `publish` directory is set to `restored/`
4. Site will be live at your Netlify URL

## Project Structure

```
restored/
├── index.html              # Home/Dashboard page
├── assess.html            # Assessment questionnaire
├── journey.html           # Healing journey/pathway view
├── pathway.html           # Pathway selector
├── crisis/
│   └── index.html        # Crisis support page
├── modules/              # 12 healing modules
│   ├── communion.html
│   ├── soul-ties.html
│   ├── father-wound.html
│   ├── renewing-mind.html
│   ├── legal-ground.html
│   ├── demonic-patterns.html
│   ├── emotional-traps.html
│   ├── rebuilding-identity.html
│   ├── warfare-marriage.html
│   ├── scripture-challenge.html
│   ├── sexual-dysfunction.html
│   ├── partner-support.html
│   └── covenant-intimacy.html
├── css/
│   └── main.css          # Consolidated styles
├── js/
│   ├── app.js            # Main app logic
│   ├── ui.js             # UI interactions
│   ├── storage.js        # localStorage management
│   └── sw.js             # Service worker (PWA)
└── manifest.json         # PWA configuration
```

## Data Management

### LocalStorage Keys

- `streak` — Current day streak count
- `lastVisit` — ISO date of last visit
- `points` — Total gamification points
- `completed` — JSON array of completed modules
- `tier` — Selected content depth (gentle/adult/detailed)
- `checklist` — Module completion checkboxes

### Export Your Data

Click the "Export Data" button to download your progress as JSON. Includes:
- All completed modules
- Current streak and points
- All saved checkboxes
- Timestamp of export

### Import Data

Paste previously exported JSON to restore progress across browsers or devices.

## Accessibility

- Full keyboard navigation support
- ARIA labels for screen readers
- High contrast mode available
- Semantic HTML structure
- Color-independent visual indicators

## PWA (Progressive Web App)

This app works offline and can be installed:

1. **Android:** Add to Home Screen via Chrome menu
2. **iOS:** Use Safari → Share → Add to Home Screen
3. **Desktop:** Install from browser (Chrome, Edge, Firefox)

Once installed, the app works offline with cached assets.

## Crisis Resources

If you're struggling, please reach out:

### Immediate Help
- **National Sexual Assault Hotline:** 1-800-656-4673 (RAINN)
- **Crisis Text Line:** Text HOME to 741741
- **National Suicide Prevention:** 1-800-273-8255
- **988 Suicide & Crisis Lifeline:** Call/Text 988

### Professional Support
- EMDR Therapist Directory: https://www.emdria.org
- Christian Counselor Directory: https://www.aacc.net
- Local Pastoral Care: Contact your church

## For Partners

If your spouse is healing:
- Be patient — trauma takes time
- Avoid pressure or judgment
- Use the "Supporting Your Partner" module
- Consider counseling together
- Celebrate progress, not perfection

## Customization

### Modify Content
- Edit HTML files directly to change module content
- Update colors in CSS (look for CSS variables in `:root`)
- Add new modules by duplicating template files

### Change Color Scheme
Open `restored/css/main.css` and modify:
```css
:root {
  --red: #B91C1C;           /* Primary color */
  --gold: #B45309;          /* Accent color */
  --black: #111;            /* Text */
}
```

## Contributing

This is a spiritual healing tool. Contributions should:
- Maintain theological integrity
- Add practical value to healing
- Be respectful of trauma survivors
- Include accessibility features

## License

This project is provided as-is for personal and ministry use. 

## Support & Feedback

- **Found a bug?** Open an issue on GitHub
- **Have suggestions?** Submit a feature request
- **Want to contribute?** See Contributing section above

## Prayer & Foundation

> *"If the Son sets you free, you will be free indeed." — John 8:36*

This app exists because God is with you. He sees your pain. He has paid the price for your freedom. Your work is not to earn it through willpower, but to receive it through surrender and His presence.

---

**Created with ❤️ for wholeness and restoration in Christ**
