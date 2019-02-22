import { Component, OnInit, Inject } from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { SearchService } from "../../Service/search.service";
import { UserService } from "src/app/Service/user-services.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  userImage;
  username;
  image;
  constructor(
    @Inject(LOCAL_STORAGE) public storage: WebStorageService,
    private router: Router,
    public searchService: SearchService,
    private route: ActivatedRoute,
    private UserService: UserService
  ) {}
  searchForm = new FormGroup({
    word: new FormControl(""),
    page: new FormControl("1")
  });
  ngOnInit() {
    this.UserService.token = this.storage.get("token");
    this.UserService.getUserData().subscribe(res => {
      this.userImage = JSON.parse(res["_body"]).userImage;
      this.username = JSON.parse(res["_body"]).userName;
    });
    this.UserService.getdata().subscribe(res => {
      this.userImage = res;
    });
  }
  onSearch(event) {
    const formData = this.searchForm.value;
    if (event.keyCode === 13) {
      this.searchService.onSearch(
        this.searchForm.value.word,
        this.searchForm.value.page
      );
      this.searchService.searchValue = formData;
      this.router.navigate([
        "/Result/" +
          this.searchForm.value.word +
          "/" +
          this.searchForm.value.page
      ]);
    }
  }
  onLogout() {
    this.storage.remove("token");
    this.storage.remove("companyId");
    this.router.navigate(["/"]);
  }
}
