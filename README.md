# Spotify Playlist Manager

- Spotify Playlist Manager is an application that allows users to manage their Spotify playlists. With this tool, users can create, edit, and delete playlists, as well as add and remove songs. The application is containerized using Docker and runs on port 8888.

## Features
- playlist management: Create,edit and delete your playlist.
- Song Management: Add and remove songs from your playlists.
- Database: working on it.
- Database Interface: Uses Mongo-Express for a web-based interface to view and manage the database.

## Requirements
- Docker and Docker Compose
- Node.js v18.0.0 or higher
- A Spotify developer account and a valid access token
- MongoDB (containerized with Docker)


##  Installation

Clone the repository:

```bash
git clone https://github.com/Andy6440/spotify.git

```

## Install the dependencies:
    
```bash
npm install
```
## Environment Variables Setup:
- Review the `.env-copy` file to see the required environment variables and set them up in a `.en` file.

## Build and run the Docker container:

```bash
docker-compose build
docker-compose up
```
## Access:
- Once the containers are up and running, the application will be accessible at `http://localhost:8888`. Additionally, you can access the Mongo-Express interface at `http://localhost:8081` to manage the database.

GitHub: @Andy6440