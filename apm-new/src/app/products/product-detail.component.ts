import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;

    this.getProductsData().subscribe((productsData) => {
      this.product = productsData.find((p) => p.productId === id);
    });
  }

  getProductsData() {
    return this.http.get<IProduct[]>('../../assets/api/products/products.json');
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
