import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string = "Save";

  constructor(private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      ID : ['', Validators.required],
      CodMagazin : ['', Validators.required],
      DenumireProdus : ['', Validators.required],
      date : ['', Validators.required],
      Cantitate : ['', Validators.required],
      PretUnitar : ['', Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['ID'].setValue(this.editData.ID);
      this.productForm.controls['CodMagazin'].setValue(this.editData.CodMagazin);
      this.productForm.controls['DenumireProdus'].setValue(this.editData.DenumireProdus);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['Cantitate'].setValue(this.editData.Cantitate);
      this.productForm.controls['PretUnitar'].setValue(this.editData.PretUnitar);

    }

  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added succesfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding tthe product")
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }
  
  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
  }
}
