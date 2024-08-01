### Frontend README

This repository contains the frontend part of the assignment.
The frontend is built with React and interacts with the backend to provide a chat interface for users to get information about artists.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Fetching Data from Spotify](#fetching-data-from-spotify)
- [Thank You](#thank-you)

## Project Overview

The frontend application allows users to chat with an AI about various artists.
It provides an interface to send and receive messages, and it caches the chat history locally for persistence.

## Features

- Chat interface for interacting with AI
- Persistent chat history using local storage
- File attachment support (as a future work)
- Responsive design

## Technologies Used

- React
- React Router
- UUID
- Axios
- CSS Modules
- Gemini API (with specific customization)
- Spotify API

## Setup and Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AMGit21/spotifyGenresArtists-GeminiChat-frontend.git
   cd spotifyGenresArtists-GeminiChat-frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running the Application

To start the development server, run:

```sh
npm start
```

This will start the application on http://localhost:3000.

## Usage

Open the application in your browser: http://localhost:3000.
After running the server side:
Use the chat interface to view the artists genres and to ask questions about them.
The application will interact with the backend to fetch responses and display them in the chat.

## Folder Structure

```
spotifyGenresArtists-GeminiChat-frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── imgs/
│   │   |   └── defaultImg.jpg
│   ├── components/
│   │   ├── Artist/
│   │   |   ├── index.js
│   │   |   └── artist.module.css
│   │   ├── GenreCard/
│   │   |   ├── index.js
│   │   |   └── genreCard.module.css
│   │   ├── NavbarArtists/
│   │   |   ├── index.js
│   │   |   └── navbarArtists.module.css
│   │   └── NavbarChat/
│   │       ├── index.js
│   │       └── navbarChat.module.css
│   ├── hooks/
│   │   ├── useFetch.js
│   │   └── usePost.js
│   ├── pages/
│   │   ├── Artists/
│   │   |   ├── Index.js
│   │   |   └── artists.module.css
│   │   ├── Chat/
│   │   |   ├── Index.js
│   │   |   └── chat.module.css
│   │   ├── Genres/
│   │   |   ├── Index.js
│   │   |   └── genres.module.css
│   │   └── NoPage/
│   │       ├── index.js
│   │   |   └── noPage.module.css
│   ├── utils/
│   │   ├── cacheData.js
│   │   └── fetchDataFromApi.js
│   │   └── fetchPostDataFromApi.js
│   │   └── getCachedData.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Fetching Data from Spotify

The application fetches genres and artists data from the Spotify API to enhance the chat experience.
The data is used to provide accurate and up-to-date information about artists.

## Thank You

Thank you for checking out this project. Feel free to reach out if you have any questions or feedback.

```
