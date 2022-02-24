import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  submitted= false
  loading= false
  passwordPattern:any;
  apiResponse:any
  errorMessage=false
  

  userDetails: any=''
  loginUrl:any

  loginForm=new FormGroup({
    username:new FormControl(),
    password: new FormControl()
  })
  constructor(private formbuilder:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
   
    

    this.passwordPattern=

    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$') ]]
  });
  }
  get f() { return this.loginForm.controls; }


login(){
  // this.router.navigateByUrl('/homepage')
this.submitted=true
if (this.loginForm.invalid) {
  return;
}


this.userDetails={
  'username':'admin@test.com',
  'password':'Admin123!'
}
console.log(this.userDetails);

this.http.post(this.loginUrl,this.userDetails).subscribe(data=>{
this.apiResponse=data
  if(this.apiResponse.result=='success'){
    // storing user details to keep user logged in in the application even if user refresh's the page
  localStorage.setItem('username',this.f.username.value)
  localStorage.setItem('password',this.f.password.value)

  
  this.router.navigateByUrl('/homepage')
  }else if(this.apiResponse.result=='invalid'){

    this.errorMessage=true
    // document.getElementById('errorMessage').style.display='block'
  }

},error=>{
console.log(error);
this.loading=false


}
);

this.loading = true;
console.log("su")
}
}
