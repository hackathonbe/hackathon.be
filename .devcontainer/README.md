# Dev Container Configuration

This project uses a development container configured with **Node.js 24 LTS**.

## Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code

### Opening the Project in a Dev Container

1. Open this project in VS Code
2. When prompted, click "Reopen in Container"
   - Or use the Command Palette (Cmd+Shift+P) and select "Dev Containers: Reopen in Container"
3. Wait for the container to build and start
4. The container will automatically run `npm install` after creation

## What's Included

- **Node.js 24 LTS** (Bookworm base)
- **Git** for version control
- **GitHub CLI** for GitHub operations
- **VS Code Extensions**:
  - ESLint for code linting
  - Prettier for code formatting
  - TypeScript support

## Port Forwarding

The following ports are automatically forwarded:
- `3000` - Common development server port
- `5173` - Vite development server
- `8080` - Alternative development server port

## Customization

To modify the dev container configuration, edit `.devcontainer/devcontainer.json` and rebuild the container:
- Command Palette → "Dev Containers: Rebuild Container"
