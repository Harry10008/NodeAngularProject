import adminSchema from "../validation/adimvalidation.js"
import * as adminmodel from '../models/admin.model.js'
import jwt from "jsonwebtoken";
export const fetch = async(req,res)=>{
try{
const details = await adminmodel.fetchAdminDetails();
if(details.length===0){
  return res.status(404).json({ response: 'fail', message: 'No users found' });
}
res.status(200).json({ details})


}
catch(err){
  console.error('Error fetching users:', err);
res.status(500).json({ response: 'fail', message: 'Failed to fetch users' });
}

}

export const deleteOrder = async (req,res) =>{
  try {
    const  id  = req.query.id; // Get ID from route parameters
    if (!id) {
      return res.status(400).json({ response: 'fail', message: 'id is required' });
    }

    const result = await adminmodel.deleteOrderDetails(id); 

    if (result.affectedRows > 0) {
      res.status(200).json({ response: 'success', message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ response: 'fail', message: 'order not found' });
    }
  } catch (error) {
    console.error('Error deleting Order:', error);
    res.status(500).json({ response: 'fail', message: 'Failed to delete order' });
  }
}


export const saveOrderDetail = async (req, res) => {
  try {
    const { user_id, order_name, quantity } = req.body;  // Retrieve values from req.body

    if (!user_id || !order_name || !quantity) {
      return res.status(400).json({ 
        response: 'fail', 
        message: 'Missing required fields: user_id, order_name, quantity' 
      });
    }

    // Save the order details using the model function
    await adminmodel.saveOrder({ user_id, order_name, quantity }); 

    res.status(201).json({
      response: 'success',
      message: 'Order saved successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: 'fail', message: 'Database insertion failed' });
  }
};


export const fetchOrders = async(req,res)=>{
  try{
    const details = await adminmodel.fetchOrderDetails();
    if(details.length===0){
      return res.status(404).json({ response: 'fail', message: 'No users found' });
    }
    res.status(200).json({ details})
    
    
    }
    catch(err){
      console.error('Error fetching users:', err);
    res.status(500).json({ response: 'fail', message: 'Failed to fetch users' });
    }
  }

export const save = async(req,res)=>{
        const{error,value} = adminSchema.validate(req.body)
    
        if(error){
            return res.status(400).json({
                response: 'fail',
                message: error.details[0].message
            })
        }
    try{
    
        await adminmodel.createUser(value)
        res.status(201).json({
            response: 'success',
            message: 'user created successfully'
        })
        console.log(value)

    }catch(err){
        console.error(err);
        res.status(500).json({ response: 'fail', message: 'Database insertion failed' });
    }
}

export const loginAdmin = async (req, res) => {
    const { email, Password } = req.body;
  
    
    try {
      // Find user by email
      const adminEmail = await adminmodel.findUserByEmail(email);
        //console.log(adminEmail)
      if (!adminEmail) {
        return res.status(404).json({ message: 'User not found' });
      }
  
     
      if (adminEmail.Password === Password) {
        const payload = {email:adminEmail.email};
        const secret = 'keykey'
        // const option = { expiresIn:'5m'}
        const token = jwt.sign(payload, secret); //option);
       //console.log(token);
        //console.log(payload)
        return res.status(200).json({ message: 'Login successful',token:token });

      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    } catch (err) {
      
      res.status(500).json({ message: 'Database error during login' });
    }

  };
  export const fetchWithOrders = async (req, res) => {
    try {
      const result = await adminmodel.fetchUserOrders();
      res.status(200).json({
        response: 'success',
        data: result,
      });
    } catch (err) {
      console.error('Error fetching users and orders:', err);
      res.status(500).json({
        response: 'fail',
        message: 'Failed to fetch users and orders'
      });
    }
  };
  