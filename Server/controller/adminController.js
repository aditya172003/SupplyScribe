

const User            = require("../Schema/account_schema")
const Stationary_itms = require('../Schema/stationary_items_schema');
const userOrders      = require('../Schema/userOreder_schema')


exports.SaveUser = async (req,res)=>{
   const {name,email,phone,rollNo,year,password} = req.body
   if(!name||!phone||!email||!rollNo||!year||!password)
    {
       return res.json({message:"enter the data first "}).status(401);
    }
    const obj = await User.findOne({email,rollNo})
    if(obj)
    {
       return res.json({message:"alreaddy resgistrerd"});

    }

    const newUser =  await new User({name,email,phone ,rollNo,year,password});

    if(newUser.save())
    {
        res.json({message:"user rigistered successfully"}).status(200);
    }
    else
    {
        res.json({message:"internal server error"}).status(500);
    }
}


exports.ItemAdd = async(req,res)=>{
    const {name,price,available} = req.body
    if(!name || !price || !available)
    {
        return res.status(404).json({message : "please enter the valid data "})
    }
    const rating  = 0;
    const data = new Stationary_itms({name,price,available,rating});
    const resp = await data.save();
    if(resp)
    {
        res.json({message : "Item saved "})
    }
    else
    {
        res.json({message : "Server Error please try again letter"})
    }
}

exports.changeAvailability = async(req,res)=>{
    const {num}=req.body;
    const id=req.params.id
    console.log(id);
    const item = await Stationary_itms.updateOne({id : id },{$set:{available:num}})
    if(item)
    {
        res.status(200).json({message :"value updated successfully"});
    }
    else
    {
        res.status(401).json({message :"value cant be updated "});
    }

}

exports.orderStatusChange = async(req,res)=>{
    const id = req.params.id;
    //const id = req.body
   console.log(id);
  
    const ordestc = await userOrders.updateOne({_id:id},{$set:{orderStatus:"preapered"}});
  
    if(ordestc)
    {
        res.status(200).json({mess:"order status changed to on the way"});
    }
    else
    {
       res.status(401).json({message :"value cant be updated "});
    }
}


exports.getUser =  async(req,res) =>{
    const {roll} = req.body 
  
    await User.findOne({rollNo:roll})
    .then((user)=>{
        res.status(200).send(user);
    }
    )
    .catch(err=>{
        res.status(404).json({message:"User Not found"})
    })
}


exports.allOrders = async (req,res)=>{
    const orders  = await userOrders.find({});

    res.status(200).send(orders);
}



// delete completed orders


