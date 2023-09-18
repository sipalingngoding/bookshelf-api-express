import BookService from "../../src/service/book-service.js";
import {AllBookTest, insertBookTest, LastId, removeBookTest} from "../util-test.js";
import ClientError from "../../src/error/client-error.js";
import NotFoundError from "../../src/error/not-found-error.js";

const bookService = new BookService();

const newBook = {name : 'Buku A',year : 2023,author : 'Diory',summary : 'Buku Hebat',publisher : 'cahyabook',pageCount : 200,readPage : 20,reading : true};

beforeEach(()=>{
    removeBookTest();
});

describe('Test add book', () => {
    it('should add book success', () => {
        const id = bookService.add(newBook);
        expect(id).not.toBeNull();
        expect(id).not.toBeInstanceOf(Number);
        const books = AllBookTest();
        expect(books).toHaveLength(1);
        expect(id).toBe(LastId());
    });

    it('should throw error, invalid input', () => {
        expect(()=>{
            bookService.add({...newBook,summary : ''})
        }).toThrow(ClientError);
    });

    it('should throw error, readPage > pageCount', () => {
        expect(()=>{
            bookService.add({...newBook,readPage : 201})
        }).toThrow(ClientError);
    });
});

describe('Test get all books', () => {
    beforeEach(()=>{
        insertBookTest();
    });
    it('should get all success', () => {
        const books = bookService.getAll();
        const booksTest = AllBookTest();
        expect(books.length).toBe(booksTest.length);
        for (let i = 0; i < books.length; i++) {
            expect({id : books[i].id , name : books[i].name, publisher : books[i].publisher}).toEqual({
                id : booksTest[i].id, name : booksTest[i].name, publisher :  booksTest[i].publisher
            })
        }
    });
});


describe('Test Get By Id', () => {
    beforeEach(()=>{
        insertBookTest();
    });
    it('should Get book success', () => {
        const book = bookService.getById(LastId());
        expect(book.id).toBe(LastId());
        expect(book).toEqual(AllBookTest().reverse()[0])
        expect(book).toHaveProperty('name','Buku B')
    });

    it('should get book fail, not found', () => {
        expect(()=>{
            bookService.getById(LastId()+"sa");
        }).toThrow(NotFoundError);
    });
});

describe('Test update book', () => {
    beforeEach(()=>{
        insertBookTest();
    });
    it('should update success', () => {
        expect(bookService.update({name :null, year :null,summary : null,publisher: null,pageCount :null, readPage : null,reading : null,author : 'Sinaga',id :LastId()})).toBeTruthy();
        const book = bookService.getById(LastId());
        expect(book).toHaveProperty('id',LastId());
        expect(book['author']).not.toBe('Pribadi');
        expect(book).toHaveProperty('author','Sinaga')
    });

    it('should update fail, not found', () => {
        expect(()=>{
            bookService.update({author : 'Sinaga',id :LastId()+'sa'})
        }).toThrow(NotFoundError);
    });

    it('should update fail, invalid input', () => {
        expect(()=>{
            bookService.update({summary : 'abc',id :LastId()})
        }).toThrow(ClientError);
    });

    it('should update fail, readPage > pageCount', () => {
        expect(()=>{
            bookService.update({name :null, year :null,summary : null,publisher: null,pageCount :null, readPage :400,reading : null,author : 'Sinaga',id :LastId()})
        }).toThrow(ClientError);
    });
});

describe('Test delete book', () => {
    beforeEach(()=>{
        insertBookTest();
    });
    it('should delete success', () => {
        const lastId = LastId();
        expect(bookService.delete(lastId)).toBeTruthy();
        const books = AllBookTest();
        expect(books).toHaveLength(1);
    });

    it('should delete fail, not found book', () => {
        expect(()=>{
            bookService.delete(LastId()+1);
        }).toThrow(NotFoundError);
    });
});
