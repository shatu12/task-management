import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Task } from '../../core/models/task/task';
import { TaskService } from '../../core/services/task/task';
import { TaskList } from '../task-list/task-list';
import { TaskStatus } from '../../core/enums/task-status';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, MatCardModule, TaskList, DragDropModule],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class Board implements OnInit {
  tasks: Task[] = [];
  readonly statuses = [TaskStatus.Pending, TaskStatus.InProgress, TaskStatus.Done];
  readonly connectedLists = ['todo-list', 'in-progress-list', 'done-list'];

  constructor(private taskService: TaskService) { }

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

  getListId(status: TaskStatus): string {
    const listIds = {
      [TaskStatus.Pending]: 'todo-list',
      [TaskStatus.InProgress]: 'in-progress-list',
      [TaskStatus.Done]: 'done-list'
    };
    return listIds[status];
  }

  // Drag and drop handler
  onTaskDrop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTaskOrder(event.container.data);
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];
      this.taskService.updateTask(movedTask.id, { status: newStatus });

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Helper method to update task order (optional)
  private updateTaskOrder(tasks: Task[]): void {
    console.log('Tasks reordered:', tasks);
  }

  onTaskStatusChange(event: { taskId: number; newStatus: TaskStatus }): void {
    this.taskService.updateTask(event.taskId, { status: event.newStatus });
  }

  onTaskDelete(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}