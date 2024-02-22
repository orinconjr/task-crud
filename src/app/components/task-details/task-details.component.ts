import { Component, Input, OnInit } from '@angular/core';
import { TaskInfo } from '../../models/task-info.model';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentTask: TaskInfo = {
    description: '',
    active: false
  };

  message = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTask(this.route.snapshot.params["id"]);
    }
  }

  getTask(id: string): void {
    this.taskService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTask = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(active: boolean): void {
    console.log("UpdatePublished: " + active);
    debugger;
    const data = {
      id: this.currentTask.id,
      description: this.currentTask.description,
      active: this.currentTask.active == true ? false : true
    };
    console.log(JSON.stringify(data));
    this.message = '';
debugger;
    this.taskService.update(this.currentTask.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentTask.active = data.active;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateTask(): void {
    this.message = '';

    this.taskService.update(this.currentTask.id, this.currentTask)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This task was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTask(): void {
    this.taskService.delete(this.currentTask.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tasks']);
        },
        error: (e) => console.error(e)
      });
  }
}
