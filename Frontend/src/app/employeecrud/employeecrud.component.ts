import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employeecrud',
  templateUrl: './employeecrud.component.html',
  styleUrls: ['./employeecrud.component.scss']
})
export class EmployeecrudComponent {

  EmployeeArray: any[] = [];
  public EmployeeDetails:any={};
  isResultLoaded = false;
  isUpdateFormActive = false;

  Name: string = "";
  Address: string = "";
  Phone: number = 0;

  currentEmployeeID = "";

  constructor(private http:HttpClient)
  {
    this.getAllEmployee();
  }

  getAllEmployee()
  {
    this.http.get("http://127.0.0.1:8000/api/employees")
    .subscribe((resultData: any)=>
    {
      this.isResultLoaded=true;
      console.log(resultData);
      this.EmployeeArray = resultData;
    });
  }
  getEmployee(data:any)
  {
    this.http.get("http://127.0.0.1:8000/api/view"+"/"+data.id).subscribe((resultData:any)=>
    {
      console.log(resultData.id);
      this.EmployeeDetails = resultData;
      this.openModal();
    })
  }
  openModal()
  {
    const modalDiv = document.getElementById("myModal");
    if(modalDiv!=null)
    {
      modalDiv.style.display = 'block';
    }
  }
  closeModal()
  {
    const modalDiv = document.getElementById("myModal");
    if(modalDiv!=null)
    {
      modalDiv.style.display = 'none';
    }
  }
  register()
  {
    let bodyData = {
      "Name" : this.Name,
      "Address" : this.Address,
      "Phone" : this.Phone
    }
    this.http.post("http://127.0.0.1:8000/api/register", bodyData).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("Employee Created Successfully!");
      this.getAllEmployee();
      this.Name="";
      this.Address="";
      this.Phone=0;
    });
  }
  setUpdate(data:any)
  {
    this.Name = data.Name;
    this.Address = data.Address;
    this.Phone = data.Phone;
    this.currentEmployeeID = data.id;
  }
  updateRecords()
  {
    let bodyData = {
      "Name": this.Name,
      "Address": this.Address,
      "Phone":this.Phone
    }
    this.http.put("http://127.0.0.1:8000/api/update"+"/"+this.currentEmployeeID, bodyData).subscribe((resultData:any)=>
    {
      console.log(resultData);
      alert("Employee Updated Successfully!");
      this.getAllEmployee();
      this.Name = "";
      this.Address = "";
      this.Phone = 0;
    })
  }
  save()
  {
    if(this.currentEmployeeID==''){
      this.register();
    }
    else{
      this.updateRecords();
    }
  }
  setDelete(data: any)
  {
    this.http.delete("http://127.0.0.1:8000/api/delete"+"/"+data.id).subscribe((resultData:any)=>
    {
      console.log(resultData);
      alert("Employee Deleted Successfully!");
      this.getAllEmployee();
    })
  }
}
