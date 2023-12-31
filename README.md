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

## Installation

Clone the repository:

```bash
git clone https://github.com/Andy6440/spotify.git

```

## Install the dependencies

```bash
npm install
```

## Environment Variables Setup

- Review the `.env-copy` file to see the required environment variables and set them up in a `.en` file.

## Build and run the Docker container

```bash
docker-compose build
docker-compose up
```

## Authorization

- After starting the containers, you need to authorize the API. Visit <http://localhost:8888/login> to do so. Once logged in, you'll receive an access token that lasts for one hour.

## Access

- With the API authorized, you can now use it as intended. The application will be accessible at <http://localhost:8888>. Additionally, you can access the Mongo-Express interface at <http://localhost:8081> to manage the database.

## API Documentation

- For detailed documentation on the available endpoints, please refer to our Postman collection at the following link:

<https://api.postman.com/collections/20417239-4f105d22-529d-4836-839e-5b1c7b3e5a23?access_key=PMAT-01HA2SX5S2Y4YK3YEX6933QE4Y>

This collection provides comprehensive information on each endpoint, including request format, expected responses, and example queries.
GitHub: @Andy6440
