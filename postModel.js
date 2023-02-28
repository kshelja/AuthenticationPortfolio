const mongoose = require('mongoose');




const schema = mongoose.Schema(
    {
        name: 'String',
        number: 'String',
        email: 'String'
    },
    {timestamps: true}
)

const Post = mongoose.model('Post', schema);


// const Schema = mongoose.Schema;
// const SomeModelSchema = new Schema({
//     title: {type: String},
//     content: {type: String},
// });
// const Post = mongoose.model("Post", SomeModelSchema);


module.exports =  Post;