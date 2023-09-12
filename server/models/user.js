const {Schema,models,model} = require("mongoose")


const UserSchema = new Schema({
    email:{
       type:String,
    },
    username: {
        type:String
    },
    password:{
     type:String
    },
    likedPosts:[{
        type:Schema.Types.ObjectId,
        ref: 'Prompt'
    }]
})

const User = models.User || model("User",UserSchema);

module.exports = User

