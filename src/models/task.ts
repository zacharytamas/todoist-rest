import { Manager, ManagerQuery } from './manager';
import { ITask, ITaskQuery, ITaskCreate } from '../interfaces/task';
import { Model } from './base';
import { AxiosRequestConfig } from 'axios';

export class TaskManager extends Manager<Task, ITaskQuery, ITaskCreate> {
  modelClass = Task;

  protected requestFor(
    type: ManagerQuery,
    config: Partial<AxiosRequestConfig> = {}
  ): AxiosRequestConfig {
    const base = { method: 'get', url: 'tasks' };

    switch (type) {
      case ManagerQuery.all:
        return { ...base };
      case ManagerQuery.filter:
        return { ...config, ...base };
      case ManagerQuery.create:
        return {
          ...config,
          ...base,
          data: JSON.stringify(config.data),
          headers: { 'Content-Type': 'application/json' },
          method: 'post'
        };
    }
  }
}

/**
 * A Todoist task object.
 */
export class Task extends Model<ITask> {
  // getLabels()
  // addLabel()
  // removeLabel()
  // complete()
  // uncomplete()
}
