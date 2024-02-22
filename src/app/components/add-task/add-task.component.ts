import { Component } from '@angular/core';
import { TaskInfo } from '../../models/task-info.model';
import { TaskService } from '../../services/task.service';  
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  task: TaskInfo = {
    description: '',
    active: true
  }; 
  submitted = false;

  constructor(private taskService: TaskService) { }

  saveTask(): void{
    const data = {
      description: this.task.description,
      active: this.task.active
    }

    this.taskService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTask(): void {
    this.submitted = false;
    this.task = {
      description: '',
      active: false
    };
  }
}
