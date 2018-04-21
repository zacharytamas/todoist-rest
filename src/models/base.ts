import { TodoistClient } from '../client';
import { TodoistAPIHttpStatus } from '../api-config';

export abstract class Model<T, U> {
  protected abstract apiUrl: string;

  protected original: T;
  protected client: TodoistClient;

  constructor({ raw, client }) {
    this.client = client;
    this.original = raw;
    Object.entries(raw).forEach(([k, v]) => (this[k] = v));
  }

  toJSON() {
    return this.toUpdateSerialized();
  }

  /**
   * Update this object in Todoist with local changes.
   */
  save() {
    return this.client.makeRequest({
      request: {
        data: this.toUpdateSerialized(),
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

  protected abstract toUpdateSerialized(): U;
}
