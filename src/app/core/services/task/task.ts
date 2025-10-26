import { Injectable } from '@angular/core';
import { Task } from '../../models/task/task';
import { BehaviorSubject } from 'rxjs';
import { TaskStatus } from '../../enums/task-status';
import { TaskPriority } from '../../enums/task-priority';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([
     {
      id: 1,
      title: 'Create project setup',
      description: 'Initialize Angular project with routing and Material UI',
      status: TaskStatus.Pending,
      priority: TaskPriority.Medium,
      dueDate: new Date('2024-01-15'),
      assignee: 'John Doe',
      createdAt: new Date('2024-01-10'),
      updatedAt: null
    },
    {
      id: 2,
      title: 'Implement task service',
      description: 'Create service with BehaviorSubject for state management',
      status: TaskStatus.InProgress,
      priority: TaskPriority.High,
      dueDate: new Date('2024-01-20'),
      assignee: 'Jane Smith',
      createdAt: new Date('2024-01-12'),
      updatedAt: null
    },
    {
      id: 3,
      title: 'Design responsive layout',
      description: 'Create mobile-friendly board layout with drag and drop',
      status: TaskStatus.Pending,
      priority: TaskPriority.Low,
      dueDate: new Date('2024-01-25'),
      assignee: 'Mike Johnson',
      createdAt: new Date('2024-01-14'),
      updatedAt: null
    },
    {
      id: 4,
      title: 'Add unit tests',
      description: 'Write tests for components and services',
      status: TaskStatus.Done,
      priority: TaskPriority.Medium ,
      assignee: 'Sarah Wilson',
      dueDate: new Date('2024-01-30'),
      createdAt: new Date('2024-01-14'),
      updatedAt: null
    }
  ]);

  getTasks() {
    return this.tasks.asObservable();
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: Math.max(0, ...this.tasks.value.map(t => t.id)) + 1,
      createdAt: new Date(),
      updatedAt: null
    };
    this.tasks.next([...this.tasks.value, newTask]);
  }

  updateTask(id: number, updateTask: Partial<Task>): void {
    const updatedTasks = this.tasks.value.map(task => 
      task.id === id ? { ...task, ...updateTask, updatedAt: new Date() } : task
    );
    this.tasks.next(updatedTasks);
  }

  deleteTask(id: number): void {
    const filteredTasks = this.tasks.value.filter(task => task.id !== id);
    this.tasks.next(filteredTasks);
  }
  
}
