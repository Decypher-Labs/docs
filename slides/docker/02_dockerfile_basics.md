# Dockerfile Basics

A **Dockerfile** is a text file that defines how to build a Docker image.

## Basic structure

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

## Key instructions

- **FROM** — Base image
- **WORKDIR** — Set working directory inside the container
- **COPY** — Copy files from host to image
- **RUN** — Execute commands during build
- **EXPOSE** — Document which port the app uses
- **CMD** — Default command when container starts

## Building and running

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```
```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```
```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```
```js
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';

const input = '# This is a header\n\nAnd this is a paragraph'

ReactDOM.render(
  <ReactMarkdown source={input} />,
  document.getElementById('container')
)
```

Use `-t` to tag the image. Use `-p` to map host port to container port.
