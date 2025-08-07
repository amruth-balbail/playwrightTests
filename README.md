# Playwright Test Automation Framework

## Overview

Basic Playwright framework for testing [saucedemo.com](https://www.saucedemo.com). Uses **testConstants approach** for locator management and integrates with **GitHub Actions** and **Jenkins**.

## 🎯 Purpose

- Automated testing of Sauce Labs demo website
- Demonstrates Playwright best practices
- CI/CD integration with multiple platforms
- Uses parameterized locators via testConstants.js

## 🏗️ Framework Structure

```
playwrightTests/
├── .github/workflows/     # GitHub Actions
├── tests/                 # Test specifications
├── utils/                 # Utility functions
├── global-setup.js        # Authentication
├── playwright.config.js   # Playwright config
├── testConstants.js       # Centralized locators
├── Jenkinsfile           # Jenkins pipeline
└── package.json          # Dependencies
```

## 🔧 Key Features

- **TestConstants**: Centralized locators in `testConstants.js`
- **Authentication**: Global setup for login automation
- **CI/CD**: GitHub Actions + Jenkins integration
- **Reports**: HTML test reports and artifacts

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/amruth-balbail/playwrightTests
cd playwrightTests
npm install
npx playwright install
```

### Environment Setup

**Local Development:**

```bash
# Create .env file
BASE_URL=https://www.saucedemo.com
LOGIN_USER=your_username (get it from https://www.saucedemo.com)
PASSWORD=your_password (get it from https://www.saucedemo.com)
```

**CI/CD:**

- **GitHub Actions**: Add secrets/variables in repository settings
- **Jenkins**: Add credentials in Jenkins configuration

### Running Tests

```bash
# Run all tests
npm test

# UI mode
npm run test:ui

# Debug mode
npm run test:debug
```

## 🔄 CI/CD Integration

### GitHub Actions

- **Workflow**: `.github/workflows/playwright.yml`
- **Triggers**: Push to main/master, Pull requests
- **Artifacts**: Test reports, screenshots, videos

### Jenkins

- **Pipeline**: `Jenkinsfile`
- **Agent**: Linux-based Jenkins agent
- **Reports**: HTML publisher plugin

## 📊 Test Reports

- **HTML Reports**: `playwright-report/`
- **Artifacts**: Screenshots, videos, traces
- **Access**: Available in both GitHub Actions and Jenkins

## 🔐 Security

- **Local**: `.env` file (not committed)
- **GitHub Actions**: Repository secrets/variables
- **Jenkins**: Credential manager

## 🐛 Troubleshooting

```bash
# Install browsers
npx playwright install

# Debug mode
npx playwright test --debug

# Show report
npx playwright show-report
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Sauce Demo Website](https://www.saucedemo.com/)

---

**Note**: This framework demonstrates modern test automation practices with Playwright, focusing on maintainability, CI/CD integration, and best practices for web application testing.
