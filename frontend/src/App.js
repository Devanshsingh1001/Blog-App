import { Routes , Route } from "react-router-dom";
import Auth from "./components/Auth.js";
import Blogs  from "./components/Blogs.js";
import UserBlogs  from "./components/UserBlogs.js";
import BlogDetail from "./components/BlogDetail.js";
import AddBlog from "./components/AddBlog.js";

import Header from "./components/Header.js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/index.js";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  },[dispatch]);
  return (
   <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
      { !isLoggedIn ? (
         <Route path="/auth" element={<Auth/>}/> 
  ):(
        <>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/myBlogs" element={<UserBlogs/>}/>
        <Route path="/myBlogs/:id"  element={<BlogDetail />}/>
        <Route path="/blogs/add" element={<AddBlog/>}/>{" "}
         </>
  )}
      </Routes> 
    </main>

  </React.Fragment>
  );
}

export default App;