import {Router} from 'express';
import BookController from "../controller/book-controller.js";


const router = Router();

const bookController = new BookController();

router.get('/',bookController.getAll);
router.get('/:id',bookController.getById);

router.post('/',bookController.add);

router.put('/:id',bookController.update);

router.delete('/:id',bookController.delete);

export default router;
