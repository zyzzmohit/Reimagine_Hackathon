# YouTube Zen (FocusTube) - Reimagine Hackathon

**YouTube Zen** is a reimagined YouTube interface designed to combat doom-scrolling and transform the platform from a distraction machine into a focused learning environment.

built for the **Reimagine Hackathon**.

![Zen Mode Demo](./src/assets/zen-demo.png) _(Note: Add a screenshot here)_

## 🚀 The Problem

YouTube is the world's best learning library, but it's designed like a casino.

- **Thumbnails** are clickbait designed to hijack your attention.
- **Shorts** promote infinite doom-scrolling.
- **Recommendations** lead you down rabbit holes when you just wanted to study.

## 💡 The Solution: YouTube Zen

We didn't just hide elements; we created a **Hybrid Interface** that adapts to your intent.

### 1. 🌓 Hybrid Player Modes

The app features two distinct states:

- **Entertainment Mode (Default)**: Behaves like standard YouTube. Comments, recommendations, and socials are visible.
- **Zen Mode (Focus)**: Acts as a **Lecture Hall**.
  - **Cinema Mode Locked**: Video takes center stage.
  - **No Comments**: Zero community distractions.
  - **Notes Sidebar**: Replaces "Recommended Videos" with a persistent scratchpad for your study notes.

### 2. 👁️ "Spoiler Curtain" UI

In Zen Mode, visual noise is strictly controlled:

- **Blurred Thumbnails**: All video thumbnails are blurred to prevent visual hook/clickbait.
- **Readable Text**: Titles remain clear, allowing you to choose content based on _value_, not _virality_.
- **Hidden Shorts**: The Shorts shelf is completely removed.

### 3. 🎯 Focus Sessions & Guardrails

Don't just watch—set an intent.

- **Focus Wizard**: Before entering Zen Mode, you are prompted: _"What is your goal?"_ (e.g., "Learn React Hooks").
- **Strict Guardrails**: If you set a goal, the app **actively blocks** unconnected content. Search for "Cute Puppies" during a "Physics" session? **Blocked.**

### 4. 🍅 Integrated Pomodoro

The Lecture Hall Player includes a built-in study timer.

- **Customizable Duration**: Set your session length (25m, 50m, etc.).
- **Break Enforcer**: When time is up, a "Take a Break" overlay covers the screen, forcing you to step away and refresh.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS (Custom "YouTube Black" palette)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 How to Run

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/Reimagine_Hackathon.git
    cd Reimagine_Hackathon
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run development server:
    ```bash
    npm run dev
    ```

## 🌟 Why This Matters

We are reclaiming our attention economy. YouTube Zen proves that you can build "Pro-User" interfaces that prioritize the user's mental well-being and goals over platform engagement metrics.
