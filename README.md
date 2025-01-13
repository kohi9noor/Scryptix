# Scryptix

Scryptix is a simple and powerful platform for automating workflows with built-in web scraping tools. Whether you're gathering data from websites, organizing tasks, or monitoring progress, Scryptix makes everything easy in one place.

![Scryptix Screenshot 1](/public/preview/preview_1.png)

![Scryptix Screenshot 2](/public/preview/preview_2.png)

![Scryptix Screenshot 3](/public/preview/preview_3.png)

---

## 🌟 Key Features

- **Easy Workflow Automation**  
  Create workflows in simple steps. Break tasks into phases, assign credits, and let Scryptix handle the rest.

- **Web Scraping Made Simple**  
  Use built-in tools to collect data from websites. Automate actions and set schedules for data scraping tasks effortlessly.

- **Secure Credential Storage**  
  Save your API keys, tokens, and other sensitive data securely with encrypted storage for worry-free use.

- **User-Friendly Interface**  
  Navigate a clean and modern interface with real-time charts and reports to monitor your workflow’s progress and performance.

- **Server-Side Security**  
  All backend operations are securely managed with Next.js, ensuring your data and processes are handled safely.

- **AI-Powered Web Scraping (Beta)**  
  Try out our AI-driven feature to scrape data intelligently from even the trickiest websites.

---

# Local Setup

Follow these steps to set up Scryptix locally on your machine.

---

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Clone the Repository

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/kohi9noor/Scryptix
cd Scryptix
```

## Install Dependencies

Install the required packages using npm

```bash
npm install
```

## Configure the Environment Variables

Create a .env file in the root directory and add the following configuration

```
# Clerk configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_PRIVATE_CLERK_KEY>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Application settings
NEXT_PUBLIC_DEV_MODE=false
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_SECRET=<API_SECRET>

# Prisma database configuration
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database_name>

```

## Set Up the Database

Run the following Prisma commands to set up the database schema:

```bash
 npx prisma migrate dev --name init
 npx prisma generate
```

## Start the Development Server

Run the development server:

```bash
npm run dev
```

Scryptix makes automation and web scraping easier for everyone!
