import "../styles/globals.css";
import store from "../store/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
