import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CheckboxOption {
  value: string;
  label: string;
}
interface FormField {
  label: string;
  inputType: string;
  placeholder?: string;
  value?: any;
  name: string;
  options?: CheckboxOption[];
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  @Input() formFields: FormField[] = [];
  @Input() formHeader: string = 'Form';
  @Input() formData: any = {};

  @Output() formDataChange = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  dropdownVisible = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(): void {
    this.initializeForm();
  }

  initializeForm() {
    if (!this.formData) {
      this.formData = {};
    }

    this.formFields.forEach((field) => {
      if (this.formData[field.name] !== undefined) return;

      if (field.inputType === 'checkbox' || field.inputType === 'select') {
        this.formData[field.name] = [];
      } else if (field.inputType === 'radio') {
        this.formData[field.name] = field.options?.[0]?.value || '';
      } else {
        this.formData[field.name] = '';
      }
    });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onCheckboxChange(fieldName: string, value: string, event: any) {
    const current = this.formData[fieldName] || [];

    if (event.target.checked) {
      this.formData[fieldName] = [...current, value];
    } else {
      this.formData[fieldName] = current.filter((v: string) => v !== value);
    }
  }

  submitData() {
    const result = this.formFields.map((field) => ({
      name: field.name,
      value: this.formData[field.name],
    }));

    this.formDataChange.emit(result);
    this.close();
  }

  close() {
    this.closeModal.emit();
  }
}
