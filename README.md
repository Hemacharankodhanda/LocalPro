
<div align="center">

# LocalPro

### Find trusted professionals, right around the corner.



**LocalPro** is a premium, hyperlocal freelancing platform that connects skilled professionals with clients in their community. Designed with a high-end "ui-ux-pro-max" aesthetic and built for speed, it makes finding local services — plumbing, cleaning, carpentry, and more — effortless and secure.

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Premium UI/UX** | Slate/indigo palette, glassmorphism (`backdrop-blur`), bento-grid layouts, and micro-animations |
| 🔍 **Smart Search & Filtering** | Instantly find local professionals by category or keyword |
| 🔐 **Firebase Authentication** | Secure sign-up and login flows |
| 🪟 **Interactive Modals** | Request services, browse worker availability, and view rich portfolios without leaving the page |
| 🎙️ **Vapi AI Assistant** | Built-in voice/AI assistant for effortless navigation |
| 💬 **Tawk.to Live Chat** | Integrated real-time customer support |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | [React](https://react.dev/) + [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Auth | [Firebase](https://firebase.google.com/) |
| State | React Hooks (`useState`, `useEffect`) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Hemacharankodhanda/LocalPro.git

# 2. Navigate into the project
cd LocalPro

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```text
LocalPro/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Modals/         # Login, Signup, Portfolio, and other popups
│   │   └── ...              # Header, Hero, Categories, Testimonials, Footer
│   ├── data/                # Mock JSON databases (workers.js)
│   ├── lib/                  # Third-party integrations (firebase.js)
│   ├── App.jsx               # Main layout and state container
│   ├── main.jsx               # React entry point
│   └── index.css               # Tailwind v4 config and global styles
├── index.html               # Vite HTML entry point (Vapi & Tawk.to scripts)
├── package.json              # Dependencies and scripts
└── README.md                  # Project documentation
```

---

## 🎨 Design System

- **Typography** — `Outfit` for bold headings, `Inter` for readable body text
- **Colors** — Slate background (`#FAFAFC`), deep slate text, vibrant Indigo (`#4F46E5`) for primary actions
- **Components** — Rounded corners (`rounded-3xl`, `rounded-2xl`), subtle border strokes, layered drop shadows (`shadow-xl`) for depth

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">

*Built with ❤️ for the community.*

</div>
