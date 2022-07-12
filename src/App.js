import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/*" element={<Nopage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
