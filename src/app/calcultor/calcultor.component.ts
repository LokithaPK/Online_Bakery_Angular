import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CalculatorService } from '../calculator.service'; // Import CalculatorService

@Component({
  selector: 'app-calcultor',
  templateUrl: './calcultor.component.html',
  styleUrls: ['./calcultor.component.css']
})
export class CalcultorComponent implements OnInit {
  calculatorForm: FormGroup;
  totalAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private calculatorService: CalculatorService // Inject CalculatorService
  ) {
    this.calculatorForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      products: this.fb.array([])
    });

    this.calculatorForm.get('products')?.valueChanges.subscribe(() => {
      this.totalAmount = this.calculateTotalAmount();
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const cartItems = JSON.parse(params['cartItems'] || '[]');
      const productsFormArray = this.calculatorForm.get('products') as FormArray;

      cartItems.forEach((item: { name: string, price: number }) => {
        productsFormArray.push(this.fb.group({
          name: [item.name, Validators.required],
          price: [item.price, [Validators.required, Validators.min(0)]]
        }));
      });

      this.totalAmount = this.calculateTotalAmount();
    });
  }

  get products(): FormArray {
    return this.calculatorForm.get('products') as FormArray;
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
    this.totalAmount = this.calculateTotalAmount();
  }

  onSubmit() {
    if (this.calculatorForm.valid) {
      const formData = this.calculatorForm.value;
      this.calculatorService.saveCalculation(formData) // Use CalculatorService to save data
        .subscribe(
          response => {
            console.log('Form Data:', response);
          },
          error => {
            console.log('Error:', error);
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }

  calculateTotalAmount(): number {
    return this.products.controls.reduce((total, product) => {
      const price = product.get('price')?.value;
      return total + (price || 0);
    }, 0);
  }

  onPrint() {
    if (this.calculatorForm.valid) {
      const formData = this.calculatorForm.value;
      this.calculatorService.saveBill(formData) // Call service method to save bill
        .subscribe(
          response => {
            console.log('Bill Saved:', response);
            window.print();
          },
          error => {
            console.error('Error saving bill:', error);
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
