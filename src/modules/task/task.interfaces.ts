import { Document, Model, Types } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export type Priority = 'low' | 'medium' | 'high';

export interface ITask {
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITaskDoc extends ITask, Document {}

export interface ITaskModel extends Model<ITaskDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
