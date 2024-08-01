import { BrowserRouter, Routes, Route } from "react-router-dom";
import Genres from "./pages/Genres/Index.js";
import Artists from "./pages/Artists/Index.js";
import Chat from "./pages/Chat/Index.js";
import NoPage from "./pages/NoPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Genres />} />
        <Route path="artists/:genreId" element={<Artists />} />
        <Route path="chat/:artistId" element={<Chat />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
