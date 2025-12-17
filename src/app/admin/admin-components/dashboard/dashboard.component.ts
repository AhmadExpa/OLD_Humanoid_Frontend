import { Component } from '@angular/core';
import { TaskService } from 'src/app/shared-portal/services/admin-service/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public getAdminTask:any[] = []
  constructor(
    private readonly taskService:TaskService
  ) {}
  ngOnInit(): void {
    this.getAssignTask()
  }

  getAssignTask(){
    this.taskService.getAllAssignTask().subscribe(({result,data,message}:any)=>{
      result.forEach((element:any) => {
        if(element.assign_to === 'admin'){
          this.getAdminTask.push(element)
          console.log(this.getAdminTask);
        }
      });
    })
  }
}
