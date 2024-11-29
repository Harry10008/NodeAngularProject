import userschema from '../validation/uservalidation.js'
import * as userModel from '../models/user.model.js'


export const save =async(req,res)=>{
    const{error,value} = userschema.validate(req.body)
    if(error){
        return res.status(400).json({
            response: 'fail',
            message: error.details[0].message
        })
    }
try{
    await userModel.createUser(value)
    res.status(201).json({
        response: 'success',
        message: 'user created successfully',
    })
}catch(err){
    res.status(500).json({ response: 'fail', message: 'Database insertion failed' });
  }
};

export const fetch =async(req,res)=>{
    try{
        const users = await userModel.fetchdetails();
        if (users.length === 0){
        return res.status(404).json({ response: 'fail', message: 'No users found' });
        }
        res.status(200).json({ users})
    }
    catch(err){
      console.error('Error fetching users:', err);
      res.status(500).json({ response: 'fail', message: 'Failed to fetch users' });
    } 
};

export const removeUser = async (req, res) => {
    try {
      const  email  = req.query.email; 
      if (!email) {
        return res.status(400).json({ response: 'fail', message: 'email is required' });
      } 
      const result = await userModel.deleteUser(email); 
      if (result.affectedRows > 0) {
        res.status(200).json({ response: 'success', message: 'User deleted successfully' });
      } else {
        res.status(404).json({ response: 'fail', message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ response: 'fail', message: 'Failed to delete user' });
    }
};

export const editUser = async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body; 
      if (!id) {
        return res.status(400).json({ response: 'fail', message: 'ID is required' });
      }
        const result = await userModel.updateUser(id, userData);
      if (result.affectedRows > 0) {
        res.status(200).json({ response: 'success', message: 'User updated successfully' });
      } else {
        res.status(404).json({ response: 'fail', message: 'User not found' });
      }
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ response: 'fail', message: 'Failed to update user' });
  }
};