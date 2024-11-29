import connection from '../config/connection.js'


export const createUser = (userDetails) => {
    return new Promise((resolve, reject) => {
      const { email, name, mobile, city} = userDetails;
  
      const query = 'INSERT INTO userDetails (email, name, mobile, city) VALUES (?, ?, ?, ?)';
      const values = [email, name, mobile, city];  
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  export const fetchdetails =() => {
    return new Promise ((resolve,reject)=>{
        const query = 'SELECT * FROM userDetails ORDER BY name ASC';
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

  export const updateUser = (id, userData) => {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('ID is required'));
      }
      const { name, email, mobile, city } = userData;
      if (!name && !email && !mobile && !city) {
        return reject(new Error('No valid fields to update'));
      }
      const query = 'UPDATE userDetails SET name=?, email=?, mobile=?, city=? WHERE id=?';
      connection.query(query, [name, email, mobile, city, id], (err, result) => {
        if (err) {
          console.log("Error executing query:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  };
  
export const deleteUser = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      return reject(new Error('email is required'));
    }
    const query = 'DELETE FROM userDetails WHERE email = ?';
    connection.query(query, [email], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return reject(err);
      }
      resolve(result); 
    });
  });
};