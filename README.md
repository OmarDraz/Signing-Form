# Auth Frontend - React.js with TypeScript

A production-ready React.js frontend application with TypeScript that implements user authentication module.

## Features

- **Sign Up**: Create new user accounts with validation
- **Sign In**: Authenticate existing users
- **Application Page**: Simple welcome page with logout
- **TypeScript**: Full TypeScript implementation
- **Form Validation**: Comprehensive client-side validation
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Animated sign-in/sign-up form with modern design
- **State Management**: React Context for authentication state
- **API Integration**: Consumes NestJS backend endpoints

## Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management
- **CSS3** - Styling with animations

## Setup

1. **Install dependencies:**
```bash
cd Signing-Form
npm install
```

2. **Start the development server:**
```bash
npm start
```

The app will open at `http://localhost:3001` (or next available port)

## API Configuration

The app is configured to connect to the NestJS backend at `http://localhost:3000`.

To change the API URL, create a `.env` file:
```env
REACT_APP_API_URL=http://your-backend-url:port
```

## Validation Requirements

### Sign Up Form
- **Email**: Valid email format validation
- **Name**: Minimum of 3 characters
- **Password**: 
  - Minimum length of 8 characters
  - At least one letter
  - At least one number
  - At least one special character

### Sign In Form
- **Email**: Valid email format validation
- **Password**: Required field

## How It Works

### Authentication Flow

1. **App Load**: Check for existing valid token → If valid, redirect to application page
2. **Sign Up**: User fills form with validation → API call to `/auth/signup` → JWT token stored → Redirect to application page
3. **Sign In**: User fills form → API call to `/auth/signin` → JWT token stored → Redirect to application page
4. **Application Page**: Welcome message "Welcome to the application." with prominent logout button
5. **Logout**: API call to `/auth/logout` → Token removed → Redirect to sign in

### Components

- **AuthForm**: Handles sign-in and sign-up forms with validation and toggle animation
- **Application**: Simple welcome page with logout button (protected route)
- **Button**: Reusable button component with multiple variants (primary, secondary, transparent, logout)
- **Input**: Reusable input component with icons and error handling
- **AuthContext**: Manages authentication state and API calls with TypeScript
- **authAPI**: Service layer for all API communications with type safety

### State Management

- **User State**: Stores current user information
- **Loading State**: Shows loading indicators during API calls
- **Error Handling**: Displays user-friendly error messages
- **Token Management**: Automatically includes JWT in API requests

## API Endpoints Used

- `POST /auth/signup` - User registration
- `POST /auth/signin` - User authentication
- `POST /auth/logout` - User logout
- `GET /users/profile` - Get user profile (protected)

## Features Explained

### Form Validation
- Required field validation
- Email format validation
- Password minimum length (6 characters)
- Real-time error clearing

### Security
- JWT tokens stored in localStorage
- Automatic token inclusion in API requests
- Token validation on app startup
- Automatic logout on token expiration

### User Experience
- Smooth animations between sign-in/sign-up forms
- Loading states during API calls
- Success/error message display
- Responsive design for all screen sizes

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Button Component

The app uses a reusable `Button` component with multiple variants:

```tsx
// Primary button (default)
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>

// Secondary button
<Button variant="secondary" onClick={handleClick}>
  Secondary
</Button>

// Transparent button (for panels)
<Button variant="transparent" onClick={handleClick}>
  Transparent
</Button>

// Logout button (red with shadow)
<Button variant="logout" onClick={handleLogout}>
  Logout
</Button>

// With loading state
<Button 
  variant="primary" 
  loading={isLoading}
  loadingText="Processing..."
>
  Submit
</Button>
```

### Input Component

The app uses a reusable `Input` component with icons and error handling:

```tsx
// Basic input with icon
<Input
  type="email"
  name="email"
  placeholder="Email"
  value={email}
  onChange={handleChange}
  icon="envelope"
  required
/>

// Input with error message
<Input
  type="password"
  name="password"
  placeholder="Password"
  value={password}
  onChange={handleChange}
  icon="lock"
  required
  minLength={8}
  error={errors.password}
/>

// Text input with user icon
<Input
  type="text"
  name="name"
  placeholder="Full Name"
  value={name}
  onChange={handleChange}
  icon="user"
  required
/>
```

**Available Icons:**
- `user` - User icon for name fields
- `envelope` - Email icon for email fields  
- `lock` - Lock icon for password fields

### Project Structure

```
src/
├── components/
│   ├── AuthForm.tsx     # Sign-in/sign-up form
│   ├── Application.tsx  # Welcome page
│   ├── Button.tsx       # Reusable button component
│   └── Input.tsx        # Reusable input component
├── context/
│   └── AuthContext.tsx  # Authentication state management
├── services/
│   └── authAPI.ts       # API service layer
├── types/
│   └── auth.ts          # TypeScript type definitions
├── utils/
│   └── validation.ts    # Validation utilities
├── App.tsx             # Main app component
├── App.css             # Styles
├── index.tsx           # App entry point
└── index.css           # Global styles
```

## Backend Requirements

Make sure your NestJS backend is running on `http://localhost:3000` with the following endpoints available:

- Authentication endpoints (`/auth/signup`, `/auth/signin`, `/auth/logout`)
- Protected profile endpoint (`/users/profile`)
- CORS enabled for `http://localhost:3001`

## Production Deployment

1. **Build the app:**
```bash
npm run build
```

2. **Deploy the `build` folder** to your hosting service

3. **Update API URL** in production environment variables

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend has CORS enabled
2. **API Connection**: Check if backend is running on correct port
3. **Token Issues**: Clear localStorage if experiencing auth problems

### Debug Mode

Enable debug logging by adding to `src/services/authAPI.js`:
```javascript
// Add this to see API calls in console
api.interceptors.request.use(config => {
  console.log('API Request:', config);
  return config;
});
```
