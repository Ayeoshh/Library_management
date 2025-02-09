class BookRepository{
    constructor(db){
        this.db = db;
    }

    async getAllBooks(){
        const sql = 'SELECT * FROM books';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    async getBookById(id){
        const sql = 'SELECT * FROM books WHERE id = ?';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [id], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results.length ? results[0] : null);
            });
        });
    }

    async createBook(title, author, genre, published_year, available){
        const sql = 'INSERT INTO books (title, author, genre, published_year, available) VALUES (?,?,?,?,?)';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [title, author, genre, published_year, available], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    async updateBook(id, title, author, genre, published_year, available){
        const sql = 'UPDATE books SET title = ? , author = ?, genre = ?, published_year = ?, available = ? WHERE id = ?';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [title, author, genre, published_year, available, id], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    async deleteBook(id){
        const sql = 'DELETE FROM books WHERE id = ?';
        return new Promise((resolve, reject)=>{
            this.db.query(sql, [id], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}


module.exports = BookRepository;