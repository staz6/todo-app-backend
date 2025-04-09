import mongoose, { Schema } from 'mongoose';
import { ITaskDoc, ITaskModel } from './task.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const taskSchema = new Schema<ITaskDoc, ITaskModel>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

taskSchema.index({ priority: 1 });
taskSchema.index({ completed: 1 });

const Task = mongoose.model<ITaskDoc, ITaskModel>('Task', taskSchema);

export default Task;
