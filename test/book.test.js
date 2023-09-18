import supertest from 'supertest';

import app from "../src/main.js";
import {insertBookTest, LastId, removeBookTest} from "./util-test.js";

const newBook = {name : 'Buku A',year : 2023,author : 'Diory',summary : 'Buku Hebat',publisher : 'cahyabook',pageCount : 200,readPage : 20,reading : true};

beforeEach(()=>{
    removeBookTest();
});

describe('GET /books', () => {
    beforeEach(()=>{
        insertBookTest();
    });
    test('get books success',async ()=>{
        const response = await supertest(app)
            .get('/books');
        expect(response.status).toBe(200);
        const books = response.body.data.books;
        expect(books).toHaveLength(2);
        const book = books[0];
        expect(book).toHaveProperty('id');
        expect(book).toHaveProperty('name');
        expect(book).toHaveProperty('publisher');
        expect(book).not.toHaveProperty('pageCount');
        expect(book).not.toHaveProperty('readPage');
        expect(book).not.toHaveProperty('reading');
    });
});

describe('GET /books/:id', () => {
    beforeEach(()=>{
        insertBookTest();
    });
    test('Get book success',async ()=>{
        const response = await supertest(app)
            .get(`/books/${LastId()}`)
        expect(response.status).toBe(200);
        const {book} = response.body.data;
        expect(book).not.toBeNull();
        expect(book).toHaveProperty('name','Buku B');
    });

    test('Get book fail, not found',async ()=>{
        const response = await supertest(app)
            .get(`/books/${LastId()+'ds'}`)
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/book not found/i)
    });
});

describe('POST /books', () => {
    test('add book success',async ()=>{
        const response = await supertest(app)
            .post('/books')
            .set('Content-Type','application/json')
            .send(newBook);
        expect(response.status).toBe(201);
        expect(response.body.message).toMatch(/add book success/i);
        expect(response.body.data.id).not.toBe('');
    });

    test('add book fail, invalid input',async ()=>{
        const response = await supertest(app)
            .post('/books')
            .set('Content-Type','application/json')
            .send({...newBook,name : true});
        expect(response.status).toBe(400);
        expect(response.body.message).not.toBe('');
    })

    test('add book fail, readPage > pageCount',async ()=>{
        const response = await supertest(app)
            .post('/books')
            .set('Content-Type','application/json')
            .send({...newBook, readPage: 201});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/read page cannot greater than page count/i);
    });
});

describe('PUT /books/:id', () => {
    beforeEach(()=>{
        insertBookTest();
    });
    test('Update book success',async ()=>{
        const response = await supertest(app)
            .put(`/books/${LastId()}`)
            .send({author: 'Sinaga'});
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('update book success');
    });

    test('Update fail, not found',async ()=>{
        const response = await supertest(app)
            .put(`/books/${LastId()+'ds'}`)
            .send({author: 'Sinaga'});
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('book not found');
    });

    test('Update fail, invalid input',async ()=>{
        const response = await supertest(app)
            .put(`/books/${LastId()}`)
            .send({summary: 'sas'});
        expect(response.status).toBe(400);
        expect(response.body.message).not.toBe('');
    });

    test('Update fail, readPage > pageCount',async ()=>{
        const response = await supertest(app)
            .put(`/books/${LastId()}`)
            .send({readPage: 300});
        expect(response.status).toBe(400);
        expect(response.body.message).not.toBe('');
    });
});

describe('DELETE /books/:id', () => {
    beforeEach(()=>{
        insertBookTest();
    });
    test('Delete book success',async ()=>{
        const response = await supertest(app)
            .delete(`/books/${LastId()}`)
        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/delete book success/i);
    });

    test('Delete book fail, not found',async ()=>{
        const response = await supertest(app)
            .delete(`/books/${LastId()+'dsd'}`)
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/book not found/i);
    });
});
