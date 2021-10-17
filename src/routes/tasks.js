const express = require('express');
const yup = require('yup');

const Task = require('../schemas/Task');
const schemaValidate = require('../middlewares/schemaValidate');

const router = express.Router();

/*
  text: string
*/

const createTaskSchema = yup.object().shape({
  text: yup.string().min(3).max(255).required(),
});

router.post('/', schemaValidate(createTaskSchema), async (req, res) => {
  try {
    // Create task in database
    const newTask = await Task.create({
      text: req.body.text,
      completed: false,
    });

    // Respond with new task
    res.json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    // Get all tasks from database
    const allTasks = await Task.find();

    res.json(allTasks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

/*
  TODO: Add validation for updating task
  body: {
    text: string,
    completed: boolean
  }
*/
router.put('/:taskId', async (req, res) => {
  try {
    // Check if tasks exists in database
    const targetTask = await Task.findById(req.params.taskId);
    if (!targetTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Update task in database
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete('/:taskId', async (req, res) => {
  try {
    // Check if tasks exists in database
    const targetTask = await Task.findById(req.params.taskId);
    if (!targetTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Removed task from database
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
