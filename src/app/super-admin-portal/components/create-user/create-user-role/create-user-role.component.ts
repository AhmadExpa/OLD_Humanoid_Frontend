import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared-portal/services/admin-service/task.service';

@Component({
  selector: 'app-create-user-role',
  templateUrl: './create-user-role.component.html',
  styleUrls: ['./create-user-role.component.css']
})
export class CreateUserRoleComponent {
  @Output() roleListUpdated = new EventEmitter<any>();
  public createUserRole: FormGroup | any;
  public role_list: any[] = []
  

  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly taskService: TaskService,
    private readonly toaster: ToastrService
    
){}
  
  ngOnInit(): void {
    this.createUserRoleFn()
    
  }
  createUserRoleFn(){
    this.createUserRole = this.formBuilder.group({
     role: new FormControl('',[Validators.required])
    })
  }

  //get user role list
  getAllUserRole() {
    this.taskService.getUserRole().subscribe(({ result }: any) => {
      this.role_list = result.map((item: any) => item.role);
      this.roleListUpdated.emit(this.role_list);
    });
  }


   submitRole(){
    const userRole = this.createUserRole.value;
     const payLoad = {
      ...userRole,
      role: userRole.role.toLowerCase().replace(/\s/g, "-")
    };
    this.taskService.createUserRole(payLoad).subscribe((res:any)=>{
      this.toaster[res.data ? 'success' : 'error'](res.message);
      this.getAllUserRole()
    })
  }
}
