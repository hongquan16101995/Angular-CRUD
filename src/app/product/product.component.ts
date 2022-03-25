import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  formProduct: FormGroup;
  products: Product[];
  product: Product;

  constructor(private productService: ProductService,
              private formGroup: FormBuilder) {
  }

  ngOnInit(): void {
    this.formProduct = this.formGroup.group({
      id: [''],
      name: ['', [Validators.required]],
      price: [''],
      description: ['']
    });
    this.getAllProduct();
  }

  // tslint:disable-next-line:typedef
  getAllProduct() {
    this.productService.getAllProducts().subscribe(data  => this.products = data);
    this.formProduct.reset();
    document.getElementById('submit').innerText = 'Create';
    document.getElementById('title').innerText = 'Create new product';
  }

  // tslint:disable-next-line:typedef
  getProduct(id: number) {
    this.productService.getProductById(id).subscribe((data) => {
      this.products = [];
      this.products.push(data);
    });
  }

  // tslint:disable-next-line:typedef
  createProduct() {
    const product = {
      id: this.formProduct.value.id,
      name: this.formProduct.value.name,
      price: this.formProduct.value.price,
      description: this.formProduct.value.description,
    };
    this.productService.createProduct(product).subscribe(() => {
      alert('Create Successfully');
      this.formProduct.reset();
      this.getAllProduct();
    });
  }

  // tslint:disable-next-line:typedef
  editProduct(id: number) {
    this.productService.getProductById(id).subscribe(data => this.formProduct.patchValue(data));
    document.getElementById('submit').innerText = 'Update';
    document.getElementById('title').innerText = 'Update product';
  }

  // tslint:disable-next-line:typedef
  deleteProduct(id: number, name: string) {
    if (confirm('Are you sure delete product: ' + name + '?')) {
      this.productService.deleteProduct(id).subscribe(() => {
          alert('Delete Successfully!');
          this.getAllProduct();
        }
      );
    }
  }
}
