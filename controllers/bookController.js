// get all books
const getAllBooks = (req, res, db)=>{
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, results)=>{
        if(err){
            console.log('Error fetching books', err.message);
            return res.status(500).json({message : err.message});
        }
        res.status(200).json(results);
    });
};
// get book by id
const getBookById = (req, res, db) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM books WHERE id = ?';
    db.query(sql, [id], (err, results)=>{
        if(err){
            console.log('Error fetching book', err.message);
            return res.status(500).json({message: err.message});
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(results[0]);
    });
};
// create new book
const createBook = (req, res, db) =>{
    const {title, author, genre, published_year, available} = req.body;
    const sql = 'INSERT INTO books (title, author, genre, published_year, available) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, author, genre, published_year, available], (err, results)=>{
        if(err){
            console.log('Error creating book', err.message);
            return res.status(500).json({message: err.message});
        }
        res.status(201).json({message: 'Book created successfully'});
    });
};
// update book by id
const updateBook = (req, res, db)=>{
    const {id} = req.params;
    const {title, author, genre, published_year, available} = req.body;
    const sql = 'UPDATE books SET title = ? , author = ?, genre = ?, published_year = ?, available = ? WHERE id =?';
    db.query(sql, [title, author, genre, published_year, available, id], (err, results)=>{
        if(err){
            console.log('Error updating book', err.message)
            return res.status(500).json({message: err.message});
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({message: 'Book updated successfully'});
    });
};
// delete book by id
const deleteBook  = (req, res, db)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM books WHERE id=?';
    db.query(sql, [id], (err, results)=>{
        if(err){
            console.log('Error deleting book', err.message);
            return res.status(500).json({message: err.message});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({message: 'Book deleted successfully'});
    })
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};