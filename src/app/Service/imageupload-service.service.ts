import { Injectable, OnInit, NgZone } from "@angular/core";
import { Http, Headers} from "@angular/http";
import { CompanyServiceService } from "./company-service.service";
import { UserService } from "./user-services.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FeedService } from "./feed-service.service";

@Injectable({
    providedIn:'root'
})
export class ImageUploadService {
    token;
    file;
    image
    
    constructor(private ngZone:NgZone,private http:Http,private companyService:CompanyServiceService,private userService:UserService,private spinner:Ng4LoadingSpinnerService,private feedService:FeedService){}
    
    uploadImg(image){
        return this.http.post('http://localhost:8080/api/imageupload',image);
    }

    updateCompanyImage(event ,name){
        console.log(name)
        this.file = <File>event.target.files[0];
         const fdata = new FormData()
          fdata.append(name,this.file)
         console.log(fdata);
         this.spinner.show();
            this.uploadImg(fdata).subscribe(res=>{
                console.log(res)
                const updata = new FormData();
                const url = res['_body'];
                      updata.append(name,url);
                        this.companyService.UpdateCompany(updata).subscribe(response => {
                                this.companyService.companyLogo=JSON.parse(response['_body']).companyLogo;
                                this.companyService.coverImage=JSON.parse(response['_body']).coverImage;
                                 this.companyService.infoImage=JSON.parse(response['_body']).infoImage;
                               this.spinner.hide();
                            })
         });
    }

    updateUserImage(event,name){
        console.log(name)
        this.file = <File>event.target.files[0];
         const fdata = new FormData()
          fdata.append(name,this.file)
         console.log(fdata);
         this.spinner.show();
            this.uploadImg(fdata).subscribe(res=>{
           const updata = new FormData();
           const url = res['_body'];
                 updata.append(name,url);
                 if(name==='Image'){
                    this.feedService.AddFeed(updata).subscribe(res=>{
                        this.userService.Image=JSON.parse(res['_body']).Image;
                        console.log(this.userService.Image)
                    })
                 }
                this.userService.editUser(updata).subscribe(response => {
                  this.userService.userImage= JSON.parse(response['_body']).userImage;
                  this.spinner.hide();
                
             });
           
         });
       
    }
  
}