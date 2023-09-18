import {addBookSchema} from '../../src/validator/books-schema.js';
import validate from "../../src/validator/validate.js";
import ClientError from "../../src/error/client-error.js";

describe('Test Validate', () => {
    it('should no error', () => {
        expect(()=>{
            validate(addBookSchema(),{name : 'Buku A',year : 2023,author : 'Diory',summary : 'Buku Hebat',publisher : 'cahyabook',pageCount : 200,readPage : 20,reading : true});
        }).not.toThrow();
    });

    it('should throw error', () => {
        expect(()=>{
            validate(addBookSchema(),{name : 'Buku A',year : 2023,author : 'Diory',summary : 'Buku',publisher : 'cahyabook',pageCount : 200,readPage : 20,reading : true});
        }).toThrow(ClientError);
    });
});