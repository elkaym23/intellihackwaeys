# IntelliHackWAEYS

## Overview
kWAEYS is an accountability app designed for teachers and students to manage projects and tasks effectively. Teachers can create classes, assign tasks, and track student progress, while students can collaborate on projects, manage tasks, and track due dates. The app provides personalized dashboards for both teachers and students.

## Features
- **Teacher Dashboard**:
  - Create classes (folders) with a unique code.
  - Send the class code to students for registration.
  - Track students' projects, team members, tasks, and due dates.

- **Student Dashboard**:
  - Create projects and add team members.
  - Assign tasks to team members and track task completion.
  - View current projects, team progress, and due dates.

## Tech Stack
- **Frontend**: React, `create-react-app`
- **Backend**: Supabase (PostgreSQL as the database)
- **Hosting**: AWS

## Setup Guide

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v16 or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [VS Code](https://code.visualstudio.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Supabase](https://supabase.com/) account for your backend setup
- [AWS](https://aws.amazon.com/) account for deployment (if required)

### 1. Clone the Repository
Clone the project repository to your local machine using Git.

```bash
git clone https://github.com/your-username/IntelliHackWAEYS.git
```

2. Install Dependencies for Frontend
Navigate to the frontend directory and install the required dependencies using npm:

bash
Copy
Edit
cd IntelliHackWAEYS/frontend
npm install
3. Set Up Supabase
Create an account on Supabase.
Create a new project in Supabase.
In the API section of your Supabase project, note down the URL and anon key. You'll need these for connecting your frontend to the Supabase backend.
In the Supabase project, create the necessary tables (e.g., users, projects, tasks, etc.) to manage your app data. You can use Supabase’s web interface to do this.
4. Configure Environment Variables
Create a .env file in the frontend directory of your project and add the following environment variables:

bash
Copy
Edit
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
5. Set Up Backend with Supabase
In Supabase, create the necessary tables and relationships:
users table (for both teachers and students)
classes table (to store class information with a generated code)
projects table (to store student projects and related data)
tasks table (to store tasks with due dates, assignees, and completion statuses)
Configure any necessary roles or permissions in Supabase to ensure secure access for both teachers and students.
6. Run the Frontend Locally
Now that the backend is set up, you can start the frontend development server:

bash
Copy
Edit
npm start
Visit http://localhost:3000 in your browser to see the app in action.

7. Set Up AWS Deployment (Optional)
If you're ready to deploy the app to production, you can use AWS for hosting:

Set up an S3 bucket to host the static files for your React app.
Use AWS Amplify or Elastic Beanstalk to deploy your frontend app. Follow the AWS deployment documentation to link your repository and deploy your app.
Set up your Supabase connection (ensure that the production environment variables are set in AWS).
8. User Authentication Flow
Login/Signup: Users (both teachers and students) will have the option to register or log in with email and password. After logging in, users are redirected to their respective dashboards.
Teacher Dashboard:
Teachers can create a class (folder) and generate a unique class code.
Teachers send the code to students, who can then join the class by entering the code.
Teachers can track students’ projects, tasks, and completion statuses.
Student Dashboard:
Students can create projects and add team members.
Students can assign tasks to team members, view deadlines, and track task progress.
9. Sample Data (For Testing)
For testing purposes, you can use the following sample credentials:

Teacher:
Email: teacher@example.com
Password: password123
Student:
Email: student@example.com
Password: password123
10. Troubleshooting
If you encounter issues, check the following:

App not loading: Make sure your Supabase credentials are correct and the database tables are properly set up.
Error in tasks/projects: Check if the tables are properly configured in Supabase with the right relationships.
11. Contributing
If you’d like to contribute to the project:

Fork the repository.
Create a new branch for your feature/bug fix.
Submit a pull request with your changes.
12. License
This project is licensed under the MIT License.

Contact
For support or questions, feel free to reach out to your-email@example.com.

Changelog
v1.0.0: Initial release with login/signup, teacher/student dashboards, project and task management.


```vbnet

### Summary:
1. The `README.md` file includes instructions for setting up the project using Supabase, React, and AWS.
2. It covers the entire app flow, from creating classes by teachers to project and task management by students.
3. Clear instructions on how to configure environment variables, set up Supabase, and run the app locally are provided.

This should help guide anyone through setting up your accountability app. You can copy this text and paste it into your `README.md` file in your project directory!

```