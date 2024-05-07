# Travel Log

Travel Log is a web application where users can explore different travel destinations and share their own travel experiences. It allows users to create posts about their trips, including images and descriptions, and interact with other users' posts.

## Demo

Check out the live demo of the project [here](https://travel-log-mern-stack-project-ow6f-dm9mv43qw-metinars-projects.vercel.app/).

## Getting Started

To run the project locally, follow these steps:

### Vite Project (Frontend)

1. Clone this repository.
   ```bash
   git clone https://github.com/yourusername/travel-log.git
   ```

2. Navigate to the frontend directory.
   ```bash
   cd travel-log/frontend
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

4. Start the development server.
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`.

### Node.js Project (Backend)

1. Navigate to the backend directory.
   ```bash
   cd travel-log/backend
   ```

2. Create a `.env` file and specify the following environment variables:
   ```plaintext
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

4. Start the server.
   ```bash
   npm start
   ```

5. The backend server will be running at `http://localhost:3001`.

### MongoDB Configuration

Both frontend and backend projects require a MongoDB connection. Make sure you have MongoDB installed and running on your system. Then, create a `.env` file in both the `frontend` and `backend` directories with the following content:

```plaintext
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection URI.

## Technologies Used

- MongoDB: A NoSQL database used to store user data and posts.
- Express.js: A web application framework used for building the backend server.
- React.js: A JavaScript library used for building the user interface.
- Node.js: A JavaScript runtime used for building the backend server.
- Vite: A build tool used for the frontend development environment.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
