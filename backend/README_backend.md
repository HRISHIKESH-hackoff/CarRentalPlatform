# Backend API Documentation

## Overview
This documentation covers all API endpoints for the Car Rental Platform backend. The API provides endpoints for user authentication, car management, and booking operations.

Base URL: `http://localhost:5000/api`

## Authentication

### Register User
**Endpoint:** `POST /auth/register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response (Success - 201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

**Response (Error - 400):**
```json
{
  "error": "User already exists"
}
```

---

### Login User
**Endpoint:** `POST /auth/login`

**Description:** Login with existing user credentials

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

**Response (Error - 401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### Get User Profile
**Endpoint:** `GET /auth/profile`

**Description:** Get current user profile (requires authentication)

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Access denied. No token provided"
}
```

---

## Cars

### Get All Cars
**Endpoint:** `GET /cars`

**Description:** Retrieve all available cars

**Query Parameters (optional):**
- `location` - Filter by location
- `available` - Filter by availability (true/false)

**Example Request:**
```
GET /api/cars?location=New York&available=true
```

**Response (Success - 200):**
```json
{
  "cars": [
    {
      "id": "car_id",
      "make": "Toyota",
      "model": "Camry",
      "year": 2022,
      "color": "Silver",
      "pricePerDay": 50,
      "location": "New York",
      "available": true,
      "features": ["AC", "GPS", "Bluetooth"],
      "image": "car_image_url"
    }
  ]
}
```

---

### Get Car by ID
**Endpoint:** `GET /cars/:id`

**Description:** Retrieve a specific car by ID

**Response (Success - 200):**
```json
{
  "car": {
    "id": "car_id",
    "make": "Toyota",
    "model": "Camry",
    "year": 2022,
    "color": "Silver",
    "pricePerDay": 50,
    "location": "New York",
    "available": true,
    "features": ["AC", "GPS", "Bluetooth"],
    "image": "car_image_url"
  }
}
```

**Response (Error - 404):**
```json
{
  "error": "Car not found"
}
```

---

### Add New Car (Admin Only)
**Endpoint:** `POST /cars`

**Description:** Add a new car to the fleet (requires admin authentication)

**Headers:**
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "make": "Honda",
  "model": "Civic",
  "year": 2023,
  "color": "Blue",
  "pricePerDay": 45,
  "location": "Los Angeles",
  "features": ["AC", "GPS", "Backup Camera"],
  "image": "car_image_url"
}
```

**Response (Success - 201):**
```json
{
  "message": "Car added successfully",
  "car": {
    "id": "new_car_id",
    "make": "Honda",
    "model": "Civic",
    "year": 2023,
    "color": "Blue",
    "pricePerDay": 45,
    "location": "Los Angeles",
    "available": true,
    "features": ["AC", "GPS", "Backup Camera"],
    "image": "car_image_url"
  }
}
```

---

### Update Car (Admin Only)
**Endpoint:** `PUT /cars/:id`

**Description:** Update car information (requires admin authentication)

**Headers:**
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "pricePerDay": 55,
  "available": false
}
```

**Response (Success - 200):**
```json
{
  "message": "Car updated successfully",
  "car": {
    "id": "car_id",
    "make": "Honda",
    "model": "Civic",
    "year": 2023,
    "color": "Blue",
    "pricePerDay": 55,
    "location": "Los Angeles",
    "available": false,
    "features": ["AC", "GPS", "Backup Camera"],
    "image": "car_image_url"
  }
}
```

---

### Delete Car (Admin Only)
**Endpoint:** `DELETE /cars/:id`

**Description:** Remove a car from the fleet (requires admin authentication)

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (Success - 200):**
```json
{
  "message": "Car deleted successfully"
}
```

---

## Bookings

### Create Booking
**Endpoint:** `POST /bookings`

**Description:** Create a new car rental booking (requires user authentication)

**Headers:**
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "carId": "car_id",
  "startDate": "2024-01-15",
  "endDate": "2024-01-20",
  "totalAmount": 250
}
```

**Response (Success - 201):**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": "booking_id",
    "userId": "user_id",
    "carId": "car_id",
    "startDate": "2024-01-15",
    "endDate": "2024-01-20",
    "totalAmount": 250,
    "status": "confirmed",
    "createdAt": "2024-01-10T10:00:00Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "error": "Car is not available for selected dates"
}
```

---

### Get User Bookings
**Endpoint:** `GET /bookings/user`

**Description:** Get all bookings for the authenticated user

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (Success - 200):**
```json
{
  "bookings": [
    {
      "id": "booking_id",
      "car": {
        "id": "car_id",
        "make": "Toyota",
        "model": "Camry",
        "image": "car_image_url"
      },
      "startDate": "2024-01-15",
      "endDate": "2024-01-20",
      "totalAmount": 250,
      "status": "confirmed",
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ]
}
```

---

### Get All Bookings (Admin Only)
**Endpoint:** `GET /bookings`

**Description:** Get all bookings in the system (requires admin authentication)

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (Success - 200):**
```json
{
  "bookings": [
    {
      "id": "booking_id",
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "car": {
        "id": "car_id",
        "make": "Toyota",
        "model": "Camry"
      },
      "startDate": "2024-01-15",
      "endDate": "2024-01-20",
      "totalAmount": 250,
      "status": "confirmed",
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ]
}
```

---

### Get Booking by ID
**Endpoint:** `GET /bookings/:id`

**Description:** Get a specific booking by ID (users can only access their own bookings)

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (Success - 200):**
```json
{
  "booking": {
    "id": "booking_id",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "car": {
      "id": "car_id",
      "make": "Toyota",
      "model": "Camry",
      "year": 2022,
      "image": "car_image_url"
    },
    "startDate": "2024-01-15",
    "endDate": "2024-01-20",
    "totalAmount": 250,
    "status": "confirmed",
    "createdAt": "2024-01-10T10:00:00Z"
  }
}
```

---

### Update Booking Status (Admin Only)
**Endpoint:** `PUT /bookings/:id/status`

**Description:** Update booking status (requires admin authentication)

**Headers:**
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "cancelled"
}
```

**Allowed Status Values:** `confirmed`, `in-progress`, `completed`, `cancelled`

**Response (Success - 200):**
```json
{
  "message": "Booking status updated successfully",
  "booking": {
    "id": "booking_id",
    "status": "cancelled"
  }
}
```

---

### Cancel Booking
**Endpoint:** `DELETE /bookings/:id`

**Description:** Cancel a booking (users can cancel their own bookings)

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (Success - 200):**
```json
{
  "message": "Booking cancelled successfully"
}
```

**Response (Error - 403):**
```json
{
  "error": "You can only cancel your own bookings"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer your_jwt_token_here
```

Tokens are obtained through the login endpoint and expire after 24 hours.

---

## Rate Limiting

API endpoints are rate limited to 100 requests per minute per IP address.

---

## CORS

The API accepts requests from the frontend application running on `http://localhost:3000` in development mode.
