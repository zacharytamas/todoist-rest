import { ITaskSerialized, IProjectSerialized } from '.';

/**
 * A Todoist Comment.
 */
export interface IComment {
  /**
   * Attachment file (optional).
   *
   * The optional attachment attribute describes object with attachment
   * metadata. Format of this object depends on the kind of attachment it
   * describes, see [sync API documentation for format
   * details](https://developer.todoist.com/sync/v7#uploads).
   */
  attachment?: any;
  /** Comment content. */
  content: string;
  /** Comment id. */
  id: number;
  /** Date and time when comment was added, RFC3339 format in UTC. */
  posted: string;
  /** Comment’s project id (for project comments). */
  project_id?: IProjectSerialized['id'];
  /** Comment’s task id (for task comments). */
  task_id?: ITaskSerialized['id'];
}

export interface ICommentQuery {
  /** Id of the project used to filter comments. */
  project_id?: IProjectSerialized['id'];
  /** Id of the task used to filter comments. */
  task_id?: ITaskSerialized['id'];
}

export interface ICommentCreate {
  /** Comment’s task id (for task comments). */
  task_id?: ITaskSerialized['id'];
  /** Comment’s project id (for project comments). */
  project_id?: IProjectSerialized['id'];
  /** Comment content. */
  content: string;
  /** Object for attachment object. */
  attachment?: any;
}

export interface ICommentUpdate {
  /** New content for the comment. */
  content: string;
}
