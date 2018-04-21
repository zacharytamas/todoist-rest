import { TodoistClient } from '../client';
import { TodoistAPIHttpStatus } from '../api-config';

export abstract class Model<T> {
  protected abstract apiUrl: string;

  protected object: T;
  protected client: TodoistClient;

  constructor({ raw, client }) {
    this.object = raw;
    this.client = client;
  }

  toJSON() {
    return this.object;
  }

  get(key: keyof T) {
    return this.object[key];
  }

  set(key: keyof T, value: any) {
    this.object[key] = value;
  }

  /**
   * Update this object in Todoist with local changes.
   */
  async save() {
    // FIXME This sends the entire object including the read-only fields that
    // are ignored by the Todoist API. Thus, this uses more network than
    // necessary.

    await this.client.makeRequest({
      request: {
        data: this.object,
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        url: this.apiUrl
      },
      successCode: TodoistAPIHttpStatus.NoContent
    });
  }

  /**
   * Delete this object from Todoist immediately.
   */
  async delete() {
    await this.client.makeRequest({
      request: { method: 'delete', url: this.apiUrl },
      successCode: TodoistAPIHttpStatus.NoContent
    });
  }
}
