const {Schema, model} = require('mongoose');

const articleSchema = new Schema(
    {
        title: {type: String, trim: true, minlenght: 3, maxlength: 100, reqired: 'Title is required'},
        subTitle: {type: String, trim: true, minlength: 3, maxlength: 150},
        text: {type: String},
        image: {type: String},
        author: [{type: Schema.Types.ObjectId, ref: 'User'}],
        comments: [{
            author: {type: Schema.Types.ObjectId, ref: 'User'},
            text: {type: String, required: true, maxlength: 500},
            createdAt: {type: Date, required: true, default: new Date()},
        }],
        claps: [{type: Schema.Types.ObjectId, ref: 'User'}],
        tags: [{type: String, maxlength: 30}],
        isPrivate: {type: Boolean, default: false},
    }, 
    {
        timestamps: true
    }
)

articleSchema.index({title: 'text'})

articleSchema.pre('findById', function (next) {
    this.populate('autor', '_id name avatar');
    this.populate('comments.author', '_id name avatar');
    this.populate('claps', '_id name avatar');
})

module.exports = model('Article', articleSchema);