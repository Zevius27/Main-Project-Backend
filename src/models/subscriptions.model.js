
import mongoose,  {Schema} from "mongoose"; 



const subscriptionSchema = new Schema({
   subscriber: {
      type : Schema.Types.ObjectId, // the user subscribed
      ref: "User"
   },
   channel:{
      type : Schema.Types.ObjectId,// the user whom we are subscribed
      ref: "User"
   }

},
{
   timestamps:true
}

);


export const subscription = mongoose.model("Subscription", subscriptionSchema);

