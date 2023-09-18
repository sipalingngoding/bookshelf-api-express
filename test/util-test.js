import books from "../src/data/books.js";
import uniqId from "uniqid";

const insertBookTest = ()=>{
    books.push({id : uniqId('book-'),name : 'Buku A',year : 2023,author : 'Diory',summary : 'Buku Hebat',publisher : 'cahyabook',pageCount : 200,readPage : 20,reading : true});

    books.push({id: uniqId('book-'),name : 'Buku B',year : 2023,author : 'Pribadi',summary : 'Buku Bias Aja',publisher : 'ITB',pageCount : 210,readPage : 100,reading : false});
};

const removeBookTest = ()=>{
    books.splice(0,books.length);
};

const AllBookTest = ()=>{
    return books;
};

const LastId = ()=>{
    return books[books.length-1].id;
};


export {
    insertBookTest,removeBookTest, AllBookTest, LastId
}