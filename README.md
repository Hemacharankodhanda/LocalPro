<div align="center">

# LocalPro

### Find trusted professionals, right around the corner.

![LocalPro Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=LOCALPRO+-+Hyperlocal+Freelancing)

**LocalPro** is a premium, hyperlocal freelancing platform that connects skilled professionals with clients in their community. Designed with a high-end "ui-ux-pro-max" aesthetic and built for speed, it makes finding local services — plumbing, cleaning, carpentry, and more — effortless and secure.

</div>

---

## ✨ Features

- **🎨 Premium UI/UX Design**: Built using strict "ui-ux-pro-max" intelligence, featuring a sleek slate/indigo color palette, glassmorphism (`backdrop-blur`), bento-grid layouts, and micro-animations.
- **🔍 Smart Search & Filtering**: Instantly search for local professionals by category or keyword.
- **🔐 Firebase Authentication**: Secure user login and registration powered by Firebase Auth.
- **🪟 Interactive Modals**: Seamlessly request services, view available workers, and browse rich worker portfolios without ever leaving the page.
- **🎙️ Vapi AI Assistant Integration**: Built-in voice/AI assistant to help users navigate the platform effortlessly.
- **💬 Tawk.to Live Chat**: Integrated customer support via live chat.

---

## 🛠 Tech Stack

- **Frontend Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) (for blazing fast HMR and optimized builds)
- **Styling**: [Tailwind CSS (v4)](https://tailwindcss.com/) for utility-first, modern responsive design
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, scalable vector icons
- **Authentication**: [Firebase](https://firebase.google.com/)
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Hemacharankodhanda/LocalPro.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd LocalPro
   ```

3. **Install NPM packages**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

---

## 📁 Project Structure

```text
LocalPro/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Modals/         # Interactive popup modals (Login, Signup, Portfolio, etc.)
│   │   └── ...             # Header, Hero, Categories, Testimonials, Footer
│   ├── data/               # Mock JSON databases (workers.js)
│   ├── lib/                # Third-party integrations (firebase.js)
│   ├── App.jsx             # Main layout and state container
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind v4 configuration and global styles
├── index.html              # Vite HTML entry point (contains Vapi & Tawk.to scripts)
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

---

## 🎨 Design System

The application strictly adheres to the following design rules:
- **Typography**: `Outfit` for bold, impactful headings; `Inter` for highly readable body text.
- **Colors**: Slate backgrounds (`#FAFAFC`), deep slate text, and vibrant Indigo (`#4F46E5`) primary actions.
- **Components**: Heavy use of rounded corners (`rounded-3xl`, `rounded-2xl`), subtle border strokes, and layered drop shadows (`shadow-xl`) to create depth.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ for the community.*
