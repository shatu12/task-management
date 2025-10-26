import { TaskStatus } from '../../enums/task-status';
import { TaskPriority } from '../../enums/task-priority';

export interface Task {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    assignee?: string;
    createdAt: Date;
    updatedAt: Date | null;
}
