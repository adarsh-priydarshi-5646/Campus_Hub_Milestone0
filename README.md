# 🎓 MyCampusHub - Complete Campus Management System

A **production-ready, fully-featured** college management system built with React Native and Node.js. Features include profile management, real-time database sync, professional UI with React icons, and complete CRUD operations.

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Expo](https://img.shields.io/badge/Expo-49-black.svg)](https://expo.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ **Production-Ready Features**

### 🎯 **Complete User Management**
- **Profile Editing** - Edit name, email, roll number, branch with database sync
- **Image Upload** - Camera/Gallery with compression (5MB limit)
- **Skills Management** - Add/Remove skills with real-time updates
- **Achievements** - Add/Remove achievements with icon selector
- **Settings** - Notifications & Dark mode toggles
- **Secure Logout** - Session invalidation with database cleanup

### 🎨 **Professional UI Design**
- **React Native Icons** - 150+ professional icons (Ionicons, MaterialIcons, FontAwesome5)
- **No Emojis** - All replaced with React icons for professional look
- **Gradient Backgrounds** - Beautiful gradients throughout
- **Shadow System** - Multiple elevation levels
- **Responsive Design** - Works on all screen sizes
- **Clean Code** - No comments, production-ready

## 🚀 **Core Features**

### **11 Enhanced Pages**
1. **🏠 Home Screen** - Quick access cards, semester list
2. **👤 Profile Screen** - Fully editable with image upload
3. **🏫 College Details** - Newton School of Technology complete info
4. **🍽️ Mess Details** - 7-day weekly menu with timings
5. **📚 Semester Details** - Subject cards with React icons
6. **🗺️ Study Roadmap** - Smart text parsing, emoji-free
7. **📅 Events** - Category detection, gradient backgrounds
8. **👨‍🏫 Faculty** - Faculty list with department filter
9. **👨‍🏫 Faculty Details** - Complete faculty information
10. **🔐 Login/Signup** - JWT authentication
11. **👋 Welcome** - Onboarding screen

### **Complete CRUD Operations**
- ✅ **Create** - Register user, add skills/achievements
- ✅ **Read** - Fetch all data from database
- ✅ **Update** - Edit profile, update user data
- ✅ **Delete** - Logout (session deactivation)

## 🛠️ Tech Stack

### Backend
- **Node.js + Express.js** - RESTful API
- **Prisma ORM** - Database management
- **MySQL** - Production database
- **JWT Authentication** - Secure token-based auth
- **Session Management** - Database-backed sessions
- **bcrypt** - Password hashing

### Frontend
- **React Native + Expo** - Cross-platform mobile development
- **React Navigation** - Stack navigation
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client for API calls
- **@expo/vector-icons** - Professional icons (Ionicons, MaterialIcons, FontAwesome5)
- **expo-image-picker** - Camera/Gallery image upload
- **expo-linear-gradient** - Gradient backgrounds
- **React Context API** - State management
- **Custom Hooks** - Reusable logic

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm 8+
- Expo CLI (`npm install -g @expo/cli`)
- For mobile development: Expo Go app

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp production.env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the server:**
   ```bash
   npm start
   # Server will run on http://localhost:3001
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # Follow the Expo CLI instructions to run on device/simulator
   ```

## 🎨 **3D Components Library**

### **Button3D Component**
```jsx
<Button3D 
  title="Click Me"
  onPress={handlePress}
  variant="primary" // primary, secondary, success, warning, danger
  size="large" // small, medium, large
  icon={<Text>🎯</Text>}
/>
```

### **Card3D Component**
```jsx
<Card3D 
  variant="primary" // primary, success, warning, danger, gradient
  elevation="high" // low, medium, high, ultra
  onPress={handlePress}
>
  <Text>Card Content</Text>
</Card3D>
```

### **Icon3D Component**
```jsx
<Icon3D 
  emoji="🎓"
  size="large" // small, medium, large, xl, xxl
  variant="primary" // primary, success, warning, danger, gradient
/>
```

### **FloatingActionButton Component**
```jsx
<FloatingActionButton
  icon="💬"
  onPress={handlePress}
  variant="primary"
  size="large"
  position="bottomRight" // bottomRight, bottomLeft, topRight, topLeft
/>
```

### **AnimatedBackground Component**
```jsx
<AnimatedBackground variant="gradient"> // gradient, wave
  <Text>Content with animated background</Text>
</AnimatedBackground>
```

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET=your_development_jwt_secret_key_min_32_chars_long
SESSION_SECRET=your_development_session_secret_key_min_32_chars_long
FRONTEND_URL=http://localhost:8081
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Frontend Configuration

Update `services/api.js` with your backend URL:
```javascript
const DEVELOPMENT_API_URL = 'http://localhost:3001/api';
```

## 📱 Running the App

### Development Mode

1. **Start Backend:**
   ```bash
   cd backend && npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend && npm start
   ```

3. **Run on Device:**
   - Install Expo Go app on your phone
   - Scan the QR code from terminal
   - Or use iOS Simulator / Android Emulator

### Production Build

See `DEPLOYMENT_GUIDE.md` for detailed production deployment instructions.

## 🗄️ Database Schema

The app uses the following main entities:
- **Users** - Authentication and user management
- **Teachers** - Faculty information
- **Semesters** - Academic semesters
- **Subjects** - Course subjects with roadmaps
- **Exams** - Exam schedules
- **Timetable** - Class schedules
- **Hostels** - Hostel information
- **Mess** - Mess menu
- **Events** - Campus events
- **College** - College information

## 🔐 Authentication

The app supports multiple authentication methods:
- **Local Registration/Login** - Email and password
- **Google OAuth** - Sign in with Google
- **GitHub OAuth** - Sign in with GitHub

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/github` - GitHub OAuth

### Academic
- `GET /api/academics/semesters` - Get all semesters
- `GET /api/academics/subjects/:semesterId` - Get subjects by semester
- `GET /api/academics/details/:semesterId` - Get semester details

### Faculty
- `GET /api/faculty` - Get all faculty
- `GET /api/faculty/:id` - Get faculty by ID

### Other
- `GET /api/college` - College information
- `GET /api/events` - Campus events
- `GET /api/hostel` - Hostel information
- `GET /api/mess` - Mess menu
- `GET /api/timetable/:semesterId` - Timetable

## 🚀 Deployment

For production deployment, see the comprehensive `DEPLOYMENT_GUIDE.md` file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Adarsh Priydarshi**
- GitHub: [@adarshpriydarshi](https://github.com/adarshpriydarshi)
- LinkedIn: [Adarsh Priydarshi](https://linkedin.com/in/adarshpriydarshi)

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues
2. Create a new issue with detailed description
3. Contact the author

---

**Happy Coding! 🎉**
