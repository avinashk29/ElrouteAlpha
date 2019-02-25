import { Injectable, OnInit, NgZone } from "@angular/core";
import { Http, Headers} from "@angular/http";
import { CompanyServiceService } from "./company-service.service";
import { UserService } from "./user-services.service";

@Injectable({
    providedIn:'root'
})
export class ImageUploadService {
    token;
    file;
    image
    
    constructor(private ngZone:NgZone,private http:Http,private companyService:CompanyServiceService,private userService:UserService){}
    
    uploadImg(image){
        // console.log(image)
        // const headers=new Headers();
        // headers.append('x-auth',this.token);
        // console.log(this.token);
        return this.http.post('http://localhost:8080/api/imageupload',image);
    }

    updateCompanyImage(event ,name){
        console.log(name)
        this.file = <File>event.target.files[0];
         const fdata = new FormData()
          fdata.append(name,this.file)
         console.log(fdata);
         
         this.companyService.coverImage = null;
            this.uploadImg(fdata).subscribe(res=>{
                this.ngZone.run(()=>{
             if(res){
                const updata = new FormData();
                const url = res['_body'];
                      updata.append(name,url);
                        this.companyService.UpdateCompany(updata).subscribe(response => {
                                // this.companyService = JSON.parse(response['_body']);
                                this.companyService.companyLogo=JSON.parse(response['_body']).companyLogo;
                                this.companyService.coverImage=JSON.parse(response['_body']).coverImage;
                            })
                      
                        }
                  });
         });
    }

    updateUserImage(event,name){
        console.log(name)
        this.file = <File>event.target.files[0];
         const fdata = new FormData()
          fdata.append(name,this.file)
         console.log(fdata);
            this.uploadImg(fdata).subscribe(res=>{
           const updata = new FormData();
           const url = res['_body'];
                 updata.append(name,url);
                this.userService.editUser(updata).subscribe(response => {
                console.log(response)
                  this.userService.userImage= JSON.parse(response['_body']).userImage;
                
             });
         });
       
    }
  
}