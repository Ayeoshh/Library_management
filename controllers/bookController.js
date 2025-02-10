const BookService = require('../services/bookService');

class BookController{
    constructor(db){
       
        this.bookService = new BookService(db);
        
    }

    getAllBooks = async (req, res)=>{
      
        try {
            const books = await this.bookService.getAllBooks();
            res.json(books);
        } catch (error){
            res.status(500).json({message: error.message});
        }
    };

    getBookById = async (req, res)=>{
        try{
            const {id} = req.params;
            const book = await this.bookService.getBookById(id);
            res.json(book);
        }catch (error){
            res.status(404).json({message: error.message});
        }
    };
    
    // add the part is the book is already present
    createBook = async (req, res)=>{
        try{
            const {title, author, genre, published_year, available} = req.body;
            const newBook = await this.bookService.createBook(title, author, genre, published_year, available);
            res.status(201).json({message: 'Book created successfully', book : newBook});
        } catch (error){
            res.status(500).json({message: error.message});
        }
    };
    // here also add the part is the book is already present
    updateBook = async (req, res)=>{
        try{
            const {id} = req.params;
            const {title, author, genre, published_year, available} = req.body;
            const updatedBook = await this.bookService.updateBook(id, title, author, genre, published_year, available);
            res.status(200).json(updatedBook);

        }catch (error){
            res.status(404).json({message: error.message});
        }
    }

    deleteBook = async (req, res) =>{
        try{
            const {id} = req.params;
            const deletedBook = await this.bookService.deleteBook(id);
            res.status(200).json(deletedBook);
        }catch (error){
            res.status(404).json({message: error.message});
        }
    };


}

module.exports = BookController;