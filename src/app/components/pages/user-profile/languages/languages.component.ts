import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ModalComponent } from '../../../partials/modal/modal.component';
import { showError } from '../../../../utils/errorHandler';
import { LANGUAGE_FIELDS } from './constants/language-form';

import { LanguageService } from './services/language.service';
import { NotifyService } from '../../../../services/notify.service';
import { FormFieldValue } from './constants/language.interface';
import { validateLanguage } from './utils/language.validator';


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
    private languageService: LanguageService,
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

    this.languageService.addLanguage( { language }).subscribe({
      next: () => {
        this.Languages = [...this.Languages, language];

        this.notify.notifyMessage('success', 'Language added successfully');

        this.onCloseModal();
      },

      error: (err) => showError(this.notify, err),
    });
  }

  deleteLanguage(language: string): void {
    this.languageService.deleteLanguage( { language }).subscribe({
      next: () => {
        this.Languages = this.Languages.filter((l) => l !== language);

        this.notify.notifyMessage('success', 'Language deleted successfully');
      },

      error: (err) => showError(this.notify, err),
    });
  }
}
