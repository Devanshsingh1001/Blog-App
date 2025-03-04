import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from "mongoose";


export const getAllBlogs = async(req,res,next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    } catch (err) {
        return console.log(err)
    }

    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"})
    }
    return res.status(200).json({blogs})
}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error finding user", error: err.message });
    }

    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find user by this ID" });
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        await blog.save(); 
        existingUser.blogs.push(blog);
        await existingUser.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving blog", error: err.message });
    }

    return res.status(201).json({ blog });
};


export const updateBlog = async (req,res,next) => {
    const {title,description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (err) {
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable To Update The Blog"})
    }
    return res.status(200).json({blog})
};

export const getById = async (req,res,next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({ blog });
};

export const deleteBlog = async (req,res,next) =>{
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        console.log(err);
    }
    if(!blog) {
        return res.status(500).json({message:"Unable To Delete"})
    }
    return res.status(200).json({message:"Successfully Deleted"})
}

export const getByUserId = async (req,res,next) =>{
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err){
        return console.log(err)
    }
    if(!userBlogs) {
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({ user:userBlogs});
};