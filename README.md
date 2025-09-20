[![](https://img.shields.io/badge/hold_my_bag_1.0.0-passing-green)](https://github.com/gongahkia/hold-my-bag/releases/tag/1.0.0) 

## Todo

* add actual code files to backend api
* add actual code files to react frontend
* add actual code files to electron app
* test docker compose build
* build out packages and script
* put within client/.env

```env
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=ws://localhost:4000
```

* put within server.env

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/holdmybag
REDIS_URL=redis://localhost:6379
JWT_SECRET=changeme
```

# `HoldMyBag`

Quick party games for when you're waiting around - because boredom is the real enemy.

## Rationale

Ever found yourself in that awkward limbo where you're waiting for something but don't want to commit to anything substantial? Maybe you're at a restaurant waiting for your chronically late friend, stuck in a lobby, or procrastinating on actual work. HoldMyBag was born from the realization that modern humans have an attention span of approximately 3.2 seconds and need instant gratification in bite-sized, multiplayer formats. It's like having a pocket-sized arcade that doesn't require quarters, just WiFi and questionable decision-making skills.

## Stack

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Vite 5.4** for lightning-fast development and hot module replacement
- **Tailwind CSS** for utility-first styling and responsive design
- **Framer Motion** for smooth animations and micro-interactions
- **Redux Toolkit** for predictable state management
- **React Router** for client-side routing

### Backend
- **Node.js** with Express.js for RESTful API development
- **Socket.io** for real-time multiplayer game communication
- **JWT** for stateless authentication
- **bcrypt** for password hashing and security

### Database
- **PostgreSQL** for relational data storage (users, games, scores)
- **Redis** for session management and real-time game state caching

### Deployment
- **Docker** with Docker Compose for containerized development
- **Nginx** for reverse proxy and static file serving
- **GitHub Actions** for CI/CD pipeline

### Other Technologies
- **Electron** (planned) for desktop application packaging
- **PWA** capabilities for mobile-first experience
- **ESLint + Prettier** for code quality and consistency

## Screenshots

*Coming soon - currently showcasing the interactive demo!*

## Usage

### Quick Start

```bash
# Clone the repository
git clone https://github.com/gongahkia/hold-my-bag.git
cd hold-my-bag

# Install dependencies
npm install

# Start the development server
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

### Development Commands

```bash
# Frontend development
cd client
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend development (when implemented)
cd server
npm run dev          # Start Express server with nodemon
npm run start        # Start production server

# Full stack development
docker-compose up    # Start all services with Docker
```

## Support

HoldMyBag is designed to work across multiple platforms:

- **Web Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Devices**: iOS 14+ (Safari), Android 8+ (Chrome)
- **Desktop**: Windows 10+, macOS 10.15+, Linux (Ubuntu 20.04+)
- **Development**: Node.js 18+, npm 8+, Docker 20+

## Architecture

### System Overview
```mermaid
C4Context
    title System Context Diagram for HoldMyBag

    Person(players, "Players", "Users playing quick party games")
    System(holdmybag, "HoldMyBag", "Multiplayer party game platform")
    System_Ext(browser, "Web Browser", "Client application")
    System_Ext(redis, "Redis", "Session & game state cache")
    System_Ext(postgres, "PostgreSQL", "User data & game history")

    Rel(players, browser, "Plays games via")
    Rel(browser, holdmybag, "Sends requests to", "HTTPS/WSS")
    Rel(holdmybag, redis, "Caches game state", "TCP")
    Rel(holdmybag, postgres, "Stores user data", "TCP")
```

### Container Diagram
```mermaid
C4Container
    title Container Diagram for HoldMyBag

    Person(players, "Players")

    Container_Boundary(c1, "HoldMyBag System") {
        Container(webapp, "Web Application", "React + TypeScript", "Delivers game interface and handles user interactions")
        Container(api, "API Server", "Node.js + Express", "Handles authentication, game logic, and real-time communication")
        Container(gameengine, "Game Engine", "Socket.io", "Manages real-time multiplayer game sessions")
    }

    ContainerDb(redis, "Cache Store", "Redis", "Stores active game sessions and real-time state")
    ContainerDb(database, "Database", "PostgreSQL", "Stores user profiles, game history, and leaderboards")

    Rel(players, webapp, "Plays games", "HTTPS")
    Rel(webapp, api, "Makes API calls", "HTTPS/JSON")
    Rel(webapp, gameengine, "Real-time updates", "WebSocket")
    Rel(api, database, "Reads/writes", "SQL")
    Rel(gameengine, redis, "Game state", "TCP")
    Rel(api, redis, "Session data", "TCP")
```

### Component Diagram - Web Application
```mermaid
C4Component
    title Component Diagram for Web Application

    Container(webapp, "Web Application", "React + TypeScript")

    Component(auth, "Authentication", "React Components", "Login/logout, user session management")
    Component(gamelobby, "Game Lobby", "React Components", "Room creation, joining, player management")
    Component(gameui, "Game Interface", "React Components", "Individual game implementations and UI")
    Component(profile, "User Profile", "React Components", "Stats, achievements, game history")
    Component(router, "Router", "React Router", "Client-side navigation and route management")
    Component(store, "State Store", "Redux Toolkit", "Global application state management")
    Component(api, "API Client", "Fetch/Axios", "HTTP requests to backend API")
    Component(socket, "Socket Client", "Socket.io Client", "Real-time communication with game engine")

    Rel(auth, store, "Updates user state")
    Rel(gamelobby, api, "Room operations")
    Rel(gamelobby, socket, "Real-time lobby updates")
    Rel(gameui, socket, "Game actions & events")
    Rel(profile, api, "Fetches user data")
    Rel(router, auth, "Route protection")
    Rel(store, api, "Authentication headers")
```

### Deployment Diagram
```mermaid
C4Deployment
    title Deployment Diagram for HoldMyBag

    Deployment_Node(client, "Client Device", "Browser") {
        Container(webapp, "Web Application", "React SPA")
    }

    Deployment_Node(server, "Application Server", "Docker Container") {
        Container(nginx, "Nginx", "Reverse Proxy & Static Files")
        Container(api, "API Server", "Node.js + Express")
        Container(gameengine, "Game Engine", "Socket.io Server")
    }

    Deployment_Node(cache, "Cache Server", "Redis Container") {
        ContainerDb(redis, "Redis", "In-memory cache")
    }

    Deployment_Node(db, "Database Server", "PostgreSQL Container") {
        ContainerDb(postgres, "PostgreSQL", "Persistent storage")
    }

    Rel(webapp, nginx, "HTTPS requests")
    Rel(nginx, api, "Proxies API calls")
    Rel(nginx, gameengine, "WebSocket connections")
    Rel(api, postgres, "Database queries")
    Rel(gameengine, redis, "Game state operations")
```

## Legal

### Disclaimer

This software is provided "as is" without warranty of any kind, express or implied. The developers make no representations or warranties regarding the accuracy, reliability, or completeness of the software. Users assume all risks associated with the use of this application, including but not limited to data loss, security vulnerabilities, or excessive procrastination leading to missed deadlines.

HoldMyBag is designed for entertainment purposes only. The developers are not responsible for:
- Addiction to quick party games during work hours
- Deterioration of productivity due to "just one more game" syndrome
- Heated arguments arising from competitive multiplayer sessions
- The inevitable realization that you've been playing simple games for 3 hours straight

By using this software, you acknowledge that you are willingly entering a time vortex of casual gaming and that any resulting consequences to your schedule, relationships, or responsibilities are entirely your own fault.

### License

MIT License - See LICENSE file for details.