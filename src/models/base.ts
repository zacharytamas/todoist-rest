import { TodoistClient } from '../client';

export abstract class Model<T> {
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
}
