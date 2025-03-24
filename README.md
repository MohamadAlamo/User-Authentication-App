# React Native User Authentication App

## 📌 Project Overview

This is a React Native authentication app that allows users to sign up, log in, and log out. It supports multiple users and persists login sessions using `AsyncStorage`.

## 🚀 Features

- User Registration (sign up with name, email, and password)
- User Login (verify credentials and persist session)
- Logout (clears session but retains registered users)
- Persistent Authentication (keeps users logged in even after closing the app)
- Validation for email uniqueness during registration
- Password visibility toggle

## 🛠️ Tech Stack

- **React Native** (Expo for development)
- **React Navigation** (for screen navigation)
- **React Context API** (for authentication state management)
- **AsyncStorage** (for persistent login storage)

## 📥 Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- Expo CLI (`npx install-expo-modules@latest`)

### Steps to Run the App

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the app:
   ```sh
   npx expo start
   ```
4. Scan the QR code with Expo Go (Android) or use an iOS simulator.

## 📜 Folder Structure

```
/AUTHAPP
  ├── assets/                  # App assets (icons, images)
  ├── components/              # Reusable UI components
  │   ├── Button.tsx
  │   ├── Input.tsx
  ├── context/                 # Authentication context
  │   ├── AuthContext.js
  ├── lib/constants/           # App constants and routes
  │   ├── colors.tsx
  │   ├── index.tsx
  │   ├── routes.tsx
  ├── navigations/             # Navigation setup
  │   ├── AuthNavigator.tsx
  ├── screens/                 # App screens
  │   ├── auth/
  │   │   ├── Login.tsx
  │   │   ├── Register.tsx
  │   ├── home/
  │   │   ├── Home.tsx
  │   ├── welcome/
  │   │   ├── Welcome.tsx
  │   │   ├── index.tsx
  ├── Screenshots/             # App Screenshots
  ├── .gitignore               # Git ignore file
  ├── App.js                   # Main entry file
  ├── app.json                 # Expo app config
  ├── index.js                 # Entry point
  ├── package-lock.json        # Dependencies lock file
  ├── package.json             # Project dependencies
  ├── README.md                # Project documentation
  ├── tsconfig.json            # TypeScript config
```

## 📌 How It Works

### Registration

- Users can create an account with a unique email.
- The app saves multiple users in `AsyncStorage`.

### Login

- Users log in using their email and password.
- If credentials match, they are redirected to the Home screen.
- Their session remains active even if the app is closed.

### Logout

- Logging out removes the session but retains the registered users.
- Users must log in again to access the home screen.

## ✅ Future Improvements

- Add password reset functionality.
- Implement biometric authentication.
- Use a backend service for real authentication.


## Screenshots
- [Welcome Screen](./screenshots/Welcome screen.png)
- [Login Screen](./screenshots/Login Screen.png)
- [Signup Screen](./screenshots/Signup Screen.png)
- [Home Screen](./screenshots/Home Screen.png)



---

🛠 Developed by **Mohamad Alamo** as part of a technical assessment.
