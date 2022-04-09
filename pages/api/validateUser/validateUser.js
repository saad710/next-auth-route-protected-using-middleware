import User from "../../../models/user";
import bcrypt from "bcrypt";
import connectDB from "../../../middleware/mongodb";

const handler = async (req, res) => {
    // console.log(connect)
    if (req.method === 'POST') {
        const { email, password } = req.body;

      if(email && password){
        // try {
        //     const user = await User.findOne({ email: req.body.email });
        //     // console.log(user)
        //     !user && res.status(404).json({ok:false,status:"user not found"});
         
        
        //     const validPassword = await bcrypt.compare(req.body.password, user.password)
        //     !validPassword && res.status(400).json({ok:false,status:"wrong password"})
        
            
        //     res.status(200).json({ ok: true, id:user._id , email:user.email,name:user.username })
        //     // console.log(res)
        //   } catch (err) {
        //     res.status(500).json(err)
        //   }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("USER EMAIL NOT FOUND");
            await res.status(200).json({
              ok: false,
              error: "Please input valid data",
            });
            return;
          }
            //Check the password with DB password
    const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
  
      console.log("CHECK PASSWORD", checkPassword);
  
      //if password not matched
      if (!checkPassword) {
        console.log("USER PASSWORD NOT FOUND");
        await res.status(200).json({
          ok: false,
          error: "Please input valid data",
        });
        return;
      }
     
    //   return await (200).json({ ok: true, id:user._id , email:user.email,name:user.username })
    if(user && checkPassword){
        await res.status(200).json({ ok: true, id:user._id , email:user.email,name:user.username })
    }
      
      }
    
    } else {
      res.status(422).send('req_method_not_supported');
    }
  };
  
  export default connectDB(handler);