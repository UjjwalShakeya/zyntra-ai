
// importing required packages (External Module)
import { Routes, Route } from "react-router-dom";

// importing required page components (Local Module)
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const App = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((Token) => console.log(Token));
  },[])

  return (
    <Routes>
      {/* route for static home page */}
      <Route path="/" element={<Home />} />

      {/* nested routes for ai features*/}
      <Route path="/ai" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="write-article" element={<WriteArticle />} />
        <Route path="blog-titles" element={<BlogTitles />} />
        <Route path="generate-images" element={<GenerateImages />} />
        <Route path="remove-background" element={<RemoveBackground />} />
        <Route path="remove-object" element={<RemoveObject />} />
        <Route path="review-resume" element={<ReviewResume />} />
        <Route path="community" element={<Community />} />
      </Route>

    </Routes>
  )
}

export default App