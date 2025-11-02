# GADGET 360 Landing Page

A high-fashion landing page for GADGET 360, featuring an elegant design with a full-screen background texture.

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Replacing Images

### Background Image
Replace `/public/background-texture.svg` with your high-fashion background image (textured leather, brushed titanium, marble, etc.). You can use:
- `.jpg`, `.png`, or `.webp` formats
- Recommended size: 1920x1080px or larger
- Update the CSS in `src/LandingPage.css` line 9 if you change the filename

### Logo
Replace `/public/logo.svg` with your custom logo. The current logo is a placeholder SVG.

## Project Structure

```
latprac/
├── public/
│   ├── logo.svg              # Logo file (replace with your logo)
│   └── background-texture.svg # Background image (replace with your image)
├── src/
│   ├── LandingPage.jsx        # Main landing page component
│   ├── LandingPage.css        # Landing page styles
│   ├── App.jsx                # App component
│   ├── App.css                # App styles
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── index.html                  # HTML entry point
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies and scripts
```

## Features

- ✅ Full-screen background with overlay
- ✅ Elegant centered layout
- ✅ Responsive design
- ✅ Email capture form
- ✅ Clean, modern typography (Inter font)
- ✅ Smooth transitions and hover effects

## Customization

- **Colors**: Edit `src/LandingPage.css` to change colors, opacity, and styling
- **Text**: Edit `src/LandingPage.jsx` to modify headlines and copy
- **Layout**: Adjust spacing and sizing in `src/LandingPage.css`
