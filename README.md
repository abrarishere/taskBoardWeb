# Task Board Application

This is a Task Board application built with a React frontend and an Express backend. The application allows users to create, update, and manage tasks within different task boards.

## Features

- Create, update, and delete tasks
- Organize tasks into different task boards
- Persistent task data using MongoDB
- User-friendly interface with React
- Secure API with Express and Mongoose

## Technologies Used

- **Frontend**: React, Axios, Tailwind CSS
- **Backend**: Express, Mongoose, MongoDB
- **Authentication**: Cookies
- **Deployment**: Heroku (Backend), Vercel (Frontend)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/abrarishere/taskBoardWeb.git
    cd taskBoardWeb
    ```

2. **Install dependencies**:

    ```sh
    # Install backend dependencies
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory with the following content:

    ```env
    PORT=5000
    MONGODB_URI=your-mongodb-uri
    FRONTEND_URL=http://localhost:3000
    ```

    Create a [.env](http://_vscodecontentref_/0) file in the [frontend](http://_vscodecontentref_/1) directory with the following content:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

### Running the Application

1. **Start the backend server**:

    ```sh
    npm start
    ```

2. **Start the frontend development server**:

    ```sh
    cd ../frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Deployment

### Backend (Heroku)

1. **Create a Heroku app**:

    ```sh
    heroku create your-app-name
    ```

2. **Set environment variables on Heroku**:

    ```sh
    heroku config:set MONGODB_URI=your-mongodb-uri
    heroku config:set FRONTEND_URL=https://your-frontend-url.com
    ```

3. **Deploy to Heroku**:

    ```sh
    git push heroku main
    ```

### Frontend (Vercel)

1. **Deploy the frontend to Vercel**:

    Follow the instructions on the Vercel website to deploy your React application.

2. **Set environment variables on Vercel**:

    ```env
    REACT_APP_API_URL=https://your-backend-url.com/api
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
