import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { IOptions, QueryResult } from '../paginate/paginate';
import { ITask, ITaskDoc, UpdateTaskBody } from './task.interfaces';
import Task from './task.model';
import { ApiError } from '../errors';

export const createTask = async (body: ITask): Promise<ITask> => {
  return Task.create(body);
};

export const queryTask = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  return Task.paginate(filter, options);
};

export const getTaskById = async (taskId: mongoose.Types.ObjectId): Promise<ITaskDoc | null> => {
  return Task.findById(taskId);
};

export const deleteTaskById = async (taskId: mongoose.Types.ObjectId): Promise<ITaskDoc | null> => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await task.deleteOne();
  return task;
};

export const updateTaskById = async (taskId: mongoose.Types.ObjectId, body: UpdateTaskBody) : Promise<ITaskDoc | null> => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }

  Object.assign(task, body);
  await task.save();
  return task;
}