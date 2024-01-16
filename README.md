# Secure Image Storage 📷

This project enables users to securely store and manage images by leveraging the power of Amazon S3 (Simple Storage Service). It incorporates user authentication to ensure data privacy and employs signed URLs for controlled access to images.

### Demo 🌐 
**Live** https://secure-image-storage.vercel.app/

## 🛠️ Key Features

**1. User Authentication: 🔐**
- Users are required to log in to access the image storage functionality.
- Secure authentication ensures that only authorized users can manage their images.

**2. Image Storage in S3 Bucket:**


- Images are stored in an Amazon S3 bucket, a scalable and secure cloud storage service.
- This allows for efficient management and retrieval of user-uploaded images.

**3. Signed URLs for Secure Image Access:**


- The project utilizes signed URLs for controlled access to images.
- Signed URLs provide a time-limited and secure way for authenticated users to view their images.

## Technologies Used 🛠️

- **NextJs:** Next.js is a full-stack React framework designed for building web and native user interfaces

- **Database: MongoDB:** MongoDB is a non-relational document database that provides support for JSON-like storage. 

- **Amazon S3 : Amazon Simple Storage Service (Amazon S3)** is an object storage service that offers industry-leading scalability, data availability, security, and performance

- **Tailwind CSS:** Utility-first CSS framework for styling.


## Getting Started 🚦


*Clone the repository*

   ```bash
   git clone https://github.com/vishaltalukar66/secure-image-storage
   ```
*Go to the project directory*

```bash
  cd secure-image-storage
```

*Install dependencies*

```bash
  npm install
```
*Start the application*

```bash
  npm run dev
```
