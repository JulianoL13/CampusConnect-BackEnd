# Campus-Connect 🚀

A brief description of what this project does and who it's for. [Add a concise project description here]

[![Express.js](https://img.shields.io/badge/Express.js-green.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-purple.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue.svg)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-red.svg)](https://jwt.io/)
[![Bcrypt](https://img.shields.io/badge/Bcrypt-orange.svg)](https://www.npmjs.com/package/bcrypt)

## Project Structure 📁

```
📦 root/
├── 📁 docs/               # Project documentation
├── 📁 prisma/            # Database configuration and migrations
│   ├── 📁 schema/        # Prisma schema definitions
│   └── 📁 migrations/    # Database migrations
├── 📁 src/               # Source code
│   ├── 📁 config/        # Configuration files
│   ├── 📁 controllers/   # Request handlers
│   ├── 📁 middleware/    # Express middleware
│   ├── 📁 models/        # Data models
│   ├── 📁 repositories/  # Data access layer
│   ├── 📁 routes/        # API routes
│   ├── 📁 utils/         # Utility functions
│   └── 📄 index.ts       # Application entry point
├── 📄 package.json
└── 📄 package-lock.json
```

## Prerequisites 📋

Before you begin, ensure you have installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher) [if using PostgreSQL]

## Installation ⚙️

1. Clone the repository:
```bash
git clone https://github.com/JulianoL13/CampusConnect-BackEnd
cd CampusConnect-BackEnd
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="your-jwt-expires-in"
PORT=3000
```

4. Run database migrations:
```bash
npm run bd:prod

#or  

npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev     # Development mode with hot-reload
# or
npm start       # Production mode
```

## Tech Stack 🛠️

### Core Technologies
- **Framework:** [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- **Language:** [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- **Database:** [PostgreSQL](https://www.postgresql.org/) - Advanced open source relational database

### ORM & Database Tools
- **ORM:** [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- **Migrations:** Prisma Migrations - Version control for your database schema

### Authentication & Security
- **JWT:** [JSON Web Tokens](https://jwt.io/) - For secure authentication and authorization
- **Password Hashing:** [Bcrypt](https://www.npmjs.com/package/bcrypt) - For secure password hashing

### Development Tools
- **Runtime:** Node.js
- **Package Manager:** npm
- **Development Server:** nodemon - For hot-reload during development
- **Code Quality:**
  - Prettier - For code formatting
  - TypeScript compiler - For static type checking

### API Development
- **Request Handling:** Express.js Router
- **API Documentation:** Swagger/OpenAPI

## Contributing 🤝

We welcome contributions! Please see our [Contributing Guidelines](https://github.com/JulianoL13/CampusConnect-BackEnd/blob/main/COLLABORATION.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Team ✨

### Backend Team
- [Juliano Laranjeira](https://github.com/JulianoL13) - Lead Backend Developer
- [Pablo Montes](https://github.com/itspablomontes) - Backend Developer

### Frontend Team
- [Thiago Miranda](https://github.com/Thiiagodev) - Frontend Developer
- [Carlos Eduardo Albuquerque](https://github.com/CarllosEduardo07) - Frontend Developer

## License 📄

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

### Special Thanks
- To Wyden FACIMP, for all support and resources provided for us, students
- To our professor Wellinton who guided us through the development process
- To the open-source community for the amazing tools and libraries that made this project possible

### Development Support
- Thanks to the [Express.js](https://expressjs.com/) community for the excellent documentation
- Thanks to [Prisma](https://www.prisma.io/) team for building such an amazing ORM
- Thanks to [TypeScript](https://www.typescriptlang.org/) team for the incredible type system

### Design & Inspiration
- Inspired by the need to improve campus connectivity and student interaction
- UI/UX design inspired by modern educational platforms

### Contributors
- Thanks to all students who participated in testing
- Thanks to everyone who reported bugs and suggested features

---
Made with ❤️ by the Campus-Connect Team
