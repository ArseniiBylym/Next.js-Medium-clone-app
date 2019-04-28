const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        name: {type: String, unique: true, index: true},
        email: {type: String, unique: true, index: true},
        password: {type: String, requred: true},
        avatar: {type: String, default: '/static/images/avatar.png'},
        info: {type: String, trim: true, maxlength: 100},
        articles: [{type: Schema.Types.ObjectId, ref: 'Article'}],
        likes: [{type: Schema.Types.ObjectId, ref: 'Article'}],
        bookmarks: [{type: Schema.Types.ObjectId, ref: 'Article'}],
        following: [{type: Schema.Types.ObjectId, ref: 'User'}],
        followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
        status: {type: String, required: true, default: 'general'},
    }, 
    {
        timestamps: true
    }
)

userSchema.statics.findOneByEmail = function (email, cb) {
    return this.findOne({email: email}, cb)
}

userSchema.pre('findById', function (next) {
    this.populate('articles', '_id title subTitle likes image');
    this.populate('likes', '_id title subTitle likes image');
    this.populate('following', '_id name avatar email');
    this.populate('followers', '_id name avatar email');
    next()
})

userSchema.methods.withoutPassword = function(){
    const user = this.toJSON();
    delete user.password;
    return user
}

module.exports = model('User', userSchema);