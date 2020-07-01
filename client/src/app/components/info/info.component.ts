import { Component, OnInit, ɵConsole } from '@angular/core';
import { InfoService, Info } from 'src/app/utilities/services/info.service';
import { ActivatedRoute, ActivationEnd, Data } from '@angular/router';
import { store } from 'src/app/utilities/redux/store';
import { UserModel } from 'src/app/utilities/models/user-model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {

  // static info
  public totalProducts: number;
  public totalOrders: number;

  // store arguments
  public isLogin: boolean
  public isAdmin: boolean

  // info on login
  public info: Info = {
    new: false,
    messageDate: "",
    messagePrice: "",
    date: new Date(),
    price: 0
  }


  constructor(
    private infoService: InfoService,
    private activeRoute: ActivatedRoute,
    public user : UserModel

  ) { }

  ngOnInit(): void {

    this.subscribeToStore()
    this.subscribeToRoute()
    this.getStoreInfo()

  }

  // subscription section

  private subscribeToStore() {
    store.subscribe(() => {
      this.isAdmin = store.getState().auth.isAdmin
      this.isLogin = store.getState().auth.isLogin
      this.user = store.getState().auth.user
    })
    this.isLogin = store.getState().auth.isLogin
    this.isAdmin = store.getState().auth.isAdmin
    this.user = store.getState().auth.user
  }

  private subscribeToRoute() {
    this.activeRoute.data.subscribe((data: Data) => {
      if (data.info) {
        this.info = data.info
      }
    })
  }

  // end of subscription section

  //----------------------------------------------------//

  // request section

  private getStoreInfo() {
    this.infoService.getStoreInfo().subscribe(
      (response) => {
        this.totalProducts = response[0]
        this.totalOrders = response[1]
      }
    )
  }

  // end of request section
}
