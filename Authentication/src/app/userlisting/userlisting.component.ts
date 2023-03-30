import { Component,AfterViewInit,ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { ToastrService } from 'ngx-toastr';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {

  constructor(private service:AuthService,private dialog:MatDialog,private toastr:ToastrService){
    this.loaduser();
  }
  userlist:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  loaduser(){
    this.service.getAll().subscribe(res=>{
      this.userlist=res;
      this.dataSource=new MatTableDataSource(this.userlist);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  displayedColumns: string[] = ['username', 'name', 'email','role', 'status','action'];

  Updateuser(code:any){
    const popup=this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width:'50%',
      data:{
        usercode:code 
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.loaduser();
    })
  }

  Deleteuser(code:any){
    const delpopup=this.dialog.open(DeletepopupComponent,{
      enterAnimationDuration:'100ms',
      exitAnimationDuration:'200ms',
      width:'30%',
      data:{
        usercode:code
      }
    })
    delpopup.afterClosed().subscribe(res=>{
      this.loaduser();
    })
  }

  openDialog(){
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
