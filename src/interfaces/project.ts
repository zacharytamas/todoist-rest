// tslint:disable:no-magic-numbers

/**
 * A Todoist Project.
 */
export interface IProjectSerialized {
  /** Number of project comments. */
  readonly comment_count: number;
  /** Project id. */
  readonly id: number;
  /** Value from 1 to 4 for the Project indentation level (read-only). */
  readonly indent: 1 | 2 | 3 | 4;
  /** Project name. */
  name: string;
  /**
   * Project position in the list of projects/Project order (read-only).
   */
  readonly order: number;
}

/** The payload shape for creating/updating a Project. */
export interface IProjectCreate {
  /** Name of the project. */
  name: string;
}

export interface IProjectUpdate extends IProjectCreate {}
