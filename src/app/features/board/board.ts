import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { Task } from '../../core/models/task/task';
import { TaskService } from '../../core/services/task/task';
import { TaskList } from '../task-list/task-list';
import { TaskStatus } from '../../core/enums/task-status';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, MatCardModule, TaskList],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class Board implements OnInit {
  tasks: Task[] = [];
  readonly statuses = [TaskStatus.Pending, TaskStatus.InProgress, TaskStatus.Done];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => { 
      this.tasks = tasks;
    });
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  getStatusTitle(status: TaskStatus): string {
    const titles = {
      [TaskStatus.Pending]: 'To Do',
      [TaskStatus.InProgress]: 'In Progress',
      [TaskStatus.Done]: 'Done'
    };
    return titles[status];
  }

  onTaskStatusChange(event: { taskId: number; newStatus: TaskStatus }): void {
    this.taskService.updateTask(event.taskId, { status: event.newStatus });
  }

  onTaskDelete(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}