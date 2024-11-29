// Load the mysql2 library
import mysql from 'mysql2'

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',        // or your MySQL host (e.g., '127.0.0.1')
  user: 'root',             // MySQL username (usually 'root' for local setups)
  password: 'samo123', // MySQL password (replace with your password)
  database: 'crud_operation'  // The name of the database you want to connect to
});

// Establish the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL ');
});

export default connection;
