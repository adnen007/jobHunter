import ReactDOM from "react-dom/client";
import "./normalize.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
