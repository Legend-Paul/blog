# Legend Blog
Legend Blog is a full-stack blogging platform that allows administrators to create, manage, and publish blog posts, while public users can read posts and leave comments. The system is designed with a clear separation between **admin** and **public** functionality and supports draft (unpublished) posts.

---

## Live Links

- **Admin Panel:** https://legendbloger.onrender.com  
- **Public Blog:** https://legendblog.onrender.com/authorname  
- **GitHub Repository:** https://github.com/Legend-Paul/blog.git  

---

## Project Overview

This project focuses on building a structured blog system with:
- Posts and comments
- Draft and published posts
- Timestamped content
- Simple but scalable backend data models

The application is suitable for learning and demonstrating backend model design, RESTful APIs, and full-stack integration.

---

## Features

### Admin Features
- Create new blog posts
- Edit and delete posts
- Save posts as **drafts (unpublished)**
- Publish or unpublish posts
- View all posts (published and unpublished)

### Public Features
- View published blog posts only
- Access posts by author name
- Add comments to posts
- View comment timestamps

---

## Backend Design (Models & Schemas)

The backend is designed around two core entities:

### 1. Post Model

Each blog post contains essential metadata and publishing control.
---

### 2. Comment Model

Comments are associated with a specific post and capture basic user identity.


**Design Notes:**
- Comments do **not** require a title.
- A timestamp is displayed to show when the comment was posted.
- Username is required to encourage accountability and clarity in discussions.

---

## Timestamps & Dates

- All posts and comments include timestamps.
- Posts display creation or publication date.
- Comments display the exact time they were added.
- Timestamps improve content organization and user trust.

---

## API & Data Flow (High-Level)

1. Admin creates or edits a post via the admin panel.
2. The post is stored in the database as published or unpublished.
3. Public users can only fetch posts marked as published.
4. Comments are linked to posts using a post ID reference.
5. Each comment is stored with user details and a timestamp.

---

## Technologies Used

- Backend: Node.js / Express
- Database: PostgreSql
- Frontend: HTML, CSS, React
- Hosting: Render



---

## Author

**Maina Paul**  
Software & Web Developer  

---

## License

This project is open-source and available for learning and personal use.
