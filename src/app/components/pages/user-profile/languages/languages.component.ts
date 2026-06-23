import { Component, Input, OnInit } from '@angular/core';

import { HttpService } from '../../../../services/http.service';
import { NotifyService } from '../../../../services/notify.service';
import { add_language_url } from '../../../../../constants/url/urls';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../partials/modal/modal.component';
import { showError } from '../../../../utils/errorHandler';

export const LanguageD = [
  {
    fields: [
      {
        label: 'Language',
        inputType: 'text',
        placeholder: 'Enter language name',
        value: '',
        name: 'languages', // Unique name for database or form handling
      },
    ],
  },
];
@Component({
  standalone: true,
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css',
  imports: [CommonModule, FormsModule, ModalComponent],
})
export class LanguagesComponent implements OnInit {
  isModalVisible = false;
  formFields = LanguageD[0];

  formTitle = 'Add Language';
  @Input()
  Id!: string;
  @Input()
  Languages: string[] = [];
  constructor(
    private http: HttpService,
    private notify: NotifyService,
  ) {}
  ngOnInit(): void {}

  openModal() {
    this.formFields = LanguageD[0];

    this.isModalVisible = true;
  }

  onCloseModal() {
    this.isModalVisible = false;
  }

  handleFormDataChange(labelValuePairs: any) {
    this.AddLanguge(labelValuePairs[0].value);
  }

  AddLanguge(lang: string) {
    const trimmedLang = lang?.trim();

    if (!trimmedLang) {
      this.notify.notifyMessage('error', 'Please enter a language');
      return;
    }
    const languageRegex = /^[A-Za-z\s]+$/;

    if (!languageRegex.test(trimmedLang)) {
      this.notify.notifyMessage(
        'error',
        'Language name should contain only letters and spaces.',
      );
      return;
    }

    if (
      this.Languages?.some(
        (l: string) => l.toLowerCase() === trimmedLang.toLowerCase(),
      )
    ) {
      this.notify.notifyMessage(
        'error',
        'This language has already been added.',
      );

      return;
    }
    const body = { language: trimmedLang };

    this.http.post(add_language_url + this.Id + '/language', body).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'Language Added Succesfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: (err) => showError(this.notify, err),
    });
  }
  deleteLang(lang: string) {
    const body = { language: lang };
    this.http.Put(add_language_url + this.Id + '/language', body).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'Language Deleted Successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: (err) => showError(this.notify, err),
    });
  }
}
