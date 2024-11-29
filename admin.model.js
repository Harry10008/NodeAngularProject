import connection from '../config/connection.js';

  export const createUser = (admin_details) => {
  return new Promise((resolve, reject) => {
    const { email, Password } = admin_details;
      const query = 'INSERT INTO admin_details (email, Password) VALUES (?, ?)';
      const values = [email, Password];

      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  export const saveOrder = (orderDetails) =>{
    //console.log(orderDetails)
    return new Promise ((resolve,reject)=>{
      const {user_id,order_name,quantity} = orderDetails;

      const query = 'INSERT INTO order_details (user_id, order_name, quantity) VALUES(?,?,?)';
      const values = [user_id,order_name,quantity] ;
      connection.query(query,values, (err, result)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    });
  };

  export const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admin_details WHERE email = ?';
      connection.query(query, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
          
        }
      });
    });
  };

  export const fetchAdminDetails = ()=>{
    return new Promise((resolve,reject)=>{
      const query = "SELECT * FROM admin_details "
      connection.query(query, (err,result)=>{
        if(err){
          reject(err)
          console.log(err);
        }
        else{
          resolve(result) 
        }
      })
    })
  }

  export const fetchOrderDetails =()=>{
    return new Promise((resolve,reject)=>{

      const query = `SELECT * FROM order_details
      WHERE 
      DATE(order_details.created_date) = CURDATE()
      `
      connection.query(query,(err,result)=>{
        if(err){
          reject(err)
          console.log(err);
        }
        else{
          resolve(result)
        }
      })
    })
  }

  export const deleteOrderDetails = (id) => {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('id can not get'));
      }
  
      const query = 'DELETE FROM order_details WHERE id = ?';
      connection.query(query, [id], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          return reject(err);
        }
        resolve(result);
      });
    });
  };



  export const fetchUserOrders = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 
    userDetails.id,
    userDetails.name,
    userDetails.email,
    userDetails.mobile,
    userDetails.city,
    GROUP_CONCAT(order_details.order_name) AS order_names
    FROM 
    userDetails
    LEFT JOIN 
    order_details 
    ON 
    userDetails.id = order_details.user_id
    GROUP BY 
    userDetails.id
    ORDER BY 
    userDetails.name ASC;
    `;

    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
