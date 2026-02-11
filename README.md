# Bookify


<h1 align="center">A Resale Book Trading Platform</h1>

Bookify is a full-stack e-commerce platform that facilitates the buying and selling of used books. It provides a marketplace for users to connect, trade, and discover a wide range of books. The platform is designed with a three-tier user system (Buyer, Seller, Admin) to ensure a secure and managed trading environment.

## Features

- **User Roles:** Separate dashboards and functionalities for Buyers, Sellers, and Administrators.
- **Product Management:** Sellers can add, manage, and track their book listings.
- **Categorization:** Books are organized into various categories for easy browsing and discovery.
- **Shopping Cart:** Buyers can add books to their cart and proceed to a seamless checkout process.
- **Wishlist:** Users can save books to their wishlist for future reference.
- **Admin Dashboard:** Administrators have oversight of the platform, with the ability to manage users and products.
- **Secure Authentication:** User authentication is handled through Firebase, ensuring secure access to the platform.
- **Payment Integration:** The platform supports online payments for book purchases.

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Deployment:** Vercel, Docker

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB database instance (local or cloud-based).
- A Firebase project for authentication.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/Bookify.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>
   REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
   REACT_APP_FIREBASE_PROJECT_ID=<your_firebase_project_id>
   REACT_APP_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
   REACT_APP_FIREBASE_APP_ID=<your_firebase_app_id>
   ```

4. Start the development server
   ```sh
   npm start
   ```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

For security-related information and to report vulnerabilities, please see our [Security Policy](SECURITY.md).

## License

Distributed under the MIT License. See `LICENSE` for more information.