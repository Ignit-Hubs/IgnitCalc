#  IgniteCalc: Modern Calculation & Academic Suite

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Turnstile](https://img.shields.io/badge/Cloudflare_Turnstile-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://www.cloudflare.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

##  Overview

**IgniteCalc** is a fast, responsive, modern frontend calculation suite built with **React**, **TypeScript (TSX)**, and **Tailwind CSS**. It provides a clean, unified experience for everyday arithmetic, scientific STEM calculations, and college/university CGPA tracking.

The application features:
- **Welcome Landing Page**: An introduction showcasing the suite features with quick-launch actions.
- **Authentication (Sign In & Sign Up)**: Support for Google Sign In, Apple Sign In, and Email/Password with Cloudflare Turnstile "Verify you are human" protection.
- **Calculator Engine**: Standard Arithmetic, full Scientific calculations (trigonometry, logarithms, factorials, roots, DEG/RAD), and a 5.0-scale CGPA academic grader.
- **Calculation History**: Automatic local session storage of previous calculations with timestamps and quick-copy.
- **Clean Responsive Design**: Adapts naturally across mobile phones, tablets, and desktop computers without artificial simulator borders or reflections.

---

##  Key Features

### 1.  Standard Calculator
- Essential operations: addition, subtraction, multiplication, division, and percentage.
- Full keyboard listener support: use numbers, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, and `Escape`.
- Floating-point accuracy handling to avoid standard JavaScript rounding issues.

### 2. 🔬 Scientific Calculator
- **Trigonometric Functions**: `sin`, `cos`, `tan`, and their inverses (`sin⁻¹`, `cos⁻¹`, `tan⁻¹`).
- **Angle Modes**: Switch between **Degrees (DEG)** and **Radians (RAD)**.
- **Logarithmic Functions**: Base-10 (`log`) and Natural logarithm (`ln`).
- **Powers & Roots**: `x²`, `x³`, `xʸ`, `√`, `∛`.
- **Factorials**: `n!` (e.g., `5! = 120`).
- **Constants**: High-precision $\pi$ and $e$.
- **Additional**: Negation (`±`), Reciprocal (`1/x`), Absolute value (`|x|`), and `RAND`.

### 3.  CGPA & Academic Grader (5.0 Scale)
- Dynamically add or remove courses for any semester.
- Enter credit units and select letter grades (A = 5, B = 4, C = 3, D = 2, E = 1, F = 0).
- Instant GPA calculation with academic standing (First Class, Second Class Upper, Second Class Lower, Third Class, or Probation).

### 4.  Cloudflare Human Verification
- Integrated Cloudflare Turnstile widget requiring a quick human verification check before signing up or logging in.

### 5.  Google, Apple & Email Authentication
- One-click Google and Apple sign-in.
- Email and password sign-in / registration with password confirmation.
- Option to continue as Guest without needing an account.

---

##  Tech Stack

- **Language**: TypeScript (`.ts`, `.tsx`)
- **UI Library**: React 19
- **Styling**: Tailwind CSS & Vanilla CSS custom utilities
- **Icons**: Lucide React
- **Build Tool**: Vite

---

##  Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **http://127.0.0.1:5173** (or http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🎤 How to Present This Project

If you are presenting this project in a demo, interview, or review:

1. **Introduction**:
   - *"IgniteCalc is a modern computational suite built with React and TypeScript. It solves three common needs: everyday math, advanced scientific calculations, and university CGPA tracking."*
2. **Page Flow**:
   - Start on the **Welcome Page** to show the clean landing layout.
   - Click **Sign In** or **Create Account** to demonstrate the authentication interface with Google, Apple, and the interactive Cloudflare Turnstile human verification check.
   - Click **Open Calculator** (or Continue as Guest) to transition straight into the calculation workspace.
3. **Core Functionality**:
   - Demonstrate the **Standard Calculator** with keyboard input.
   - Switch to the **Scientific Calculator**, toggle between DEG and RAD, and calculate a function like `sin(30)` or `5!`.
   - Switch to the **CGPA Calculator**, add 2–3 courses with units and grades, and show the real-time GPA and class of degree output.
   - Open **Logs** to show how operations are stored and timestamped.
4. **Architecture**:
   - Mention the pure frontend TypeScript architecture, modular component structure (`WelcomeView`, `AuthView`, `StandardCalculator`, `ScientificCalculator`, `CGPACalculator`), and how state is preserved locally.
