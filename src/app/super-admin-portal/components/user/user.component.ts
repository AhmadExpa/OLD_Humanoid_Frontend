import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared-portal/services/user-service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
public allUserData:any = [];
public getIdUserData: any = [];
public publicMyId: any;
public activeSoftDeleteModal: Boolean = false;
public activeHardDeleteModal: Boolean = false;
public cols: any = [];
public _selectedColumns: any = [];
public clonedUserData: { [s: string]: any } = {}


constructor(
  private readonly UserService:UserService,
  private readonly ToastrService:ToastrService
){

}
  ngOnInit(): void {
    this.getAllUserData();

    this.cols = [
      { field: 'firstName', header: 'Name' },
      { field: 'lastName', header: 'LastName' },
      { field: 'email', header: 'Email' },
      { field: 'realPassword', header: 'Password' },
     


    ];
    this._selectedColumns = this.cols;

  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }



getAllUserData(){
  this.UserService.getAllUsers().subscribe(({ result }: any) => {
    this.allUserData = result.filter((res:any) => res.status !== 1) ;
    // console.log(this.allUserData)
    });
  }

  getIdDataOfUser(ID: any) {
    this.UserService.getUserById(ID).subscribe(({ result}: any) => {
      this.getIdUserData = result
      
    })
  }

  activeModal(data: { _id: any, modal?: 'hard' | 'soft' }) {
    this.publicMyId = data._id;
    this.activeSoftDeleteModal = data.modal === 'soft';
    this.activeHardDeleteModal = data.modal === 'hard';
  }

  softDeleteDataOfUserById(Id: any) {
    this.UserService.softDeleteUserById(Id).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'warning' : 'error'](message);
      this.getAllUserData();
    })
  }

  HardDeleteDataOfUserById(Id: any) {
    this.UserService.hardDeleteUserById(Id).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.getAllUserData();
    })
  }

  onRowEditSave(saveData: any, index: number) {
    if (saveData.rating > 0) {
      
      delete this.clonedUserData[index];
  
    } else {
      this.UserService.updateUserById(saveData).subscribe(({ data, message }: any) => {
        this.ToastrService[data ? 'success' : 'error'](message);
        this.allUserData = [];
        this.getIdUserData = [];
        this.getAllUserData();
      })
    }
  }

  onRowEditInit(userData: any, index: number,) {
    this.clonedUserData[index] = { ...this.allUserData[index] };
  }

  onRowEditCancel(cancelEditingData: any, index: number) {
    this.allUserData[index] = this.clonedUserData[index];
    delete this.clonedUserData[index];
    this.ToastrService.warning("Cancel-Editing")
  }

  
}
