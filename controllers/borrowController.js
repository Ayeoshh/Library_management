// get all borrows
const getAllBorrow = (req, res, db)=>{
    const sql = 'SELECT * FROM borrows';
    db.query(sql, (err, results)=>{
        if(err){
            console.log('Error fetching borrows: ', err.message);
            return res.status(500).json({message: 'Error fetching borrows'});
        }
        res.status(200).json(results);
    });
};
// get borrow by id
const getBorrowById = (req, res, db)=>{
    const {id} = req.params;
    const sql = 'SELECT * FROM borrows WHERE id = ?';
    db.query(sql, [id], (err, results)=>{
        if(err){
            console.log('Error fetching borrow:', err.message);
            return res.status(500).json({message: 'Error fetching borrow'});
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Borrow not found' });
        }
        res.status(200).json(results[0]);
    });
};
// create a borrow 
const createBorrow = (req, res, db)=>{
    const {user_id, book_id, borrow_date, return_date} = req.body;
    const sql = 'INSERT INTO borrows (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, book_id, borrow_date, return_date], (err, results)=>{
        if(err){
            console.log('Error creating borrow', err.message);
            return res.status(500).json({message: 'Error creating borrow'});
        }
        res.status(201).json({message: 'Borrow created successfully'});
    });
};
// update a borrow by id
const updateBorrow = (req, res, db)=>{
    const {id} = req.params;
    const {user_id, book_id, borrow_date, return_date} = req.body;
    const sql = 'UPDATE borrows SET user_id = ?, book_id = ?, borrow_date = ?, return_date = ? WHERE id = ?';
    db.query(sql, [user_id, book_id, borrow_date, return_date, id], (err, results)=>{
        if(err){
            console.log('Error updating borrow', err.message);
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Borrow not found' });
        }
        res.status(200).json({message: 'Borrow updated successfully'});
    });
};
// delete a borrow by id
const deleteBorrow = (req, res, db)=>{
    const {id} = req.params.id;
    const sql = 'DELETE FROM borrows WHERE id = ?';
    db.query(sql, [id], (err, results)=>{
        if(err){
            console.log('Error deleting borrow', err.message);
            return res.status(500).json({message: 'Error deleting borrow'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Borrow not found' });
        }
        res.status(200).json({message: 'Borrow deleted successfully'});
    });
};

module.exports ={
    getAllBorrow,
    getBorrowById,
    createBorrow,
    updateBorrow,
    deleteBorrow
};