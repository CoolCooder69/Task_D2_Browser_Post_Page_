import "./App.css";
import { Routes, Route } from "react-router-dom";
import NewsLetter from "./Pages/newsLetter";
import CustomCursor from "./components/cursor";
import Home from "./Pages/Home";

import Login from "./Pages/login";
import Signup from "./Pages/signupPage";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Logout from "./Pages/Logout";
import Post from "./Pages/post";
import Pricing from "./Pages/pricing";
import BrowsePosts from "./Pages/browsePosts";


function App() {
  return (
    <>
      <Navbar />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsletter" element={<NewsLetter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/post" element={<Post />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/browse" element={<BrowsePosts />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
