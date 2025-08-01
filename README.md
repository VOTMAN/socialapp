🗣️ Social App
Social App is a minimalistic social media platform built with Next.js. Share your thoughts with or without images, interact with others through likes and comments, and view posts globally or just your own in the dashboard.

✨ Features
- OAuth login with GitHub (via Better Auth)

- Create posts with text and optional image

- Upload images via Cloudinary

- View all posts or only your own

- Like posts

- Comment on posts

- Fully responsive UI with TailwindCSS & shadCN components

🛠️ Tech Stack
- Purpose	Technology
- Frontend	Next.js, React, TailwindCSS, shadCN
- Backend	Next.js Server Actions
- Authentication	Better Auth (GitHub OAuth)
- ORM & DB	Drizzle ORM with PostgreSQL
- Image Uploads	Cloudinary
- Hosting	Vercel

🧑‍💻 Getting Started
1. Clone the repository
```
git clone https://github.com/your-username/social-app.git
cd social-app
```
2. Install dependencies
```npm install```

3. Set up environment variables
Create a .env.local file:
```
DATABASE_URL=your_postgres_url
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000/api/auth
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
<img width="293" height="616" alt="image" src="https://github.com/user-attachments/assets/49da451e-5e70-47f2-ac6c-9785ef1d45ec" />

⚠️ Replace with actual credentials.

4. Run database migrations
```npx drizzle-kit push```

5. Start the development server
```npm run dev```

Open http://localhost:3000
