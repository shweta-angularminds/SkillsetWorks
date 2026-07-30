import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';


import { FormFieldValue, Preference, PREFERENCE_FIELDS, PreferenceFormData } from './preference.interface';
import { showError } from '../../../../shared/utils/errorHandler';
import { NotifyService } from '../../../../core/services/notify.service';
import { JobseekerService } from '../../services/jobseeker.service';
import { mapModalToPreference } from './preference.mapper';

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
    private jobseekerService: JobseekerService,
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
    const body = mapModalToPreference(data);

    this.jobseekerService.updatePreference(body).subscribe({
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
