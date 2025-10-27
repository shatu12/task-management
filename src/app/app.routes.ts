import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'board', pathMatch: 'full' },
    { path: 'board', loadComponent: () => import('./features/board/board').then(m => m.Board) },
    { path: 'tasks/:id', loadComponent: () => import('./features/task-details/task-details').then(m => m.TaskDetails) },
    { path: '**', redirectTo: 'board' }
];
