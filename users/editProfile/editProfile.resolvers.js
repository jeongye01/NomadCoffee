import client from "../../client";
import { protectedResolver } from '../users.utils';
import bcrypt from "bcrypt";
import fs from "fs";
export default {
  Mutation:{
    editProfile:protectedResolver(async (_,{
      username,      
      email, 
      name,
      location,
      password:newPassword,
      avatar,
      githubUsername},{loggedInUser})=>{
        let avatarUrl=null;
        if(avatar){
          const {filename,createReadStream}=await avatar;
          const newFilename=`${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream=fs.createReadStream();
          const writeStream=fs.createWriteStream(process.cwd()+"/uploads"+newFilename);
          readStream.pipe(writeStream);
          avatarUrl=`http://localhost:4000/static/${newFilename}`;
        }
        let uglyPassword=null;
        if(newPassword){
          uglyPassword=await bcrypt.hash(newPassword,10);
        }
        const updateUser=await client.user.update({
          where:{id:loggedInUser.id},
          data:{
            username,      
            email, 
            name,
            location,
            ...(uglyPassword&&{password:uglyPassword}),
            ...(avatarURL&&{avatar:avatarUrl})
          }
        });
        if(updateUser.id){
          return {ok:true};
        }else{
          return{
            ok:false,
            error:"Could not update profile."
          };
        }
      }
    ),
    

  }
}