import client from '../../client';
import {protectedResolver} from "../user.utils";
export default {
  Mutation:{
    followUser:protectedResolver(
      async (_,{username},{loggedInUser})=>{
        const ok=await client.user.findUnique(
          {where:{username},
           select:{id:true}}
        );
        if(!ok){
          return {
            ok:false,
            error:"That user does not exists."
          }
        }
       
        const updatedUser=await client.user.Update(
          {
            where:{id:loggedInUser.id},
            data:{
              following:{
                connect:{
                  username,
                }
              }
            }
          }
        );
        if(updatedUser.id){
          return {
           ok:true
          }
        }
        else{
          return {
            ok:false,
            error:"Could not follow user."
          }
        }
        
      }
    ),
  }
}