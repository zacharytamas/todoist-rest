import { TodoistClient } from '../client';
import { AxiosRequestConfig } from 'axios';

export enum ManagerQuery {
  all,
  filter,
  create,
  getById
}

export interface IManagerRequestBundle {
  id?: string | number;
  requestConfig?: AxiosRequestConfig;
}

export abstract class Manager<ModelClass, ICreate> {
  protected client: TodoistClient;
  protected abstract modelClass: any;
  protected abstract urlBase: string;

  constructor(client: TodoistClient) {
    this.client = client;
  }

  async getById(id: IManagerRequestBundle['id']): Promise<ModelClass> {
    const request = this.requestFor(ManagerQuery.getById, { id });
    const response = await this.client.makeRequest({ request });
    return this.inflate(response.data);
  }

  async all(): Promise<ModelClass[]> {
    return this.query(this.requestFor(ManagerQuery.all));
  }

  async create(data: ICreate): Promise<ModelClass> {
    return this.inflate(
      (await this.client.makeRequest({
        request: this.requestFor(ManagerQuery.create, {
          requestConfig: { data }
        })
      })).data
    );
  }

  protected inflate(raw) {
    return new this.modelClass({ raw, client: this.client });
  }

  protected requestFor(
    type: ManagerQuery,
    config?: IManagerRequestBundle
  ): AxiosRequestConfig {
    const base = { method: 'get', url: this.urlBase };

    switch (type) {
      case ManagerQuery.all:
        return { ...base };
      case ManagerQuery.create:
        const { requestConfig } = config;
        return {
          ...requestConfig,
          ...base,
          data: JSON.stringify(requestConfig.data),
          headers: { 'Content-Type': 'application/json' },
          method: 'post'
        };
      case ManagerQuery.filter:
        // TODO It would probably be helpful to just do this locally by fetching
        // all of them and then doing a linear search.
        throw Error(
          'Todoist API does not provide filtering for this type of object.'
        );
      case ManagerQuery.getById:
        const { id } = config;
        return { ...base, url: `${this.urlBase}/${id}` };
    }
  }

  protected async query(request: AxiosRequestConfig): Promise<ModelClass[]> {
    const response = await this.client.makeRequest({ request });
    return response.data.map(m => this.inflate(m));
  }
}
