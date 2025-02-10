const BookRepository = require('../data/bookRepository');

class BookService{
    constructor(db){
        this.bookRepository = new BookRepository(db);
    }

    async getAllBooks(){
        
        return await this.bookRepository.getAllBooks();
    }

    async getBookById(id){
        const book = await this.bookRepository.getBookById(id);
        if(!book){
            throw new Error('Book not found');
        }
        return book;
    }

    async createBook(title, author, genre, published_year, available){
        return await this.bookRepository.createBook(title, author, genre, published_year, available);
    }

    async updateBook(id, title, author, genre, published_year, available){
        const result = await this.bookRepository.updateBook(id, title, author, genre, published_year, available);
        if(result.affectedRows ===0 ){
            throw new Error('Book not found');
        }
        return {message: 'Book updated successfully'};
    }

    async deleteBook(id){
        const result = await this.bookRepository.deleteBook(id);
        if(result.affectedRows === 0){
            throw new Error('Book not found');
        }
        return {message: 'Book deleted successfully'};
    }
}

module.exports = BookService;