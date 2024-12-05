import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";  // your toast notification
import { Provider } from "react-redux";
import store from "./reduxStore/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// Create a persistor to manage persistence of state
const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>
);
