import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-component',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  template: `
    <h2 mat-dialog-title>{{ data.header }}</h2>
    <mat-dialog-content>
      {{ data.label }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>{{ data.cancelText }}</button>
      <button mat-button cdkFocusInitial (click)="onConfirm()" mat-dialog-close>
        {{ data.confirmText }}
      </button>
    </mat-dialog-actions>
  `,
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
