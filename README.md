
# FreeFoodMonash Frontend

This is the frontend for the FreeFoodMonash project, a personal project designed to make finding free food events at Monash University simpler. The frontend is built using React Native and Expo, and it fetches data from the FreeFoodMonash API.

## Features

- Displays free food events for the week.
- Allows users to view event details and locations.
- Integrates with Google Maps for easy navigation to event locations.
- Built with React Native and Expo for cross-platform support.

## Project Structure

```plaintext
.
├── App.tsx                   # Main application file
├── AppStyles.js              # Styles for the application
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Lockfile for dependencies
├── tsconfig.json             # TypeScript configuration
├── babel.config.js           # Babel configuration
├── vercel.json               # Vercel deployment configuration
├── app.json                  # Expo configuration
└── .gitignore                # Git ignore file
```

## Installation

1. **Clone the repository**

    ```sh
    git clone https://github.com/yourusername/FreeFoodMonash-frontend.git
    cd FreeFoodMonash-frontend
    ```

2. **Install dependencies**

    Ensure you have Node.js and npm installed. Then, install the project dependencies:

    ```sh
    npm install
    ```

3. **Set up Expo**

    If you don't have Expo CLI installed, install it globally:

    ```sh
    npm install -g expo-cli
    ```

## Usage

1. **Start the development server**

    ```sh
    npm start
    ```

    This will start the Expo development server. You can then use the Expo Go app on your mobile device or an emulator to run the app.

2. **Build for web**

    To build the project for web deployment, use the following command:

    ```sh
    npx expo export:web
    ```

3. **Deploy with Vercel**

    The project is configured to deploy to Vercel. You can use the following command to deploy:

    ```sh
    vercel
    ```

## Files

### `App.tsx`

Contains the main application logic, including fetching data from the API and rendering the schedule of events.

### `AppStyles.js`

Defines the styles used throughout the application.

### `package.json`

Lists the project dependencies and scripts for running and building the project.

### `tsconfig.json`

Configures TypeScript for the project, ensuring strict type checking.

### `babel.config.js`

Configures Babel for transpiling the code.

### `vercel.json`

Configures Vercel deployment settings, including build and development commands.

### `app.json`

Configures the Expo project, including app name, icon, and splash screen.

### `.gitignore`

Specifies files and directories to be ignored by Git.

## Dependencies

- `@rneui/themed`
- `axios`
- `expo`
- `expo-status-bar`
- `react`
- `react-dom`
- `react-native`
- `react-native-web`
- `@expo/webpack-config`
- `@babel/core`
- `@types/react`
- `typescript`

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or issues, please contact [amirkj221@gmail.com].

