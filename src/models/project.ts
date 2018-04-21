// tslint:disable:variable-name

import { API_KIND_ROOT } from '../api-config';
import {
  IProjectCreate,
  IProjectSerialized,
  IProjectUpdate
} from '../interfaces/project';
import { Model } from './base';
import { Manager } from './manager';

export class ProjectManager extends Manager<Project, IProjectCreate> {
  modelClass = Project;
  urlBase = API_KIND_ROOT.Project;
}

export class Project extends Model<IProjectSerialized, IProjectUpdate>
  implements IProjectSerialized {
  readonly comment_count: number;
  readonly id: number;
  readonly indent: IProjectSerialized['indent'];
  name: string;
  readonly order: number;

  protected get apiUrl() {
    return `${API_KIND_ROOT.Project}/${this.id}`;
  }

  toUpdateSerialized() {
    return { name: this.name };
  }
}
