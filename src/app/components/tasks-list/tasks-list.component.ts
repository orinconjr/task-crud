import { Component, OnInit } from '@angular/core';
import { TaskInfo } from '../../models/task-info.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {

  tasks?: TaskInfo[];
  currentTask: TaskInfo = {};
  currentIndex = -1;
  description = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.retrieveTasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll()
      .subscribe({
        next: (data) => {
          this.tasks = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = {};
    this.currentIndex = -1;
  }

  setActiveTask(task: TaskInfo, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }
}