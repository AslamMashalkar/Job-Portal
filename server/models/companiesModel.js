import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import  JWt  from "jsonwebtoken";

const companySchema = new Schema({
  name: {
    type:  String,
    required: [true, "Company Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validat: validator.isEmail,
  },
  password:{
    type: String,
    required: [true, "Password is requird"],
    minlength: [6, "Password must be atleast"],
    select: true,
  },
  contact: {type: String},
  location:{type: String},
  profileUrl: {type: String},
  about: {type: String},
  jobPosts: [{type: Schema.Types.ObjectId, ref: "Jobs"}],
});


companySchema.pre("save", async function(){

  if(!this.isModified) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

//comapre
companySchema.methods.comparePassword = async function(userPassword){
  const isMatch = await bcrypt.compare(userPassword, this.password);

  return isMatch;
};

//jwt token
companySchema.methods.createJWT = async function () {
  return JWt.sign({userId: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: "Id",}
    );
};


const Companies = mongoose.model("Companies", companySchema);

export default Companies;