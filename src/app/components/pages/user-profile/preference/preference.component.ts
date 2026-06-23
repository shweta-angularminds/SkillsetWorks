import { Component, Input } from '@angular/core';
import { NotifyService } from '../../../../services/notify.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../partials/modal/modal.component';
import {
  FormFieldValue,
  Preference,
  PreferenceFormData,
} from './constants/preference.interface';
import { mapModalToPreference } from './utils/preference.mapper';
import { PreferenceService } from './service/preference.service';
import { PREFERENCE_FIELDS } from './constants/preference-form';
import { showError } from '../../../../utils/errorHandler';

@Component({
  standalone: true,
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.css',
  imports: [CommonModule, ModalComponent],
})
export class PreferenceComponent {
  isModalVisible = false;
  formFields = PREFERENCE_FIELDS;

  formTitle = 'Add Preference';
  @Input()
  Id!: string;
  @Input()
  preferences!: Preference | null;
  selectedFormData: Partial<PreferenceFormData> = {};
  constructor(
    private preferenceService: PreferenceService,
    private notify: NotifyService,
  ) {}
  openModal(): void {
    this.selectedFormData = this.preferences
      ? this.mapPreferenceToModal(this.preferences)
      : {};

    this.isModalVisible = true;
  }
  onCloseModal() {
    this.isModalVisible = false;
  }

  handleFormDataChange(data: FormFieldValue[]): void {
    console.log(data);
    const body = mapModalToPreference(data);

    this.preferenceService.updatePreference(this.Id, body).subscribe({
      next: ({ data }) => {
        this.preferences = data;

        this.notify.notifyMessage('success', 'Preference updated successfully');

        this.onCloseModal();
      },

      error: (err) => showError(this.notify, err),
    });
  }

  mapPreferenceToModal(preference: Preference): PreferenceFormData {
    return {
      job_type: preference.job_type,
      join_time: preference.join_time,
      locations: preference.locations,
    };
  }
}
