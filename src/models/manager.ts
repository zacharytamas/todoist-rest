import { TodoistClient } from '../client';
import { AxiosRequestConfig } from 'axios';

export enum ManagerQuery {
  all,
  filter,
  create
}

export abstract class Manager<ModelClass, IQuery, ICreate> {
  protected client: TodoistClient;
  protected abstract modelClass: any;

  constructor(client: TodoistClient) {
    this.client = client;
  }

  async all(): Promise<ModelClass[]> {
    return this.query(this.requestFor(ManagerQuery.all));
  }

  async filter(query: IQuery): Promise<ModelClass[]> {
    return this.query(this.requestFor(ManagerQuery.filter, { params: query }));
  }

  async create(data: ICreate): Promise<ModelClass> {
    return this.inflate(
      (await this.client.makeRequest({
        request: this.requestFor(ManagerQuery.create, { data })
      })).data
    );
  }

  protected inflate(raw) {
    return new this.modelClass({ raw, client: this.client });
  }

  protected abstract requestFor(
    type: ManagerQuery,
    config?: Partial<AxiosRequestConfig>
  ): AxiosRequestConfig;

  protected async query(request: AxiosRequestConfig): Promise<ModelClass[]> {
    return (await this.client.makeRequest({ request })).data.map(this.inflate);
  }
}
