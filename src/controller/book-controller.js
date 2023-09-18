import BookService from "../service/book-service.js";

const bookService = new BookService();
class BookController{
    add(req,res,next){
        try {
            const id = bookService.add(req.body);
            return res.status(201).json({
                status : 'success',
                message : 'add book success',
                data : {
                    id,
                },
            });
        }catch (e){
            next(e);
        }
    }

    getAll(req,res,next){
        try {
            const books = bookService.getAll();
            return res.json({
                status : 'success',
                data : {
                    books,
                },
            });
        }catch (e) {
            next(e);
        }
    }

    getById(req,res,next){
        try{
            const book = bookService.getById(req.params.id);
            return res.json({
                status : 'success',
                data : {
                    book,
                },
            });
        }catch (e) {
            next(e);
        }
    }

    update(req,res,next){
        try {
            const {name = null,year = null,author = null,summary = null,publisher = null,pageCount =null,readPage = null,reading = null} = req.body;
            bookService.update({name, year,author,summary,publisher,pageCount, readPage,reading,id:req.params.id});
            return res.json({
                status : 'success',
                message : 'update book success'
            });
        }catch (e){
            next(e);
        }
    }

    delete(req,res,next){
        try {
            bookService.delete(req.params.id);
            return res.json({
                status : 'success',
                message : 'delete book success'
            });
        }catch (e) {
            next(e);
        }
    }


}

export default BookController;