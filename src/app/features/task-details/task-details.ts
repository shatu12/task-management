import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Task } from '../../core/models/task/task';
import { TaskService } from '../../core/services/task/task';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './task-details.html',
  styleUrls: ['./task-details.scss']
})
export class TaskDetails implements OnInit {
  task: Task | null = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      const numericTaskId = Number(taskId);
      this.taskService.getTasks().subscribe(tasks => {
        this.task = tasks.find(t => t.id === numericTaskId) || null;
      });
    }
  }
}