# WanderLust: Airbnb Mini Clone Project

WanderLust is a mini clone of Airbnb built using Node.js and Express. This project allows users to explore, list, and review properties while providing essential features for user management and media handling.

## Features

- **User Authentication:**
  - Signup: Users can create an account to start listing properties and booking stays.
  - Login: Existing users can log into their accounts.
  - Logout: Users can securely log out from their sessions.
- **Property Listings:**
  - Add New Listing: Users can create new property listings with details such as title, description, price, and images.
  - Update Listing: Users can update their listings to modify details as needed.
  - Delete Listing: Users can delete their listings if they no longer wish to offer them.
- **Ratings and Reviews:**
  - Users can leave ratings and reviews for properties they have stayed in, helping others make informed decisions.
- **Image Management:**
  - Integrated with Cloudinary for efficient image storage and management. Users can upload images for their listings, which are automatically optimized for performance.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (for storing user data and property listings)
- **Authentication:** Passport.js or JWT for user authentication
- **Image Storage:** Cloudinary (for uploading and managing images)
- **Frontend:** Bootstrap, Ejs
- MVC Framework
## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- MongoDB database (local or cloud-based)
- Cloudinary account for image management

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```
2. Install Dependencies:
    ```bash
      npm install
    ```
3. Environment Variables: Create a .env file in the root directory with the following variables:
    ```bash
      CLOUD_NAME=[user name]
      CLOUD_API_KEY=[your key]
      CLOUD_API_SECRET=[key]
      SECRET=[random secret string]
    
    ```
4. Initial the database with demo data:
   ```bash
      cd init
      node index.js
      cd..
    ```
5.Run the Application:
  ```bash
    node app.js
  ```
The application will be accessible at http://localhost:8080/listing.


## Usage
- Navigate to the signup page to create a new account.

- Log in to access your dashboard where you can add, update, or delete your property listings.

- Browse available listings and leave ratings/reviews based on your experiences.


## Sample output 
![localhost_8080_listing](https://github.com/user-attachments/assets/c1d3539b-266f-42f7-b1b6-1054359f7519)
![localhost_8080_listing_new](https://github.com/user-attachments/assets/48fec332-388e-4538-853d-d2aec5d1cd6a)
![localhost_8080_listing_671083e2182f7b9f87ef2c65](https://github.com/user-attachments/assets/71d3c4e1-83a9-4f8f-a7f9-5d18cfe4ca93)
![localhost_8080_listing_671083e2182f7b9f87ef2c65_edit](https://github.com/user-attachments/assets/7584e512-afa7-43cc-a351-f91c8b72d08b)





   

