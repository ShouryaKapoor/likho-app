# Writers App

A comprehensive platform for writers to share their creativity with the world. Whether you are writing a book, a blog post, a song, or a poem, Writers App provides the tools you need to publish and manage your work.

## Features

- **User Authentication**: Secure sign-up and login functionality powered by NextAuth.js.
- **Writer Dashboard**: A personalized hub to manage your content and view your stats.
- **Content Management**: Create, edit, and delete various types of content:
  - **Books**: Write chapter-based stories.
  - **Blogs**: Share your thoughts and articles.
  - **Songs**: Compose lyrics and share your musical ideas.
  - **Poems**: Publish your poetry.
- **Profile Customization**: Manage your public profile and writer details.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience on all devices.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Neon](https://neon.tech/) (PostgreSQL)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [NextAuth.js](https://authjs.dev/)
- **UI Components**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd writers-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DATABASE_URL=your_neon_database_url
    AUTH_SECRET=your_nextauth_secret
    # Add other necessary environment variables here
    ```

4.  **Run database migrations:**

    ```bash
    npx drizzle-kit push
    ```

5.  **Start the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
