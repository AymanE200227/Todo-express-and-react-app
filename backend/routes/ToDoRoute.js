const {Router} = require('express')
const {getToDo, saveToDo,deleteToDo,getToDoById}= require('../controllers/toDoController')
const router = Router()



router.get('/', getToDo )
router.get('/:id', getToDoById);
router.post('/save', saveToDo)
router.delete('/delete/:id', deleteToDo);

module.exports=router