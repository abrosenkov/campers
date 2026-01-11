# 🚐 TravelTrucks

**TravelTrucks** is a frontend web application for a camper rental company.  
The goal of this project is to implement the client-side part of the application according to the provided technical specification.

The application allows users to browse available campers, apply filters, view detailed camper information, and submit a booking request.

---

## 📌 Project Goal

The purpose of this project is to build the frontend part of a web application for the company **TravelTrucks**, which specializes in camper rentals.

The application includes multiple pages:

- a home page,
- a campers catalog page,
- a camper details page with reviews and a booking form.

---

## 📄 Pages Structure

### 🏠 Home Page (`/`)

- Hero banner with a call to action
- Button **“View Now”** that navigates to the catalog page

### 📋 Catalog Page (`/catalog`)

- Displays a list of available campers
- Filtering options:
  - location (text input)
  - vehicle type (single selection)
  - equipment (multiple selection: AC, kitchen, TV, bathroom, etc.)
- Backend-based pagination using a **Load More** button
- Ability to add campers to **favorites**
- Favorites are persisted after page reload
- Price is displayed in `8000.00` format

### 🚐 Camper Details Page (`/catalog/:id`)

- Detailed camper information
- Image gallery
- Tabs:
  - **Features** (active by default)
  - **Reviews**
- Features section includes (if available):
  - transmission, engine, AC, bathroom, kitchen, TV, radio, refrigerator, microwave, gas, water
- Vehicle details include:
  - form, length, width, height, tank, consumption
- Booking form with a success notification after submission

---

## ⚙️ Functionality

- Navigation between pages using **Next.js App Router**
- Filtering and pagination are handled **only on the backend**
- Previous search results are cleared before applying new filters
- Favorites are stored in global state and preserved on page reload
- User reviews are displayed with a five-star rating system
- Booking form submission shows a success notification

---

## 🧱 Technologies Used

- **Next.js** (App Router)
- **TypeScript**
- **Zustand** — global state management
- **Axios** — HTTP requests
- **CSS Modules** — styling
- **react-hot-toast** — notifications

---

## 🗂 State Management

Global state is implemented using **Zustand** and includes:

- campers list
- filters state
- pagination state
- favorites list

---

## 📦 Installation

Install project dependencies:

```bash
npm install
```
