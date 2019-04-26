const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        name: {type: String, unique: true, index: true},
        email: {type: String, unique: true, index: true},
        password: {type: String, requred: true},
        avatar: {type: String, default: '/static/images/avatar.png'},
        info: {type: String, trim: true, maxlength: 100},
        articles: [{type: Schema.Types.ObjectId, ref: 'Article'}],
        claps: [{type: Schema.Types.ObjectId, ref: 'Article'}],
        bookmarks: [{type: Schema.Types.ObjectId, ref: 'Article'}],
        following: [{type: Schema.Types.ObjectId, ref: 'User'}],
        followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
        status: {type: String, required: true, default: 'general'},

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

userSchema.methods.toWeb = function(){
    const user = this.toJSON();
    delete user.password;
    return user
}

userSchema.methods.toWebShort = function(){
    const userData = this.toJSON();
    const user = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        status: userData.status,
        avatar: userData.avatar,
    } 
    return user;
}

module.exports = model('User', userSchema);