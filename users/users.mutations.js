import client from '../client';
import bcrypt from "bcrypt";
export default {
  Mutation:{
    createAccount: async (_,{
      username,
      email,   
      name,
      location,
      password,
      avatarURL,
      githubUsername
    })=>{
     try{
      const existingUser=await client.user.findFirst({
        where:{
        OR:[{username},{email}]
        }
      });
     if(existingUser){
       throw "Username or Email address alreay exist.";
     }
      const uglyPassword=await bcrypt.hash(password,10);
      return client.user.create({
        data:{
          username,
          email,   
          name,
          location,
          password:uglyPassword,
          avatarURL,
          githubUsername
        }
      });
    }catch(error){
      return{ok:false,error};

    }
     }
    }
  }
