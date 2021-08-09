const mongoose = require("mongoose")
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");


const userSehema = new mongoose.Schema({
    fristName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userinfo:{
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    encry_password:{
        type:String,
        required:true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
      },
      purchases: {
        type: Array,
        default: []
      }
});


userSehema.virtual("password").set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
}).get(function() {
    return this._password;
  });

userSehema.method ={
    autheticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
      },
    securePassword: function(plainpassword) {
        if (!password) return "";
        try {
          return crypto
            .createHmac("sha256", this.salt)
            .update(plainpassword)
            .digest("hex");
        } catch (err) {
          return "";
        }
      }
}



module.exports = mongoose.model('User', userSehema)