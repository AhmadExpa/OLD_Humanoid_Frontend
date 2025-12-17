import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/shared-portal/services/admin-service/task.service';
import { LoginService } from 'src/app/shared-portal/services/login-api/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public getEmployeeTask:any[] = []
  constructor(
    private readonly taskService:TaskService
  ) {}
  ngOnInit(): void {
    this.getAssignTask()
  }

  getAssignTask(){
    this.taskService.getAllAssignTask().subscribe(({result,data,message}:any)=>{
      result.forEach((element:any) => {
        if(element.assign_to === 'employee'){
          this.getEmployeeTask.push(element)
          console.log(this.getEmployeeTask);
        }
      });
    })
  }
}
