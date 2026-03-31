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
  @Input() modalMessage: string = 'Default message';
  @Input() formFields: FormField[] = [];
  @Input() formHeader: string = 'Form';
  @Input() formData: any = {};
  @Output() formDataChange = new EventEmitter<any>();

  @Output() closeModal = new EventEmitter<void>();
  dropdownVisible = false;

  ngOnInit(): void {
  
    if (!this.formData) {
      this.formData = {};
    }

    this.formFields.forEach((field) => {
      if (field.inputType === 'checkbox') {
        this.formData[field.name] = {};
        field.options?.forEach((option) => {
          this.formData[field.name][option.value] = false;
        });
      } else if (field.inputType === 'radio') {
        this.formData[field.name] =
          field.options && field.options.length > 0
            ? field.options[0].value
            : '';
      } else if (field.inputType === 'select') {
        this.formData[field.name] = [];
      } else {
        this.formData[field.name] = field.value || '';
      }
    });
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  isSelected(fieldName: string, value: string): boolean {
    return this.formData[fieldName]?.includes(value);
  }

  onCheckboxChange(fieldName: string, value: string, event: any) {
    const selectedLocations = this.formData[fieldName] || [];

    if (event.target.checked) {
      this.formData[fieldName] = [...selectedLocations, value];
    } else {
      this.formData[fieldName] = selectedLocations.filter(
        (location: any) => location !== value
      );
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formFields'] && this.formFields) {
      this.formFields.forEach((field) => {
        if (!this.formData[field.name]) {
          this.formData[field.name] = field.value || ''; 
        }
      });
    }
  }

  submitData() {
    const labelValuePairs = this.formFields.map((field) => ({
      name: field.name,
      value:
        field.inputType === 'checkbox'
          ? Object.keys(this.formData[field.name]).filter(
              (key) => this.formData[field.name][key]
            )
          : field.inputType === 'select'
          ? this.formData[field.name]
          :
            this.formData[field.name] || '',
    }));

    this.formDataChange.emit(labelValuePairs);
    this.close();
  }

  close() {
    this.closeModal.emit();
  }


  onValueChange(fieldName: string, event: any) {
    const updatedValue = event.target.value;
    this.formData[fieldName] = updatedValue; 
  }
}
