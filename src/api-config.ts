export const API_HOST = 'beta.todoist.com';
export const API_ROOT = '/API/v8';
export const API_BASE_URL = `https://${API_HOST}${API_ROOT}`;

export const API_KIND_ROOT = {
  Label: `/labels`,
  Project: `/projects`,
  Task: `/tasks`
};

export enum TodoistAPIHttpStatus {
  OK = 200,
  NoContent = 204
}
