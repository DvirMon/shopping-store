import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public totalProducts: number;
  public totalOrders: number;

  constructor(
    private infoService: InfoService,
    private activeRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.infoService.getStoreInfo().subscribe(
      (response) => {
        this.totalProducts = response[0]
        this.totalOrders = response[1]
      }
    )

    this.infoService.getNotification("5eb91f8ce3dc2031bc286d62").subscribe(
      (response) => console.log(response)
    )
  }

}
