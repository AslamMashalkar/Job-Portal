import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import  JWt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password:{
    type: String,
    required: [true, "Password is requird"],
    minlength: [6, "Password must be atleast"],
    select: true,
  },

  accountType: {type: String, default:"seeker"},
  contact: {type: String},
  location:{type: String},
  profileUrl: {type: String},
  jobTitle: {type: String},
  about: {type: String},
},
{timestamps: true}
);

//middlewares
userSchema.pre("save", async function(){

  if(!this.isModified) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

//comapre
userSchema.methods.comparePassword = async function(userPassword){
  const isMatch = await bcrypt.compare(userPassword, this.password);

  return isMatch;
};

//jwt token
userSchema.methods.createJWT = async function () {
  return JWt.sign({userId: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: "Id",}
    );
};

const Users = mongoose.model("Users", userSchema);

export default Users;