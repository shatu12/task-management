import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { Task } from '../../core/models/task/task';
import { TaskItem } from '../task-item/task-item';
import { TaskStatus } from '../../core/enums/task-status';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItem, DragDropModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskList {
  @Input() tasks: Task[] = [];
  @Input() status!: TaskStatus;
  @Input() connectedLists: string[] = [];
  
  @Output() taskStatusChange = new EventEmitter<{ taskId: number; newStatus: TaskStatus }>();
  @Output() taskDelete = new EventEmitter<number>();
  @Output() taskDrop = new EventEmitter<{ previousIndex: number; currentIndex: number; previousStatus: TaskStatus; newStatus: TaskStatus }>();

  onStatusChange(taskId: number, newStatus: TaskStatus): void {
    this.taskStatusChange.emit({ taskId, newStatus });
  }

  onDelete(taskId: number): void {
    this.taskDelete.emit(taskId);
  }

  onDrop(event: { previousIndex: number; currentIndex: number; previousContainer: any; container: any }): void {
     this.taskDrop.emit({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
      previousStatus: event.previousContainer.data.status,
      newStatus: this.status
    });
  }
}