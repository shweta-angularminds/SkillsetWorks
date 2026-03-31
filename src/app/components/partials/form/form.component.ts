import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  imports: [CommonModule, FormsModule],
})
export class FormComponent {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() options: any[] = [];
  @Output() valueChange = new EventEmitter<{ name: string; value: any }>();
  selectedOptions: any[] = [];
  value: any;

  onValueChange() {
    this.valueChange.emit({ name: this.name, value: this.selectedOptions });
  }
}
