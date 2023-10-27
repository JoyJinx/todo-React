import { CssBaseline } from "@mui/material";
import "../styles/App.css";
import AppNavBar from "./AppNavBar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppNavBar />
    </>
  );
}

export default App;
