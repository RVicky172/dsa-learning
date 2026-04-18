<div align="center">
  <h1>🚀 DSA Master</h1>
  <p>Your ultimate interactive guide to mastering Data Structures, Algorithms, and Big-O Notation.</p>
</div>

<br />

<div align="center">
  <!-- Badges -->
  <img src="https://img.shields.io/badge/React-19-blue.svg?style=flat&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue.svg?style=flat&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF.svg?style=flat&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=flat&logo=tailwind-css" alt="Tailwind CSS" />
</div>

<br />

## 📖 About The Project

DSA Master is a modern, highly interactive web application designed to help learners and professionals strengthen their foundational knowledge of Data Structures and Algorithms. With a clear UI built using React 19, Tailwind CSS, and Framer Motion, studying for coding interviews and understanding complex data concepts has never been more engaging.

### ✨ Key Features

- **📚 Interactive Visualizers**: Real-time visual representations of data structures and algorithm execution.
- **⏱️ Big-O Notation Guide**: Master time & space complexity with rich, interactive charts using Recharts.
- **💻 Problem Practice**: Test your skills against a curated list of algorithmic challenges.
- **🗺️ Learning Roadmap**: Follow a structured pathway from beginner to advanced topics.
- **⚡ Blazing Fast**: Built with Vite and React lazy loading for immediate interactions and zero-lag rendering.
- **🌙 Theming Support**: Sleek UI tailored for comfortable reading and focused learning.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Persistence**: [idb-keyval](https://github.com/jakearchibald/idb-keyval) (IndexedDB wrapper)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher is recommended)
- `npm` (usually comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dsa-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   *The server will start at `http://localhost:5173/` (or the port shown in your terminal). Open it in your browser.*

---

## 📂 Project Structure

```text
dsa-learning/
├── src/
│   ├── components/         # Reusable UI components (Visualizers, Navbars, Cards)
│   ├── contexts/           # Global React Context providers (State management)
│   ├── data/               # Curriculum data, topic definitions, and problem sets
│   ├── hooks/              # Custom logic hooks (e.g., visualizer state control)
│   ├── pages/              # Main view compositions
│   ├── types/              # Global TypeScript interfaces and type definitions
│   ├── App.tsx             # Root React component & routing logic
│   └── main.tsx            # React application entry point
```

---

## 📜 Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Type-checks codebase and builds for production.
- `npm run preview`: Previews the local production build.
- `npm run lint`: Runs ESLint to evaluate code quality.

---

## 🤝 Contributing

We welcome contributions! Whether it's adding new problems, fixing typos, or optimizing the code, please feel free to:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the terms of the MIT License.
