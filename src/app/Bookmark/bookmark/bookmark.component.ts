import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  constructor(public bookmarkService:BookmarkServices,@Inject(LOCAL_STORAGE) public storage:WebStorageService) { }
  id;
  // cards = [
  //   {
  //   type: 1,
  //   catogory: 'Laptp',
  //   productName: 'Product Name',
  //   company: 'Company ka Naam',
  //   device: 'computer',
  //   country: 'China',
  //   discription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

  //   },
  //   {
  //     type: 2,
  //     Servicecatogory: 'Service',
  //     serviceName: 'Product Name',
  //     scompany: 'Company ka Naam',
  //     sdevice: 'computer',
  //     scountry: 'China',
  //     sdiscription: 'It is a ader will be distracted by the readable content of a page when looking at its layout.'

  //     },
  //     {
  //       type: 2,
  //       Servicecatogory: 'Service',
  //       serviceName: 'Product Name',
  //       scompany: 'Company ka Naam',
  //       sdevice: 'computer',
  //       scountry: 'China',
  //       sdiscription: 'It is a ader will be distracted by the readable content of a page when looking at its layout.'

  //       },
  //       {
  //         type: 2,
  //         Servicecatogory: 'Service',
  //         serviceName: 'Acer Aspire E5-574G 57T1',
  //         scompany: 'by Jinan Kelunte Bearing Co., Ltd.',
  //         sdevice: 'computer',
  //         scountry: 'China',
  //         sdiscription: 'It is a ader will be distracted by the readable content of a page when looking at its layout.'

  //         },
  //         {
  //           type: 2,
  //           Servicecatogory: 'Service',
  //           serviceName: 'Product Name',
  //           scompany: 'Company ka Naam',
  //           sdevice: 'computer',
  //           scountry: 'China',
  //           sdiscription: 'It is a ader will be distracted by the readable content of a page when looking at its layout.'

  //           },
  //           {
  //             type: 2,
  //             Servicecatogory: 'Service',
  //             serviceName: 'Product Name',
  //             scompany: 'Company ka Naam',
  //             sdevice: 'computer',
  //             scountry: 'China',
  //             sdiscription: 'It is a ader will be distracted by the readable content of a page when looking at its layout.'

  //             },
  //     {
  //       type: 1,
  //       catogory: 'Lap',
  //       productName: 'Prot Name',
  //       company: 'Company',
  //       device: 'computer',
  //       country: 'China',
  //       discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

  //       },
  //       {
  //         type: 2,
  //         Servicecatogory: 'Service',
  //         serviceName: 'Product Name',
  //         scompany: 'Company ka Naam',
  //         sdevice: 'computer',
  //         scountry: 'China',
  //         sdiscription: 'It is a long established fact that a reader will be readable content of a page when looking at its layout.'

  //         },
  //         {
  //           type: 1,
  //           catogory: 'Laptp',
  //           productName: 'Product Name',
  //           company: 'Company ka Naam',
  //           device: 'computer',
  //           country: 'China',
  //           discription: 'It is a long established fact that a reader will be distrable content of a page when looking at its layout.'

  //           },
  //           {
  //             type: 2,
  //             Servicecatogory: 'Service',
  //             serviceName: 'Product Name',
  //             scompany: 'Company ka Naam',
  //             sdevice: 'computer',
  //             scountry: 'China',
  //             sdiscription: 'It is a long established fact that a reader will beble content of a page when looking at its layout.'

  //             }
  // ];
  ngOnInit() {
    this.bookmarkService.token=this.storage.get('token');
    this.bookmarkService.BookmarkResult().subscribe(res=>{
      console.log(res);
    })
    
  }



}
