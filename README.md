# 🌍 LogoIpsum Travel Insurance

> A modern, high-performance travel insurance platform designed for speed, accessibility, and seamless user experience.

![Project Status](https://img.shields.io/badge/status-live-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📖 Overview

**LogoIpsum Travel Insurance** is a lightweight, frontend-only application that allows users to compare travel insurance plans and purchase coverage in minutes. Built with a focus on **Core Web Vitals** and **Zero Layout Shift (CLS)**, this project demonstrates how to deliver a premium user experience without the overhead of heavy JavaScript frameworks.

## ✨ Key Features

-   **⚡ Blazing Fast Performance**: Zero build step, purely static assets, and optimized for instant load times.
-   **📱 Mobile-First Design**: Fully responsive interface that adapts seamlessly from desktop to mobile devices using Tailwind CSS.
-   **🛡️ Secure & Validated**: Input validation for dates, destinations, and traveller ages.
-   **💾 Session Persistence**: Maintains user state (Trip details, Quote selection) across pages using local session storage.
-   **♿ Accessible**: Semantic HTML5 structure ensuring compatibility with screen readers and keyboard navigation.

## 🛠️ Tech Stack

-   **Core**: HTML5, CSS3, Vanilla JavaScript (ES6+)
-   **Styling**: Tailwind CSS (Utility-first framework)
-   **Icons**: Lucide Icons
-   **Fonts**: Google Fonts (Inter & Saira)
-   **Deployment**: Vercel / Netlify / GitHub Pages (Static Hosting)

## 🚀 Getting Started

This project requires no build tools or package managers to run. It effectively runs on any static file server.

### Prerequisites

-   A modern web browser (Chrome, Firefox, Safari, Edge)
-   Any local server (optional, but recommended for testing)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Suraj231194/Figma-to-HTML5-CSS3-Javascript.git
    cd Figma-to-HTML5-CSS3-Javascript
    ```

2.  **Run Locally**
    You can use `npx`, Python, or any other static server.
    
    *Using Node.js:*
    ```bash
    npx http-server .
    ```
    
    *Using Python:*
    ```bash
    python -m http.server
    ```

3.  **Open in Browser**
    Visit `http://localhost:8080` (or the port shown in your terminal).

## 📂 Project Structure

```text
/
├── index.html          # Landing Page (Quote Widget, Hero)
├── quote.html          # Quote Results & Plan Comparison
├── payment.html        # Secure Payment Gateway Placeholder
├── assets/
│   ├── css/            # Custom Styles & Overrides
│   ├── js/             # Application Logic (main.js)
│   └── images/         # Optimized Static Assets
└── README.md           # Project Documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
