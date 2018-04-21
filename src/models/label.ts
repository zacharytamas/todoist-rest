import { API_KIND_ROOT } from '../api-config';
import { ILabelCreate, ILabelSerialized, ILabelUpdate } from '../interfaces';
import { Model } from './base';
import { Manager } from './manager';

export class LabelManager extends Manager<Label, ILabelCreate> {
  modelClass = Label;
  urlBase = API_KIND_ROOT.Label;
}

/**
 * A Todoist label object.
 */
export class Label extends Model<ILabelSerialized, ILabelUpdate>
  implements ILabelSerialized {
  /** Label id. */
  readonly id: number;
  /** Label name. */
  name: string;
  /** Number used by clients to sort list of labels. */
  order: number;

  protected get apiUrl() {
    return `${API_KIND_ROOT.Label}/${this.id}`;
  }

  protected toUpdateSerialized() {
    return { name: this.name, order: this.order };
  }
}
