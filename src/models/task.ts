import { Manager, ManagerQuery, IManagerRequestBundle } from './manager';
import { ITask, ITaskQuery, ITaskCreate } from '../interfaces/task';
import { Model } from './base';
import { AxiosRequestConfig } from 'axios';
import { API_KIND_ROOT } from '../api-config';

const apiUrlForTaskWithId = (id: number | string) =>
  `${API_KIND_ROOT.Task}/${id}`;

export class TaskManager extends Manager<Task, ITaskCreate> {
  modelClass = Task;

  async filter(query: ITaskQuery): Promise<Task[]> {
    return this.query(
      this.requestFor(ManagerQuery.filter, { requestConfig: { params: query } })
    );
  }

  protected requestFor(
    type: ManagerQuery,
    config: IManagerRequestBundle = {}
  ): AxiosRequestConfig {
    const base = { method: 'get', url: API_KIND_ROOT.Task };

    switch (type) {
      case ManagerQuery.getById:
        const { id } = config;
        return { ...base, url: apiUrlForTaskWithId(id) };
      case ManagerQuery.all:
        return { ...base };
      case ManagerQuery.filter:
        return { ...config.requestConfig, ...base };
      case ManagerQuery.create:
        const { requestConfig } = config;
        return {
          ...requestConfig,
          ...base,
          data: JSON.stringify(requestConfig.data),
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
  protected get apiUrl() {
    return apiUrlForTaskWithId(this.get('id') as string);
  }
  // getLabels()
  // addLabel()
  // removeLabel()
  // complete()
  // uncomplete()
}
