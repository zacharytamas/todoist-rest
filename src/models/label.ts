import { ILabel, ILabelCreate } from '../interfaces';
import { Model } from './base';
import { Manager, ManagerQuery, IManagerRequestBundle } from './manager';
import { AxiosRequestConfig } from 'axios';
import { API_KIND_ROOT } from '../api-config';

const apiUrlForLabelWithId = (id: number | string) =>
  `${API_KIND_ROOT.Label}/${id}`;

export class LabelManager extends Manager<Label, ILabelCreate> {
  modelClass = Label;

  protected requestFor(
    type: ManagerQuery,
    config: IManagerRequestBundle = {}
  ): AxiosRequestConfig {
    const base = { method: 'get', url: API_KIND_ROOT.Label };

    switch (type) {
      case ManagerQuery.all:
        return { ...base };
      case ManagerQuery.getById:
        const { id } = config;
        return { ...base, url: apiUrlForLabelWithId(id) };
      case ManagerQuery.filter:
        // TODO It would probably be helpful to just do this locally by fetching
        // all of them and then doing a linear search.
        throw Error('Labels cannot be filtered directly from the API.');
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
 * A Todoist label object.
 */
export class Label extends Model<ILabel> {
  protected get apiUrl() {
    return apiUrlForLabelWithId(this.get('id') as number);
  }
}
