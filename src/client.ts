import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TaskManager } from '.';
import { API_BASE_URL, TodoistAPIHttpStatus } from './api-config';
import { LabelManager } from './models/label';

interface ITodoistClientConfig {
  token: string;
}

interface ITodoistClientRequest {
  request: AxiosRequestConfig;
  successCode?: TodoistAPIHttpStatus;
}

/**
 * A client for interacting with Todoist's REST API.
 */
export class TodoistClient {
  public tasks = new TaskManager(this);
  public labels = new LabelManager(this);

  private token: string;
  private axios: AxiosInstance;

  constructor({ token }: ITodoistClientConfig) {
    this.setToken(token);
  }

  setToken(token: string) {
    this.token = token;
    this.axios = Axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  async makeRequest({
    request,
    successCode = TodoistAPIHttpStatus.OK
  }: ITodoistClientRequest): Promise<AxiosResponse<any>> {
    const response = await this.axios.request(request);

    if (response.status === successCode) {
      return response;
    }

    throw Error(`${response.status}: ${response.statusText}.`);
  }
}
