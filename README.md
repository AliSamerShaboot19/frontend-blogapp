# MyBlog Frontend

A modern React-powered blog application frontend designed for reading, writing, and managing blog posts with authentication, profiles, categories, comments, and admin tools.

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://react.dev/) [![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-764ABC?logo=redux)](https://redux-toolkit.js.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-06B6D4?logo=tailwindcss)](https://tailwindcss.com/) [![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify)](https://netlify.com)

## Overview

This project is the frontend for a blog platform where users can:

- Browse the latest posts and categories
- Read individual post details
- Create, update, and manage blog posts
- Register and log in securely
- Reset or verify email accounts
- Visit user profiles
- Use an admin dashboard for content moderation

The app uses a clean single-page interface with routing, Redux state management, animated UI elements, and a responsive layout.

## Tech Stack

- React 19
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS
- Framer Motion
- React Icons
- SweetAlert
- React Toastify

## Features

### User Experience
- Responsive header and mobile navigation
- Modern card-based blog layout
- Category-based browsing
- Post detail pages
- Smooth transitions and motion effects

### Authentication
- Login and registration flows
- Email verification support
- Forgot password and reset password pages
- User session management with Redux

### Content Management
- Create new blog posts
- View posts by category
- Display post author and metadata
- Comment and admin moderation support

### Admin Tools
- Admin dashboard
- Users table
- Posts table
- Categories table
- Comments table

## Project Structure

```bash
frontend-blogapp/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── footer/
│   │   ├── categories/
│   │   ├── sidebar/
│   │   └── ...
│   ├── pages/
│   │   ├── admin/
│   │   ├── forms/
│   │   ├── posts/
│   │   ├── profile/
│   │   ├── verifyemail/
│   │   └── ...
│   ├── redux/
│   │   ├── api/
│   │   ├── slices/
│   │   └── store.js
│   ├── utils/
│   │   └── request.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── netlify.toml
├── package.json
├── package-lock.json
├── tailwind.config.js
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/AliSamerShaboot19/frontend-blogapp.git
cd frontend-blogapp
npm install
```

### Run locally

```bash
npm start
```

The app will run in development mode at:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm start
```
Runs the app in development mode.

```bash
npm run build
```
Builds the app for production in the `build` folder.

```bash
npm test
```
Runs test cases in interactive mode.

```bash
npm run eject
```
Removes the single build dependency and exposes the full configuration.

## Backend API

This frontend communicates with a backend API configured in:

```js
src/utils/request.js
```

```js
const request = axios.create({
  baseURL: "https://backend-blogapp-6kc2.onrender.com",
});
```

If your backend is running elsewhere, update the `baseURL` to match your API server.

## Deployment

This project includes a Netlify configuration:

```toml
[build]
  command = "npm run build"
  publish = "build"
```

You can deploy this app directly to Netlify or any static hosting platform that supports React build output.

## Notes

- This repository contains the frontend only.
- A backend service is required for authentication, posts, categories, and admin data.
- The app is built with a modern UI and production-ready build setup using CRA + Tailwind.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact

For questions or feedback, contact the project maintainer via GitHub.
