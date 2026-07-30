import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { showError } from '../../../../shared/utils/errorHandler';
import { LANGUAGE_FIELDS } from './language.interface';

import { FormFieldValue } from './language.interface';
import { validateLanguage } from './language.validator';
import { NotifyService } from '../../../../core/services/notify.service';
import { JobseekerService } from '../../services/jobseeker.service';

@Component({
  standalone: true,
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css',
  imports: [CommonModule, FormsModule, ModalComponent],
})
export class LanguagesComponent {
  @Input() Id!: string;
  @Input() Languages: string[] = [];

  isModalVisible = false;

  formTitle = 'Add Language';

  formFields = LANGUAGE_FIELDS;

  selectedFormData = {};

  constructor(
    private jobseekerService: JobseekerService,
    private notify: NotifyService,
  ) {}

  openModal(): void {
    this.selectedFormData = {};
    this.isModalVisible = true;
  }

  onCloseModal(): void {
    this.isModalVisible = false;
    this.selectedFormData = {};
  }

  handleFormDataChange(data: FormFieldValue[]): void {
    const language = data[0]?.value;

    const error = validateLanguage(language, this.Languages);

    if (error) {
      this.notify.notifyMessage('error', error);
      return;
    }

    this.jobseekerService.addLanguage({ language }).subscribe({
      next: () => {
        this.Languages = [...this.Languages, language];

        this.notify.notifyMessage('success', 'Language added successfully');

        this.onCloseModal();
      },

      error: (err: any) => showError(this.notify, err),
    });
  }

  deleteLanguage(language: string): void {
    this.jobseekerService.deleteLanguage({ language }).subscribe({
      next: () => {
        this.Languages = this.Languages.filter((l) => l !== language);

        this.notify.notifyMessage('success', 'Language deleted successfully');
      },

      error: (err: any) => showError(this.notify, err),
    });
  }
}
