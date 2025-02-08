// getting all users
const getAllUsers = (req, res, db)=>{
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) =>{
        if(err){
            console.log('Error fetching users', err.message);
            return res.status(500).json({message: 'Error fetching users'});
        }
        res.json(results);
    });
};

// get a user by id
const getUserById = (req, res, db)=>{
    const {id} = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results)=>{
        if(err){
            console.log('Error fetching user', err.message);
            return res.status(500).json({message: 'Error fetching user'});
        }
        if(results.length === 0){
            return res.status(404).json({message: "User not found"});
        }
        res.json(results[0]);
    });
};

// create a user
const createUser = async (req, res, db)=>{
    try {
        const {name, email, password} = req.body;
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(sql, [name,email, hashedPassword], (err, results)=>{
            if(err){
                console.log('Error creating user', err.message);
                return res.status(500).json({message: 'Error creating user'});
            }
            res.json(results);
        });
    } catch (error){
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

// update a user by ID
const updateUser = async (req,res, db)=>{
    try{
        const {id} = req.params;
        const {name, email, password} = req.body;
        const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
        if(password){
            password = await bcrypt.hash(password,10);
        }
        db.query(sql, [name, email, password,id], (err, results)=>{
            if(err){
                return res.status(500).json({message:"Database error", error: err.message});
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({message: "User updated successfully"});
        });
    } catch (error){
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

// delete a user by ID
const deleteUser = (req,res, db)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, results)=>{
        if(err){
            return res.status(500).json({message:"Database error", error: err.message});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({message:"User deleted successfully"});
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

