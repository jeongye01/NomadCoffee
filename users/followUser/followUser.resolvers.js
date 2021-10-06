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
        await client.user.Update(
          {
            where:{id:loggedInUser.id},
            data:{
              
            }
          }
        );
      }
    ),
  }
}