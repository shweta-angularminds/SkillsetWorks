import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../../../partials/modal/modal.component';


import { EducationField } from '../../../../../constants/data/form-fields';

import { NotifyService } from '../../../../services/notify.service';
import { EducationService } from './services/education.service';

import { Education, FormFieldValue } from './constants/education.interface';
import { mapModalToEducation } from './utils/education.mapper';
import { validateEducation } from './utils/education.validator';
import { showError } from '../../../../utils/errorHandler';

@Component({
  standalone: true,
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  imports: [CommonModule, FormsModule, ModalComponent],
})
export class EducationComponent implements OnInit {
  @Input() education!: Education | null;
  @Input() id!: string;

  // State
  isModalVisible = false;
  selectedEducation = '';
  educationFields: any[] = [];
  selectedFormData: Record<string, string> = {};

  readonly educationData = EducationField;

  constructor(
    private educationService: EducationService,
    private notify: NotifyService,
  ) {}

  ngOnInit(): void {
    this.setEducationFields(this.selectedEducation);
  }

  // PUBLIC METHODS

  onEducationLevelChange(educationLevel: string): void {
    this.selectedEducation = educationLevel;
    this.setEducationFields(educationLevel);
  }

  openModal(): void {
    const existingEducation =
      this.selectedEducation &&
      this.education?.[this.selectedEducation as keyof Education];

    if (existingEducation) {
      this.populateEducationFields(existingEducation);
    } else {
      this.selectedFormData = {};
      this.isModalVisible = true;
    }
  }

  onCloseModal(): void {
    this.resetModal();
  }

  handleFormDataChange(data: FormFieldValue[]): void {
    const body = mapModalToEducation(data, this.selectedEducation);

    const error = validateEducation(
      this.selectedEducation,
      body.educationData,
      this.educationFields,
    );

    if (error) {
      this.notify.notifyMessage('error', error);
      return;
    }

    this.educationService.saveEducation(body).subscribe({
      next: ({ data }) => {
        this.education = {
          ...this.education,
          [data.educationField]: data.education,
        };
        this.notify.notifyMessage('success', 'Education saved successfully');

        this.resetModal();
      },

      error: (err) => showError(this.notify,err),
    });
  }

  editEducation(level: string): void {
    this.onEducationLevelChange(level);
    this.openModal();
  }


  // PRIVATE METHODS

  private setEducationFields(educationLevel: string): void {
    const selected = this.educationData.find(
      (item) => item.title === educationLevel,
    );

    this.educationFields = selected?.fields ?? [];
  }

  private populateEducationFields(educationData: Record<string, string>): void {
    this.selectedFormData = {
      ...educationData,
    };

    this.isModalVisible = true;
  }

  private resetModal(): void {
    this.isModalVisible = false;
    this.selectedFormData = {};
  }
}
