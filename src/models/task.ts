// tslint:disable:variable-name

import { AxiosRequestConfig } from 'axios';
import { API_KIND_ROOT, TodoistAPIHttpStatus } from '../api-config';
import {
  ITaskCreate,
  ITaskDue,
  ITaskQuery,
  ITaskSerialized,
  ITaskUpdate
} from '../interfaces/task';
import { Model } from './base';
import { Label } from './label';
import { IManagerRequestBundle, Manager, ManagerQuery } from './manager';

export class TaskManager extends Manager<Task, ITaskCreate> {
  modelClass = Task;
  urlBase = API_KIND_ROOT.Task;

  async filter(query: ITaskQuery): Promise<Task[]> {
    return this.query(
      this.requestFor(ManagerQuery.filter, { requestConfig: { params: query } })
    );
  }

  protected requestFor(
    type: ManagerQuery,
    config: IManagerRequestBundle = {}
  ): AxiosRequestConfig {
    const base = { method: 'get', url: this.urlBase };

    switch (type) {
      case ManagerQuery.filter:
        return { ...config.requestConfig, ...base };
      default:
        return super.requestFor(type, config);
    }
  }
}

/**
 * A Todoist task object.
 */
export class Task extends Model<ITaskSerialized, ITaskUpdate>
  implements ITaskSerialized {
  // The following properties are from the ITaskSerialized interface, which
  // matches the Todoist API's response shape.
  readonly comment_count: number;
  readonly completed: boolean;
  content: string;
  due?: ITaskDue;
  readonly id: number;
  readonly indent: ITaskSerialized['indent'];
  label_ids: number[];
  readonly order: number;
  priority: ITaskSerialized['priority'];
  readonly project_id: number;
  readonly url: string;

  /**
   * 2-letter code specifying language in case `due_string` is not written
   * in English.
   */
  due_lang: string;

  constructor({ raw, client }) {
    super({ raw, client });
    // Todoist API seems to not return this at all if the list is empty, so
    // we must define it ourselves.
    if (!this.label_ids) {
      this.label_ids = [];
    }
  }

  protected get apiUrl() {
    return `${API_KIND_ROOT.Task}/${this.id}`;
  }

  toUpdateSerialized() {
    return {
      ...{
        content: this.content,
        label_ids: this.label_ids,
        priority: this.priority,
        project_id: this.project_id
      }
      // TODO Figure out how to do this properly. You can only send one of
      // these properties at a time. Need to figure out how to determine
      // which, if any, to send when saving. May be easiest to just have
      // separate methods for modifying due dates on Tasks.
      //
      // ...(this.due
      //   ? {
      //       due_date: this.due.date,
      //       due_datetime: this.due.datetime,
      //       due_lang: this.due_lang,
      //       due_string: this.due.string
      //     }
      //   : null)
    };
  }

  addLabel(label: Label) {
    this.label_ids = [...this.label_ids, label.id];
  }

  addLabels(...labels: Label[]) {
    this.label_ids = [...this.label_ids, ...labels.map(l => l.id)];
  }

  removeLabel(label: Label) {
    this.label_ids = this.label_ids.filter(id => id !== label.id);
  }

  /**
   * Complete this task.
   */
  async complete() {
    await this.client.makeRequest({
      request: { method: 'post', url: this.apiUrl + '/close' },
      successCode: TodoistAPIHttpStatus.NoContent
    });
  }

  /**
   * Re-open this Task if it was previously completed.
   */
  uncomplete() {
    return this.client.makeRequest({
      request: { method: 'post', url: this.apiUrl + '/reopen' },
      successCode: TodoistAPIHttpStatus.NoContent
    });
  }
}
