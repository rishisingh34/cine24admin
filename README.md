# CINE Admin Panel

This is the admin panel for CINE'24, a web application designed to manage candidates, questions, and feedback for an event or competition. The application is built with Next.js and uses MongoDB as the database.

## Features

- **Admin Authentication:** Secure admin login with email, password, and OTP verification.
- **Dashboard:** An overview of key statistics, including the number of candidates, questions, and feedbacks. It also features a leaderboard of candidates and lists recent activities.
- **Candidate Management:** Admins can view, add, and manage candidate information.
- **Question Management:** Admins can create, view, and manage questions for assessments or quizzes.
- **Feedback Management:** Admins can view and manage feedback submitted by candidates.
- **Responsive Design:** The application is designed to be accessible on various devices, including desktops and mobile phones.

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Lucide React](https://lucide.dev/guide/packages/lucide-react) for icons
- **Code Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Email:** [Nodemailer](https://nodemailer.com/) for sending OTPs

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/cine_admin.git
   cd cine_admin
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of the project and add the following variables:

   ```env
   NEXTAUTH_SECRET=
   MONGODB_URI=
   EMAIL_HOST=
   EMAIL_PORT=
   EMAIL_USER=
   EMAIL_PASS=
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Available Scripts

- `dev`: Starts the development server with Turbopack.
- `build`: Creates a production build of the application.
- `start`: Starts the production server.
- `lint`: Lints the codebase using Next.js's built-in ESLint configuration.

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages and API routes
│   │   ├── admin/       # Admin-only pages
│   │   ├── api/         # API routes
│   │   └── ...
│   ├── components/      # Reusable React components
│   ├── lib/             # Helper functions and libraries
│   ├── models/          # Mongoose models for MongoDB
│   └── types/           # TypeScript type definitions
├── .env.local           # Environment variables (not committed)
├── next.config.ts       # Next.js configuration
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Authentication Flow

1. **Admin Login:** The admin enters their email and password.
2. **OTP Verification:** If the credentials are correct, an OTP is sent to the admin's email address.
3. **Access Granted:** The admin enters the OTP to gain access to the admin panel.

This flow is implemented using NextAuth.js with a custom credentials provider. The `authOptions.ts` file contains the configuration for NextAuth, and the `[...nextauth]/route.ts` file handles the authentication requests.