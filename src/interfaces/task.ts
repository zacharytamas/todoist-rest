// tslint:disable:no-magic-numbers

type TodoistTaskPriority = 1 | 2 | 3 | 4;

/**
 * A description of a Task's due date.
 */
export interface ITaskDue {
  /** Date in format YYYY-MM-DD corrected to user’s timezone. */
  date: string;
  recurring: boolean;
  /**
   * Only returned if exact due time set (i.e. it’s not a whole-day task), date
   * and time in RFC3339 format in UTC.
   */
  datetime?: string;
  /** Human defined date in arbitrary format. */
  string: string;
  /**
   * Only returned if exact due time set, user’s timezone definition either in
   * tzdata-compatible format (“Europe/Berlin”) or as a string specifying east
   * of UTC offset as “UTC±HH:MM” (i.e. “UTC-01:00”).
   */
  timezone?: string;
}

/**
 * A Todoist Task.
 */
export interface ITaskSerialized {
  /** Number of task comments. */
  readonly comment_count: number;
  /** Flag to mark completed tasks. */
  completed: boolean;
  /** Task content. */
  content: string;
  /** Object representing task due date/time. */
  due?: ITaskDue;
  /** Task id. */
  readonly id: number;
  /** Task indentation level from 1 to 5 (read-only). */
  readonly indent: 1 | 2 | 3 | 4 | 5;
  /** Array of label ids, associated with a task. */
  label_ids: number[];
  /** Position in the project (read-only). */
  readonly order: number;
  /** Task priority from 1 (normal, default value) to 4 (urgent). */
  priority: TodoistTaskPriority;
  /** Task’s project id (read-only). */
  readonly project_id: number;
  /** URL to access this task in Todoist web interface. */
  readonly url: string;
}

/**
 * Parameters defining a query for retrieving Tasks.
 */
export interface ITaskQuery {
  /** Filter tasks by project id. */
  project_id?: number;
  /** Filter tasks by label. */
  label_id?: number;
  /**
   * Filter by any [supported
   * filter](https://support.todoist.com/hc/en-us/articles/205248842).
   */
  filter?: string;
  /**
   * IETF language tag defining what language filter is written in, if differs
   * from default English.
   */
  lang?: string;
}

/**
 * API body for creating a new Task.
 */
export interface ITaskCreate {
  /** Task content. */
  content: string;
  /** Task project id. If not set, task is put to user’s Inbox. */
  project_id?: number;
  /** Non-zero integer value used by clients to sort tasks inside project. */
  order?: number;
  /** Ids of labels associated with the task. */
  label_ids?: number[];
  /** Task priority from 1 (normal) to 4 (urgent). */
  priority?: TodoistTaskPriority;
  /**
   * [Human defined](https://todoist.com/Help/DatesTimes) task due date (ex.:
   * “next Monday”, “Tomorrow”). Value is set using local (not UTC) time.
   */
  due_string?: string;
  /** Specific date in `YYYY-MM-DD` format relative to user’s timezone. */
  due_date?: string;
  /** Specific date and time in RFC3339 format in UTC. */
  due_datetime?: string;
  /**
   * 2-letter code specifying language in case `due_string` is not written in
   * English.
   */
  due_lang?: string;
}

export interface ITaskUpdate {
  /** Task content. */
  content: string;
  /** Task project id (read-only). */
  readonly project_id?: number;
  /** Ids of labels associated with the task. */
  label_ids?: number[];
  /** Task priority from 1 (normal) to 4 (urgent). */
  priority?: TodoistTaskPriority;
  /**
   * [Human defined](https://todoist.com/Help/DatesTimes) task due date (ex.:
   * “next Monday”, “Tomorrow”). Value is set using local (not UTC) time.
   */
  due_string?: string;
  /** Specific date in `YYYY-MM-DD` format relative to user’s timezone. */
  due_date?: string;
  /** Specific date and time in RFC3339 format in UTC. */
  due_datetime?: string;
  /**
   * 2-letter code specifying language in case `due_string` is not written in
   * English.
   */
  due_lang?: string;
}
