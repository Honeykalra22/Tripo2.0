import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
        <Outlet />
      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2500,
        }}
      />
    </div>
  );
}

export default App;
