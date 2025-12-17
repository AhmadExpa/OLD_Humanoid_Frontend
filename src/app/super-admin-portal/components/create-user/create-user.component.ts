import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared-portal/services/admin-service/task.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  public createUser: FormGroup | any;
  public role_list: any[] = []


  constructor(private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private readonly toaster: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.createUserFn()
    this.getAllUserRoll()
  }

  getAllUserRoll() {
    this.taskService.getUserRole().subscribe(({ result }: any) => {
      result.forEach((item: any) => this.role_list.push(item.role))
    })
  }

  createUserFn() {
    this.createUser = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl(this.role_list[0], Validators.required),
    })
  }

  submit() {
    const payLoad = this.createUser.value;
    this.taskService.createUser(payLoad).subscribe((res: any) => {
      this.toaster[res.data ? 'success' : 'error'](res.message);
      this.createUser.reset()      
    })
  }

  //Updated Role List
  RoleList(roleList: any[]) {
    this.role_list = roleList;
  }
}
