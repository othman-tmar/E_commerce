import { Component, ElementRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserService } from 'projects/user/src/app/services/user.service';
import * as ApexCharts from 'apexcharts';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  productsNumber: number;
  categoriesNumber: number;
  subcategoriesNumber: number;
  ordersNumber: number;
  usersNumber: number;
  TotalRevenues:number;
  uniqueOrdersDates:any[];
  orderCounts:any[];
  uniqueUsersDates:any[];
  userCounts:any[];
  ordersRevenue:any[];
  TopSellingList:any[];




  constructor(private serv: ProductService,
    private catserv: CategoryService,
    private subcatserv: SubcategoryService,
    private orderserv: OrderService,
    private userserv : UserService,
    private afDatabase: AngularFireDatabase,
   ) { };

  ngOnInit() {
    this.ListProducts()
    this.ListCategories()
    this.ListsubCategories()
    this.ImportData()
    this.topSellingList()
  }

  ListProducts() {
    return this.serv.LoadProducts().subscribe(data =>
      this.productsNumber = data.length),
      (err: any) => console.log(err)
  }

  ListCategories() {
    return this.catserv.LoadCategories().subscribe(data =>
      this.categoriesNumber = data.length),
      (err: any) => console.log(err)
  }

  ListsubCategories() {
    return this.subcatserv.LoadSubcategories().subscribe(data =>
      this.subcategoriesNumber = data.length),
      (err: any) => console.log(err)
  }

  topSellingList() {
    let topSellingList:any[] = [];
    this.serv.LoadProducts().subscribe(products => {
      this.orderserv.LoadOrders().subscribe(orders => {
        products.forEach(product => {
          let sold = 0;
          let revenue = 0;
          orders.forEach(order => {
            order.orderItems.forEach(item => {
              if (item.product === product._id.toString()) {
                sold += item.quantity;
                revenue += item.price * item.quantity;
              }
            });
          });
          if (sold > 0) {
            topSellingList.push({
              title: product.title,
              imageCover: product.imageCover,
              sold: sold,
              revenue: revenue
            });
          }
        });
        topSellingList.sort((a, b) => b.sold - a.sold);
        this.TopSellingList = topSellingList.slice(0,5);
      }, (err: any) => console.log(err));
    }, (err: any) => console.log(err));
  }




  ListOrders(): Promise<void> {
    return new Promise((resolve) => {
      this.orderserv.LoadOrders().subscribe((data) => {
        this.ordersNumber = data.length;
        var dates = data.map((order) => order.createdAt ? order.createdAt.toString().slice(0, 10) : "");
        this.uniqueOrdersDates = [...new Set(dates)];
        this.orderCounts = this.uniqueOrdersDates.map((date) =>dates.filter((d) => d === date).length);
        this.ordersRevenue = this.uniqueOrdersDates.map((date) =>
              data.filter((order) => order.createdAt && order.createdAt.toString().slice(0, 10) === date)
            .reduce((sum, order) => sum + order.totalOrderPrice, 0)
        );
       let sum=0; data.forEach(order=>{ sum+=order.totalOrderPrice})
       this.TotalRevenues=sum;
        console.log(this.TotalRevenues)
        resolve();
      }, (err: any) => console.log(err));
    });
  }

  ListUsers(): Promise<void> {
    return new Promise((resolve) => {
      this.userserv.LoadUsers().subscribe((data) => {
        this.usersNumber = data.length;
        var dates = data.map((user) =>
          user.createdAt ? user.createdAt.toString().slice(0, 10) : ""
        );
        this.uniqueUsersDates = [...new Set(dates)];
        this.userCounts = this.uniqueUsersDates.map((date) =>
          dates.filter((d) => d === date).length
        );
        resolve();
      }, (err: any) => console.log(err));
    });
  }




  async ImportData() {
    await this.ListOrders();
    await this.ListUsers();
    this.chartDisplay();
    this.RevenuechartDisplay();
  }

chartDisplay(){
  var options = {
    series: [
      {
        name: 'Orders',
        data: this.uniqueOrdersDates.map((date, index) => ({
          x: date,
          y: this.orderCounts[index],
        })),
      },
      {
        name: 'Customers',
        data: this.uniqueUsersDates.map((date, index) => ({
          x: date,
          y: this.userCounts[index],
        })),
      },
    ],

    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: true
      },
    },
    markers: {
      size: 4
    },
    colors: ['#4154f1', '#ff771d'],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.4,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return Math.round(value).toString();
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
    }
  }

  var chart = new ApexCharts(document.querySelector('#reportsChart'), options)
  chart.render()
}

RevenuechartDisplay(){
  var options = {
    series: [{
      name: 'Orders Revenues',
        data: this.ordersRevenue,
    }],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: true
      },
    },
    markers: {
      size: 4
    },
    colors: ['#2eca6a'],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.4,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      type: 'datetime',
      categories:this.uniqueOrdersDates
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return Math.round(value).toString();
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
    }
  }

  var chart = new ApexCharts(document.querySelector('#RevenueChart'), options)
  chart.render()
}


}
