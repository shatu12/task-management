import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { Task } from '../../core/models/task/task';
import { TaskStatus } from '../../core/enums/task-status';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.scss']
})
export class TaskItem {
  @Input() task!: Task;
  @Output() statusChange = new EventEmitter<TaskStatus>();
  @Output() delete = new EventEmitter<void>();

  get priorityClass(): string {
    return `priority-${this.task.priority}`;
  }

  onStatusChange(newStatus: TaskStatus): void {
    this.statusChange.emit(newStatus);
  }

  onDelete(): void {
    this.delete.emit();
  }
}