import bcrypt from 'bcrypt';
import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<Tuser>({
    id: {
        type: String,
        required: true,
    },
     password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',

    },
    isDeleted: {
        type: Boolean,
        default: false,
    }

},{
timestamps: true,    
})

// pre saved middleware /hook : will work on create() save()
userSchema.pre('save', async function(next){
    console.log(this ,'pre hook: we will save the data');
    // (auto-gen a salt and hash):
    const user = this;
    //hasing password and save into db
    user.password = await 
    bcrypt.hash(
      user.password,
       Number(config.bcrypt_salt_rounds)
    );
  next();
  })
  
  
  // set '' in the pass field into db
  userSchema.post('save', function(doc, next){
    doc.password = ""
    next();
  })
  























export const User = model<Tuser>('User', userSchema)


