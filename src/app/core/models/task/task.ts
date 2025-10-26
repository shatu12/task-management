import { TaskStatus } from '../../enums/task-status';
import { TaskPriority } from '../../enums/task-priority';

export interface Task {
    id: number;
    title: string;
    description: string
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
