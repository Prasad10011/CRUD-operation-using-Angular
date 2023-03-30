import { Component,OnInit,Inject } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit{
  constructor(private builder:FormBuilder,private service:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any,private toastr:ToastrService,
    private dialog:MatDialogRef<UpdatepopupComponent>){

  }
  editdata:any;
  ngOnInit(): void {
    this.service.getAllRole().subscribe(res=>{
      this.rolelist=res;
    })
    if(this.data.usercode!=null && this.data.usercode!=''){
      this.service.getByCode(this.data.usercode).subscribe(res=>{
        this.editdata=res;
        this.registerForm.setValue({id:this.editdata.id,name:this.editdata.name,email:this.editdata.email,
          password:this.editdata.password,role:this.editdata.role,gender:this.editdata.gender,isactive:this.editdata.isactive})
      })
    }
  }
  rolelist:any;

  registerForm=this.builder.group({
    id:this.builder.control(''),
    name:this.builder.control(''),
    password:this.builder.control(''),
    email:this.builder.control(''),
    gender:this.builder.control(''),
    role:this.builder.control('',Validators.required),
    isactive:this.builder.control(false)
  });

  updateUser(){
    if(this.registerForm.valid){
      this.service.updateUser(this.registerForm.value.id,this.registerForm.value).subscribe(res=>{
        this.toastr.success("Updated successfully");
        this.dialog.close();
      })
    }
    else{
      this.toastr.warning("Please select role ");
    }

  }
}
