const bcrypt = require('bcryptjs');
// user sequelize model
class UserRepository{
    constructor(db){
        this.db = db;
    }
    async getAllUsers(){
    
        const sql = 'SELECT * FROM users';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    async getUserById(id){
        const sql = 'SELECT * FROM users WHERE id = ?';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [id], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results.length ? results[0]: null);
            });
        });
    }

    async findUserByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = $1'; // Fix for PostgreSQL
        return new Promise((resolve, reject) => {
            this.db.query(sql, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.rows.length > 0 ? results.rows[0] : null);
            });
        });
    }
    
    // async findUserByEmail(email){
    //     const sql = 'SELECT * FROM users WHERE email = ?';
    //     return new Promise((resolve, reject)=>{
    //         this.db.query(sql, [email], (err, results)=>{
    //             if(err){
    //                 return reject(err);
    //             }
    //             resolve(results.length>0 ? results[0] : null );
    //         });
    //     });
    // }

    async createUser(name, email, password) {
        console.log("In createUser********");
        console.log("Received parameters:", { name, email, password });
    
        if (!name || !email || !password) {
            throw new Error("Missing required fields: name, email, or password");
        }
    
        const existingUser = await this.findUserByEmail(email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
    
        console.log("Proceeding with user creation...");
        
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);
    
        // Use the correct placeholder syntax based on your database:
        const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';  // Use $1, $2, $3 for PostgreSQL
    
        return new Promise((resolve, reject) => {
            this.db.query(sql, [name, email, hashedPassword], (err, results) => {
                if (err) {
                    console.error("Database Insert Error:", err);
                    return reject(err);
                }
                console.log("User Created Successfully:", results.rows);
                resolve(results.rows[0]); // PostgreSQL returns results inside `rows`
            });
        });
    }
    

    // async createUser(name , email, password){
    //     console.log("in createuser********")
    //     const existingUser = await this.findUserByEmail(email);
    //     if (existingUser) {
    //         throw new Error("User with this email already exists");
    //     }
    //     console.log("TEST***************************")
    //     // const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    //     const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
       
    //     const hashedPassword = await bcrypt.hash(password, 10);
       
    //     return new Promise((resolve, reject)=>{
    //         this.db.query(sql, [name, email, hashedPassword], (err, results)=>{
    //             console.log("testtttttttt after query")
    //             if(err){
    //                 reject(err);
    //             }
    //             resolve(results);
    //         });
    //     });
    // }

    async updateUser(id, name, email, password){
        const sql = 'UPDATE users SET name = ? , email = ?';
        const params = [name, email];

        if(password){
            password = await bcrypt.hash(password, 10);
            sql += ', password = ?';
            params.push(password);
        }
        sql += 'WHERE id = ?';
        params.push(id);

        return new Promise((resolve, reject)=>{
            this.db.query(sql, params, (err, results)=>{
                if(err){
                    reject(err);
                }
                resolve(results);
            });
        });
    }

    async deleteUser(id){
        const sql = 'DELETE FROM users WHERE id = ?';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [id], (err, results)=>{
                if(err){
                    reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = UserRepository;