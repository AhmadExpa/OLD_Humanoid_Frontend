import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared-portal/services/admin-service/task.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent {
  public assignTask: FormGroup | any;
  public role_list: any[] = []



  constructor(private readonly taskService: TaskService,
    private readonly formBuilder: FormBuilder,
    private readonly toaster: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.createAssignTask()
    this.getAllUserRole()
  }

  getAllUserRole() {
    this.taskService.getUserRole().subscribe(({ result }: any) => {
      result.forEach((item: any) => this.role_list.push(item.role))
    })
  }

  createAssignTask() {
    this.assignTask = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      assign_date: new FormControl('', Validators.required),
      task: new FormControl('', Validators.required),
      assign_to: new FormControl(this.role_list[0], Validators.required),
    })
  }


  submit() {
    const payLoad = this.assignTask.value
    console.log(payLoad);
    this.taskService.createAssignTask(payLoad).subscribe(({ message, data }: any) => {
      this.toaster[data ? 'success' : 'error'](message);
      this.assignTask.reset()
    })
  }
}
