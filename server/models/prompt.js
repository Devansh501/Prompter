const {Schema,models,model} = require("mongoose")

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt:{
        type:String
    },
    tag:{
        type:String
    },
    likes:{
        type:Number,
        default: 0
    },
    
})

const Prompt = model('Prompt',PromptSchema)

module.exports = Prompt