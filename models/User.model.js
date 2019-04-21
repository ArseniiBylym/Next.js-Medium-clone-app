const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        name: {type: String, trim: true, unique: true, minlenght: 3, maxlength: 15, reqired: 'Name is required', index: true},
        email: {type: String, trim: true, unique: true, lowercase: true, reqired: 'Email is required', index: true},
        password: {type: String, requred: true},
        avatar: String,
        info: {type: String, trim: true, maxlength: 100},
        articles: [{type: Schema.Types.ObjecId, ref: 'Article'}],
        claps: [{type: Schema.Types.ObjectId, ref: 'Articles'}],
        following: [{type: Schema.Types.ObjectId, ref: 'User'}],
        followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    }, 
    {
        timestamps: true
    }
)

userSchema.pre('findById', function (next) {
    this.populate('articles', '_id title subTitle claps image');
    this.populate('claps', '_id title subTitle claps image');
    this.populate('following', '_id name avatar');
    this.populate('followers', '_id name avatar');
})

module.exports = model('User', userSchema);