const User = require("../models/user");
const Prompt = require("../models/prompt");
const {ObjectId} = require("mongodb")

const testPing = (req,res)=>{
  res.send("Pinged")
}

const createPost = async (req, res) => {
  try {
    const { user, post } = req.body;
    const prompt = await Prompt.create({
      creator: user._id,
      prompt: post.prompt,
      tag: post.tag,
    });
    res.json({ message: "Prompt Created" });
  } catch (err) {
    console.log(err);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Prompt.find({}).populate("creator");
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

const getPostByID = async (req, res) => {
  try {
    const { _id,userId } = req.body;
    if(!ObjectId.isValid(_id)) return res.json({error:"Invalid Post"})
    const post = await Prompt.findOne({ _id }).populate("creator");
    if(!post) return res.json({error:"Post Not Found"})
    if(userId!=post.creator._id) return res.json({error:"Not Authenticated"})
    return res.json({ message: "Prompt Loaded", post });
  } catch (err) {
    console.log(err);
  }
};

const postsByUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const posts = await Prompt.find({}).populate("creator");
    const data = posts.filter((item) => item.creator._id == _id);
    return res.json({ message: "Prompts Loaded", data });
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const { user, post } = req.body;
    if (user.username != post.creator.username) {
      return res.json({ error: "Not Authorized" });
    }
    await User.updateMany(
      { likedPosts: post._id },
      { $pull: { likedPosts: post._id } }
    );
    const result = await Prompt.deleteOne({ _id: post._id });
    res.json({ message: "Prompt Deleted" });
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { _id, post, logger } = req.body;
    if (logger._id == _id) {
      return res.json({ error: "Not Authorized" });
    }
    const pst = await Prompt.findById(_id);
    if (!pst) {
      return res.json({ error: "Post not found" });
    }
    pst.prompt = post.prompt;
    pst.tag = post.tag;
    const updatedPost = await pst.save();
    return res.json({ message: "Prompt Updated Successfully", updatedPost });
  } catch (err) {
    console.log(err);
  }
};

const likePost = async (req, res) => {
  const { _id, userId } = req.body;
  const post = await Prompt.findById(_id);
  const user = await User.findById(userId);

  if (!user || !post || user.likedPosts.includes(_id)) {
    return res.json({ error: "Not Allowed" });
  }

  post.likes = post.likes + 1;
  await post.save();

  if (!user.likedPosts.includes(_id)) {
    user.likedPosts.push(_id);
    await user.save();
  }
  return res.json({ message: "Upvoted!" });
};

const unlikePost = async (req, res) => {
  const { _id, userId } = req.body;
  const post = await Prompt.findById(_id);
  const user = await User.findById(userId);
  if (!post || !user || !user.likedPosts.includes(_id)) {
    return res.json({ error: "Not Allowed" });
  }
  post.likes = Math.max(0, post.likes - 1);
  await post.save();
  await User.updateOne({ _id: userId }, { $pull: { likedPosts: _id } });
  return res.json({ message: "Downvoted!" });
};

const isLiked = async (req, res) => {
  const { _id, userId } = req.body;
  const user = await User.findById(userId);
  const liked = user.likedPosts.includes(_id);
  return res.json({ liked });
};

const getLikedPosts = async (req, res) => {
  const { _id } = req.body;
  const user = await User.findById(_id).populate({
    path: 'likedPosts',
    populate:{
      path:'creator',
      model:'User',
    },
  }); 
  return res.json(user.likedPosts);
};

module.exports = {
  testPing,
  createPost,
  getAllPosts,
  getPostByID,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
  isLiked,
  postsByUser,
  getLikedPosts,
};
