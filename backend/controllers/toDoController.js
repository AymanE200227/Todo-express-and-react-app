const ToDoModel = require('../models/toDoModel')


module.exports.getToDo = async (req, res)=>{
    const ToDo = await ToDoModel.find()
    res.send(ToDo)

}
module.exports.saveToDo = async (req, res) => {
    try {
        const { text } = req.body;
        const newToDo = await ToDoModel.create({ text });
        console.log(`Added successfully: ${newToDo}`);
        res.status(201).json(newToDo); // Send the newly created to-do item as the response
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad Request' });
    }
};

module.exports.deleteToDo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedToDo = await ToDoModel.findByIdAndDelete(id);
        if (!deletedToDo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        console.log(`Deleted todo: ${deletedToDo}`);
        res.status(200).json(deletedToDo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports.getToDoById = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await ToDoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};