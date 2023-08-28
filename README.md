# Spotify Playlist Manager

Spotify Playlist Manager is an application that allows users to manage their Spotify playlists. With this tool, users can create, edit, and delete playlists, as well as add and remove songs. The application is containerized using Docker and runs on port 8888.

## Features
- Create Playlists: Create new playlists with your favorite songs.
- Edit Playlists: Modify the name, description, and visibility of your playlists.
- Manage Songs: Add and remove songs from your playlists.

## Requirements
- Docker
- Node.js v18.0.0 or higher
- A Spotify developer account and a valid access token

##  Installation

Clone the repository:

```bash

Copy code
git clone https://github.com/Andy6440/spotify.git

```

Install the dependencies:
    
```bash
Copy code
npm install
Review the .env-copy file to see the necessary environment variables and set them up in a .env file.
```
## Build and run the Docker container:

```bash
Copy code
docker-compose build
docker-compose up
```

The application will be accessible at `http://localhost:8888`.

GitHub: @Andy6440