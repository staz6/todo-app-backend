import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { taskController } from '../../modules/task';

const router: Router = express.Router();

router.route('/').get(auth(), taskController.getTasks).post(auth(), taskController.createTask);
router
  .route('/:taskId')
  .get(auth(), taskController.getTask)
  .delete(auth(), taskController.deleteTask)
  .patch(auth(), taskController.updateTask);


export default router;
