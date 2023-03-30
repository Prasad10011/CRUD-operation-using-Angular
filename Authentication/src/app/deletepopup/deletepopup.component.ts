import { Component,Inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-deletepopup',
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.css']
})
export class DeletepopupComponent {

  constructor(private service:AuthService,@Inject(MAT_DIALOG_DATA) public data:any,private toastr:ToastrService){

  }
  deleteuser(){
    this.service.Deleteuser(this.data.usercode).subscribe(res=>{
      const toast=this.toastr.success("User deleted successfully");
    })
  }
}
