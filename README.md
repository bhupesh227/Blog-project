# Blog Project

This is a simple blog application where users can **create**, **edit**, and **delete** blog posts. The data is stored in a `data.json` file, and image uploads are handled using **Multer** middleware. The project doesn't use a database, making it lightweight and simple to set up.

## Features
- **Create a Blog Post**: Users can create new blog posts with a title, content, and an image.
- **Edit Blog Posts**: Users can update the title, content, and image of existing posts.
- **Delete Blog Posts**: Users can delete blog posts, which removes them from the `data.json` file.
- **Image Uploads**: Images are uploaded using **Multer** and stored in the `uploads` directory.

## Technologies Used
- **Node.js** and **Express** for the backend.
- **Multer** for handling file uploads.
- **data.json** for storing blog post data.
- **HTML/CSS** for the frontend UI.

## Folder Structure

    ├── data
    │   └── data.json                    # Stores blog post data (title, content,name,date,id, image name)
    ├── uploads/                         # Folder where images are uploaded
    │   └── blog-image.jpg               # Example image file uploaded by the user
    ├── index.js                         # Main application logic (routes, file handling)
    ├── public/                          # Public files like stylesheets, JS
    │   └── style.css                    # Styles for the blog
    ├── views/                           # Views for displaying the blog posts
    │   └── index.ejs                    # Homepage view to display blog posts
    │   └── edit.ejs                     # edit 
    │   └── new.ejs
    │   └── posts.ejs
    │   └── about.ejs
    │   └── partials(header/footer)
    └── package.json                     # Project dependencies and scripts

## Installation

Follow these steps to get the project up and running on your local machine:

### 1. Clone the Repository

Clone the repo to your local machine using Git:

```bash
git clone https://github.com/bhupesh227/Blog-project.git
```

### 2. Install Dependencies
``` npm install ```

### 3. Run the Application Locally
``` node index.js ```
The app will run on http://localhost:3000 by default. Open this URL in your web browser to access the app.

## To Do / Future Enhancements
- Add user authentication (login/signup) to restrict editing and deleting posts.
- Move to a database like MongoDB or MySQL for better data management.
- Implement input validation and error handling for blog creation and editing.

## Contributing
 - Feel free to open an issue or submit a pull request if you'd like to contribute to this project. Your ideas and feedback are welcome!
