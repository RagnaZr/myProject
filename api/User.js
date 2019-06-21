const mongoose = require('mongoose');
const UsersData = new mongoose.Schema({
    username: String,
    password: String
});
mongoose.model('User', UsersData);

module.exports= mongoose.model('User');
