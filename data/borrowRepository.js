class BorrowRepository{
    constructor(db){
        this.db = db;
    }

    getAllBorrows(){
        const sql = 'SELECT * FROM borrows';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    getBorrowById(id){
        const sql = 'SELECT * FROM borrows WHERE id = ?';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [id], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results.length ? results[0] : null);
            });
        });
    }

    createBorrow({user_id, borrow_id, borrow_date, return_date}){
        const sql = 'INSERT INTO borrows (user_id, borrow_id, borrow_date, return_date) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [user_id, borrow_id, borrow_date, return_date], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    updateBorrow(id, {user_id, borrow_id, borrow_date, return_date}){
        const sql = 'UPDATE borrows SET user_id = ?, borrow_id = ?, borrow_date = ?, return_date = ? WHERE id = ? ';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [user_id, borrow_id, borrow_date, return_date, id], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results.affectedRows>0);
            });
        });
    }

    deleteBorrow(id){
        const sql = 'DELETE * borrows WHERE id = ?';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [id], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results.affectedRows >0);
            });
        });
    }
}

module.exports= BorrowRepository;