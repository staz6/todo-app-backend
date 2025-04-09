/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { catchAsync, pick } from '../utils';
import * as taskService from './task.service';
import { IOptions } from '../paginate/paginate';
import { ApiError } from '../errors';

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body);
  res.status(httpStatus.CREATED).send(task);
});

export const getTasks = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['priority', `completed`]);
  filter.userId = req.user.id;

  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await taskService.queryTask(filter, options);
  res.send(result);
});

export const getTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.getTaskById(new mongoose.Types.ObjectId(req.params['taskId']));
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  res.send(task);
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.updateTaskById(new mongoose.Types.ObjectId(req.params['taskId']), req.body);
  res.send(task);
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.deleteTaskById(new mongoose.Types.ObjectId(req.params['taskId']));
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  res.send(task);
});
