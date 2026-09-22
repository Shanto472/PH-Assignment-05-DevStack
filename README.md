# Dev Stack Builder

Dev Stack Builder is a responsive React application for exploring popular web-development technologies and assembling a personalized project stack. It turns technology discovery into a simple, visual experience with clear categories, difficulty levels, and ratings.

## Technologies Used

- React and Vite
- Modern JavaScript (ES6+)
- Responsive CSS with shared theme variables
- React Toastify and Lucide React
- Local JSON data

## Key Features

- Browse 12 development technologies in a responsive card catalog loaded from JSON.
- Add unique technologies to a personal stack, remove individual choices, or clear everything.
- Receive clear toast feedback for add, duplicate, remove, and remove-all actions.

## Challenge Features (10 Marks)

- **React Toastify:** success, warning, and information alerts cover add, duplicate add, individual removal, and remove-all actions.
- **Loading state:** an animated spinner appears while the local technology JSON is fetched.
- **Shared gradient theme:** the `--gradient` CSS variable controls the orange-to-pink-to-violet brand text, hero highlight, and primary buttons from one place.

## Run Locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## React Questions

### 1. What is JSX, and why is it used in React?

JSX is a syntax that lets us write HTML-like markup inside JavaScript. React uses it to make component interfaces easier to read and create.

### 2. What is the difference between props and state?

Props are values a parent passes to a child and the child should not change them. State is data owned by a component that can change and cause the interface to render again.

### 3. What does the `useState` hook do, and where did you use it?

`useState` stores changing values in a component. This project uses it for the technology list, selected stack, loading and error states, and mobile menu.

### 4. What does the `useEffect` hook do, and why did you need it?

`useEffect` runs side effects after rendering. It loads the local JSON file once when the technology section first appears.

### 5. Why does every item in a `.map()` list need a unique `key` prop?

A unique key helps React identify which list item was added, changed, or removed so it can update the correct element efficiently.

### 6. What is conditional rendering? Show one place you used it.

Conditional rendering means showing different UI based on data. The stack panel shows an empty message when there are no selections and stack items when technologies have been added.

### 7. How do parent and child components communicate?

A parent sends data to a child through props. A child can call a callback function received through props to tell the parent that something happened. For example, each technology card receives its technology and an `onAdd` callback.
