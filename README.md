# LinkedIn Profile Automation System

A MERN stack-based LinkedIn profile automation project that searches and extracts student profile information from LinkedIn using browser automation.

## Features

- Search LinkedIn student profiles
- Extract profile information
- Display results in a clean UI
- Automated browser interaction using Puppeteer
- MongoDB database integration
- Responsive frontend using React

## Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Puppeteer
- Puppeteer Extra
- Stealth Plugin

## Project Structure

```bash
linkedin-profile-automation-system/
│── frontend/
│── backend/
│── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/chiragha/Linkedin-profile-automation-system.git
```

### Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=4001
MONGO_URI=your_mongodb_connection_string
LINKEDIN_EMAIL=testuser@gmail.com
LINKEDIN_PASSWORD=testpassword123
```

Run backend:

```bash
npm start
```

### Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

## How It Works

1. User clicks **Search Students**
2. Puppeteer launches LinkedIn
3. LinkedIn search page opens automatically
4. Student profile information is extracted
5. Data is displayed on the frontend


## Future Improvements

- Better student profile extraction
- Dynamic keyword search
- Export data to CSV/Excel
- Improved UI design
- Authentication system

## Important Note

This project is created for learning and automation practice purposes only.

## Author

**Shivani Sinha**

GitHub:  
[LinkedIn Profile Automation Repository](https://github.com/chiragha/Linkedin-profile-automation-system?utm_source=chatgpt.com)
