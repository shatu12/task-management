import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models/task/task';
import { TaskItem } from '../task-item/task-item';
import { TaskStatus } from '../../core/enums/task-status';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItem],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskList {
  @Input() tasks: Task[] = [];
  @Input() status!: TaskStatus;
  
  @Output() taskStatusChange = new EventEmitter<{ taskId: number; newStatus: TaskStatus }>();
  @Output() taskDelete = new EventEmitter<number>();

  onStatusChange(taskId: number, newStatus: TaskStatus): void {
    this.taskStatusChange.emit({ taskId, newStatus });
  }

  onDelete(taskId: number): void {
    this.taskDelete.emit(taskId);
  }
}