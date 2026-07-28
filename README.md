# Breaking Code – Official Website

**The official website for Breaking Code, the Competitive Programming & Development Club of JNTUH UCES.**

---

## Overview

Breaking Code is a student-led community at JNTUH UCES focused on competitive programming, software development, hackathons, and peer learning.

---

## Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Structure  | HTML5 (Semantic)   |
| Styling    | CSS3 (Vanilla)     |
| Logic      | Vanilla JavaScript |
| Fonts      | Google Fonts       |

No frameworks, no dependencies, no build tools required.

---

## File Structure

```
/
├── index.html          # Main HTML file
├── css/
│   ├── style.css       # Core styles, CSS variables, components
│   └── responsive.css  # All media queries / breakpoints
├── js/
│   └── script.js       # All JavaScript (modular, no libraries)
├── assets/
│   ├── images/         # Image assets
│   └── icons/          # Icon assets
└── README.md
```

---

## Sections

| Section        | Description                                       |
|----------------|---------------------------------------------------|
| Navbar         | Sticky, scrolls darker, mobile hamburger menu     |
| Hero           | Two-column layout with inline SVG code editor     |
| About          | Learn / Build / Grow card grid                    |
| Domains        | 6-card grid with SVG icons                        |
| Statistics     | Animated counters with Intersection Observer      |
| Events         | Dynamic cards rendered from JS data array         |
| Timeline       | Alternating vertical milestone timeline           |
| Team           | Dynamic cards with photo placeholder & socials    |
| FAQ            | Accordion (Vanilla JS, ARIA-compliant)            |
| Footer         | Logo, links, socials, copyright                   |

---

## Brand Colors

| Name             | Hex       |
|------------------|-----------|
| Primary Green    | `#257D2C` |
| Secondary Black  | `#161615` |
| Primary White    | `#FBFAFA` |
| Green Dark       | `#286233` |
| Green Mid        | `#54865A` |
| Green Light      | `#A5BAA6` |

---

## Fonts

- **Headings**: Space Grotesk
- **Body**: Inter
- **Code / Stats**: JetBrains Mono

---

## How to Run

Simply open `index.html` in any modern browser. No server, no build step required.

---

## Customization

### Update Events
Edit the `EVENTS_DATA` array in `js/script.js`.

### Update Team
Edit the `TEAM_DATA` array in `js/script.js`.

### Update FAQ
Edit the `FAQ_DATA` array in `js/script.js`.

### Add Member Photos
Replace the SVG placeholder in `renderTeam()` in `js/script.js` with an `<img>` tag pointing to your image files in `assets/images/`.

---

## Accessibility

- Semantic HTML5 elements (`header`, `main`, `section`, `footer`, `article`)
- ARIA roles and labels throughout
- Keyboard navigable (Escape closes mobile menu)
- `prefers-reduced-motion` respected
- Sufficient color contrast ratios

---

## Browser Support

All modern browsers (Chrome, Firefox, Edge, Safari). IE is not supported.

---

© 2026 Breaking Code · JNTUH UCES
