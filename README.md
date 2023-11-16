# WellNest

# Technology

- [Tailwind CSS](https://tailwindui.com/)
- [React Router DOM](https://reactrouter.com/en/main)
- [React Redux](https://react-redux.js.org/)
- [Axios](https://axios-http.com/docs/intro)
- [Emotion React](https://emotion.sh/docs/introduction)
- [@headlessui/react](https://www.npmjs.com/package/@headlessui/react)
- [Heroicons React](https://heroicons.com/)
- [Moment](https://momentjs.com/)
- [React Moment](https://www.npmjs.com/package/react-moment)
- [React Dropzone](https://react-dropzone.js.org/)
- [React Select](https://react-select.com/)
- [React Spinners](https://www.davidhu.io/react-spinners/)
- [Styled Components](https://styled-components.com/)
- [Yup](https://www.npmjs.com/package/yup)
- [React Scroll To Top](https://www.npmjs.com/package/react-scroll-to-top)
- [React Share](https://www.npmjs.com/package/react-share)
- [React Elastic Carousel](https://www.npmjs.com/package/react-elastic-carousel)
- [React Quill](https://www.npmjs.com/package/react-quill)
- [Dompurify](https://www.npmjs.com/package/dompurify)

## How to Run Locally

Follow these steps to run the ReactJS application locally:

1. **Clone the Application Repository:** Clone the React application repository to your local machine.
2. **Navigate to the Project Directory:** Once cloned, navigate to the project directory by using the terminal or command prompt:

```
cd frontend
```

3. **Install Dependencies:** Install all necessary dependencies using Yarn. If you don't have Yarn, you can install it by running **`npm install -g yarn`**. After installing Yarn, install the application dependencies:

```
yarn install
```

4. Setting Up Environment Variables: Create a .env file in the root directory of your React application (inside the **`frontend`** directory). The file should contain configurations like:

```
REACT_APP_SERVER_URL=your_api_url

```

Note: Prefixing **`REACT_APP`** is essential for React applications to read environment variables.

5. **Update API Connection:** In your configuration or api connection file, ensure you replace **`your_api_url`** with the actual API connection URL.

6. **Run the React Development Server:** Start the React development server with the following command:

```
yarn start
```

7. **Accessing the React Application:** Once the server is running, your React application should be accessible at:

```
http://localhost:3000.
```
