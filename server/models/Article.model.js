const {Schema, model} = require('mongoose');

const articleSchema = new Schema(
    {
        title: {type: String, trim: true, minlenght: 3, maxlength: 100, reqired: 'Title is required'},
        subTitle: {type: String, trim: true},
        text: {type: String, required: true},
        image: {type: String},
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        comments: [{
            author: {type: Schema.Types.ObjectId, ref: 'User'},
            text: {type: String, required: true, maxlength: 500},
            createdAt: {type: Date, required: true, default: new Date()},
        }],
        likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
        likesLength: {type: Number, default: 0},
        tags: [{type: String, maxlength: 30}],
        isPrivate: {type: Boolean, default: false},
    }, 
    {
        timestamps: true
    }
)

articleSchema.index({title: 'text'})

articleSchema.methods.getCommentsId = function() {
    return this.comments.map(comment => comment.author)
}

module.exports = model('Article', articleSchema);