import books from "../data/books.js";
import validate from "../validator/validate.js";
import {addBookSchema} from "../validator/books-schema.js";
import uniqId from 'uniqid';
import ClientError from "../error/client-error.js";
import NotFoundError from "../error/not-found-error.js";

class BookService{
    add({name,year,author,summary,publisher,pageCount,readPage,reading}){
        validate(addBookSchema(),{name,year,author,summary,publisher,pageCount,readPage,reading});

        if(readPage > pageCount) throw new ClientError('read page cannot greater than page count');

        const id = uniqId('book-')
        const createdAt = new Date().toISOString();
        books.push({
            id, name, year,author,summary, publisher, pageCount, readPage, reading, createdAt, updatedAt : createdAt,
        });

        return id;
    }

    getAll (){
        return books.map(b => {
            return {id :  b.id , name : b.name, publisher : b.publisher};
        });
    }

    getById(id){
        const book = books.find(b => b.id === id);
        if(!book) throw new NotFoundError('book not found');
        return book;
    }

    update({id,name,year,author,summary,publisher,pageCount,readPage,reading}){
        const book = books.find(b => b.id === id);
        if(!book) throw new NotFoundError('book not found');

        if(name === null) name = book.name;
        if(year === null) year = book.year;
        if(author === null) author = book.author;
        if(summary === null) summary = book.summary;
        if(publisher === null) publisher = book.publisher;
        if(pageCount === null) pageCount = book.pageCount;
        if(readPage === null) readPage = book.readPage;
        if(reading === null) reading = book.reading;

        validate(addBookSchema(),{name,year,author,summary,publisher,pageCount,readPage,reading});

        if(readPage > pageCount) throw new ClientError('read page cannot greater than page count');

        const index = books.findIndex(b => b.id === id);
        const createdAt = book.createdAt;
        const updatedAt = new Date().toISOString();
        books.splice(index,1,{id : book.id,name,year,author,summary,publisher,pageCount,readPage,reading,createdAt,updatedAt})

        return true;
    }

    delete(id){
        const index = books.findIndex(b => b.id === id);
        if(index === -1) throw new NotFoundError('book not found');

        books.splice(index,1);
        return true;
    }


}

export default BookService;