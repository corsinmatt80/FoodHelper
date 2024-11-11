# Food Helper

**Food Helper** is a web application that allows users to find recipes based on the ingredients they have on hand. The app integrates with the Spoonacular API to fetch recipes, displays a list of relevant recipes, and provides detailed information about each recipe, including cooking time, ingredients, nutritional values, and instructions.

## Features

- Search recipes based on ingredients.
- Display list of recipes with images and ingredient information.
- View detailed recipe information, including cooking time, calories, protein, and instructions.
- Responsive and clean UI for an optimal user experience.

## Project Structure

The project is organized as follows:

```plaintext
project-root/
├── assets/
│   ├── images/               # Store images used in the app
│   └── styles.css            # Main stylesheet for the application
├── config/
│   └── config.js             # Configuration file for API keys and base URLs
├── index.html                # Main HTML file for the application
├── scripts/
│   ├── main.js               # Entry point for initializing app and handling events
│   ├── services/
│   │   └── apiService.js     # Responsible for API calls
│   ├── views/
│   │   ├── recipeListView.js # Handles displaying the recipe list
│   │   └── recipeDetailView.js # Handles displaying recipe details
│   ├── utils/
│   │   ├── domUtils.js       # Utility functions for DOM manipulation
│   │   └── helpers.js        # General helper functions
├── tests/
│   ├── unit/                 # Unit tests for individual modules
│   ├── integration/          # Integration tests for app functionality
│   └── setupTests.js         # Setup or global configuration for tests
├── config.js                 # Project-wide configuration (if needed for other setups)
└── README.md                 # Project documentation

