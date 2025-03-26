
import { Route, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import Home from "./components/Home";
import Land from "./components/Login";
const App = () => {
  return (
    <Routes>
      <Route path="/details" element={<Home />} />
      <Route path="/chat" element={<ChatBot />} />
      <Route path="/login" element={<Land />} />
    </Routes>
  );
};

export default App;
