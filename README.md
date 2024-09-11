![Logo](https://mydevify.com/assets/logo.c98d2a42.svg)

## Showcase
  
| ![Image 1](https://raw.githubusercontent.com/mydevify/MyLibrary/main/public/images/showcase/Home_Drak.PNG) | ![Image 2](https://github.com/mydevify/MyLibrary/blob/main/public/images/showcase/Home_Light.PNG?raw=true) |
|-------------------------|-------------------------|
| ![Image 3](https://github.com/mydevify/MyLibrary/blob/main/public/images/showcase/Categories_Dark.PNG?raw=true)| ![Image 4](https://github.com/mydevify/MyLibrary/blob/main/public/images/showcase/Categories_Light.PNG?raw=true) |
| ![Image 5](https://github.com/mydevify/MyLibrary/blob/main/public/images/showcase/Books_Dark.PNG?raw=true)| ![Image 6](https://github.com/mydevify/MyLibrary/blob/main/public/images/showcase/Books_Light.PNG?raw=true) |




# **MyLibrary**

**MyLibrary** is an open-source platform for managing and accessing IT-related books. With a robust category management system, admin and moderation control panels, a dynamic sitemap generator, and a staff ranking system, MyLibrary is designed to streamline the organization and distribution of digital resources. Whether you're a user browsing for books or an administrator managing content, MyLibrary offers powerful tools to ensure a smooth experience.

## Features

- **Category Management System**: Easily organize and browse books by categories.
- **Admin Control Panel**: Full control over managing users, books, and categories, along with site-wide settings.
- **Mod Control Panel**: Moderators can review content, manage user reports, and ensure the platform runs smoothly.
- **Ranks System for Staff**: Assign different roles (Admin, Mod, User) with various permissions.
- **Dynamic Sitemap Generator**: Automatically updates the sitemap for better SEO and easy navigation.
- **Book Management**: Add, edit, or delete book entries along with metadata, making it simple to keep your library up-to-date.
- **Secure and Optimized**: Built with security in mind, MyLibrary protects your content and provides tips for enhanced protection.
- **SEO Friendly**: Optimized for search engines and tested by [PageSpeed Insights](https://pagespeed.web.dev/).
- **Light and Dark Themes**: MyLibrary offers a default dark theme and a light mode. Users can switch between themes. _[Add temp pictures here]_

## Is MyLibrary Open Source?

Yes! **MyLibrary** is 100% open source. You can find the full project and contribute to its development on GitHub:



## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **MySQL** (or another SQL-based database)
- **Prisma** for ORM/database management
- **Clerk** for authentication
- **hCaptcha** for verification

---

### Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/mydevify/MyLibrary.git
cd MyLibrary
```

#### 2. Install the dependencies:

```bash
npm install
```

#### 3. Set up environment variables

Create a `.env` file in the root directory and add the necessary variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
WEBHOOK_SECRET=your_clerk_webhook_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL="mysql://root:@localhost:3306/mylibrary"
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key
NEXT_PUBLIC_HCAPTCHA_SITEKEY=your_hcaptcha_site_key
NEXT_WEBSITE_URL=https://library.mydevify.com
```

#### 4. Set up **Clerk Authentication** and Webhooks

1. Create an account on [Clerk.dev](https://clerk.dev) and get your keys.
2. Add a webhook in the **Clerk** dashboard:
   - Webhook URL: `<NEXT_WEBSITE_URL>/api/clerk-webhook`
3. Add your **Clerk** keys to the `.env` file.

#### 5. Set up **hCaptcha**

1. Create an account on [hCaptcha](https://hcaptcha.com/).
2. Add the **Site Key** and **Secret Key** to the `.env` file.

#### 6. Set up MySQL using **XAMPP**

1. Download and install [XAMPP](https://www.apachefriends.org/).
2. Open the XAMPP Control Panel and start **Apache** and **MySQL**.
3. Go to `http://localhost/phpmyadmin` and create a new database called `mylibrary`.
4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

---

### Run the Development Server

```bash
npm run dev
```

You can now access the app at `http://localhost:3000`.

---

## Deployment

### Deploying on Vercel

1. Install the **Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. Log in to **Vercel**:

   ```bash
   vercel login
   ```

3. Initialize the project for deployment:

   ```bash
   vercel
   ```

4. Follow the prompts to deploy the project to Vercel.

   Once deployed, your project will be live at the **Vercel** URL provided.

---

### Deploying on CyberPanel with PM2

#### PM2 Setup Tutorial

Follow these steps to deploy the app using **PM2** on a server with **CyberPanel**.

#### Prerequisites

- **Node.js**: Ensure Node.js is installed on your server.
- **PM2**: Install **PM2** globally if it’s not already installed.

```bash
npm install -g pm2
```

#### Basic PM2 Commands

1. Navigate to your project directory:

   ```bash
   cd /home/mydevify.com/library.mydevify.com
   ```

2. Start the application with PM2:

   ```bash
   pm2 start npm --name "mydevify-app" -- start --cwd /home/mydevify.com/library.mydevify.com -- PORT=4000
   ```

   **Note**: Replace `"mydevify-app"` with your desired application name and adjust the `PORT` and `--cwd` parameters as needed.

---

### Using an Ecosystem File

1. Create an `ecosystem.config.js` file in your project directory:

   ```js
   module.exports = {
     apps: [
       {
         name: 'mydevify-app',
         script: 'node_modules/.bin/next',
         args: 'start -p 4000',
         env: {
           PORT: 4000,
           NODE_ENV: 'production',
         },
         cwd: '/home/mydevify.com/library.mydevify.com',
       },
     ],
   };
   ```

2. Start the application using the ecosystem file:

   ```bash
   pm2 start ecosystem.config.js
   ```

---

### Monitoring and Managing Your Application

- **Check status**: `pm2 status`
- **View logs**: `pm2 logs mydevify-app`
- **Restart the app**: `pm2 restart mydevify-app`
- **Stop the app**: `pm2 stop mydevify-app`
- **Delete the app**: `pm2 delete mydevify-app`

#### Save and Reload PM2 Process List

1. Save the current process list:

   ```bash
   pm2 save
   ```

2. Reload the PM2 process list (after a server restart or configuration change):

   ```bash
   pm2 reload all
   ```

---

### Troubleshooting

If the app isn’t starting:

1. Check for errors in the logs:

   ```bash
   pm2 logs mydevify-app
   ```

2. Ensure that the `--cwd` parameter points to the correct project directory.
3. Verify that your `PORT` and other environment variables are correctly set.

---

## Technologies Used

- **Next.js 14.2.5**: React framework with server-side rendering and static site generation.
- **Prisma**: ORM for managing MySQL databases.
- **Clerk**: User authentication and management system.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **DaisyUI**: UI components for TailwindCSS.
- **TypeScript**: Strongly typed JavaScript for maintaining clean and scalable code.

---

## Contributing

We welcome contributions! Feel free to submit a pull request or open an issue. 

You can also connect with me on [LinkedIn](https://www.linkedin.com/in/xloy).

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

**Live Preview**: [https://library.mydevify.com](https://library.mydevify.com)
