
# Todo App

This is a fully-featured **To-Do List Application** built using **Next.js**, **TypeScript**, and **Tailwind CSS**. The app allows users to add, mark, search, filter, archive, and delete todos. It also includes features for bulk actions and confirmation modals for deletion.

## Features

- **Add a New Todo**: Easily add new tasks using an input field.
- **Mark Todo as Done**: Mark tasks as complete with just a click.
- **Edit/Delete Todos**: Update or remove todos.
- **Archive Todo**: Archive completed or unnecessary tasks.
- **Tab Navigation**: Switch between active, done, and archived todos.
- **Multi-Select**: Select multiple todos for bulk archiving or deleting.
- **Color Differentiation**: Done todos are visually distinct from active todos.
- **Select All**: A toggle to select all todos for bulk actions.
- **Search Bar**: Search through todos with filters for done, active, or archived tasks.
- **Confirmation Modal**: Displays a modal before deleting todos to avoid accidental deletions.

## Tech Stack

- **Next.js**: The React framework for production-grade apps.
- **TypeScript**: Strongly typed JavaScript for better code quality and readability.
- **Tailwind CSS**: Utility-first CSS for fast and responsive UI styling.
- **Local State Management**: Managed with React's `useState`.

## Project Structure

Since the app is small, it is structured in a simple manner without decomposition into multiple components:




## Screenshots

<img src="/todo-list/screenshot.png" alt="Todo App Screenshot" width="700">

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed (>=16.x.x).
- **npm** or **yarn**: Ensure npm or yarn is installed globally.

### Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/todo-app.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd todo-app
   ```

3. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

### Running the App

To run the application in development mode:

```bash
npm run dev
```

or

```bash
yarn dev
```

This will start the development server at `http://localhost:3000`.

### Building for Production

To build the application for production:

```bash
npm run build
```

or

```bash
yarn build
```

This will create an optimized build in the `.next` folder, which can be deployed.

## Features Walkthrough

- **Add Todos**: Use the input field to add tasks and press `add`.
- **Mark Todos as Done**: Click the checkbox next to a todo to mark it as done.
- **Edit/Delete Todos**: Click the "edit" or "delete" icon on each todo to modify or remove it.
- **Archive Todo**: Archive done or unnecessary todos for better organization.
- **Tab Navigation**: Easily switch between active, done, and archived todos using the tab component.
- **Multi-Select**: Select multiple todos for bulk actions with checkboxes.
- **Search Bar**: Use the search bar to filter todos based on text content.
- **Delete Confirmation Modal**: Confirm the deletion of todos with a pop-up modal.

## Customization

You can easily modify the app:

- **Styling**: The app uses **Tailwind CSS** for styling. Adjust the classes in `index.tsx` to change the look and feel.
- **State Management**: The current app uses React's `useState` for state.

## Best Practices Followed

- **Single-File Structure**: Due to the small size of the app, all logic is consolidated into `page.tsx`. This avoids unnecessary component decomposition.
- **TypeScript**: The app is strongly typed using TypeScript to catch errors early and improve code readability.
- **Responsive Design**: Tailwind CSS ensures a mobile-friendly, responsive layout.


