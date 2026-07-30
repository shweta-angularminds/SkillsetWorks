import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ExperienceD } from '../../../../core/constants/data/form-fields';

import { mapExperienceToModal } from './experience.mapper';
import { mapModalToExperience } from './experience.mapper';
import { validateExperience } from './experience.validator';

import {
  Experience,
  ExperienceFormData,
  FormFieldValue,
} from './experience.interface';
import { showError } from '../../../../shared/utils/errorHandler';
import { NotifyService } from '../../../../core/services/notify.service';
import { JobseekerService } from '../../services/jobseeker.service';

@Component({
  standalone: true,
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
  imports: [CommonModule, FormsModule, ModalComponent],
})
export class ExperienceComponent {
  @Input() Id!: string;
  @Input() experiences: Experience[] = [];

  isModalVisible = false;
  readonly formFields = ExperienceD[0];
  formTitle = 'Add Experience';

  selectedExperience: Partial<ExperienceFormData> = {};
  editingExpId: string | null = null;

  constructor(
    private jobseekerService: JobseekerService,
    private notify: NotifyService,
  ) {}

  openModal(exp?: Experience): void {
    this.formTitle = exp ? 'Edit Experience' : 'Add Experience';

    this.editingExpId = exp?._id || null;

    this.selectedExperience = exp ? mapExperienceToModal(exp) : {};

    this.isModalVisible = true;
  }

  onCloseModal(): void {
    this.resetModal();
  }

  handleFormDataChange(data: FormFieldValue[]): void {
    const body = mapModalToExperience(data);

    const error = validateExperience(body);

    if (error) {
      this.notify.notifyMessage('error', error);
      return;
    }

    if (this.editingExpId) {
      this.update(body);
    } else {
      this.create(body);
    }
  }

  trackByExperience(index: number, exp: Experience): string {
    return exp._id ?? index.toString();
  }

  private create(body: Experience): void {
    this.jobseekerService.addExperience(body).subscribe({
      next: ({ data }) => {
        
        this.experiences=data;
        this.notify.notifyMessage('success', 'Experience Added');
        this.onCloseModal();
      },

      error: (err) => showError(this.notify, err),
    });
  }

  private update(body: Experience): void {
    this.jobseekerService.updateExperience(this.editingExpId!, body).subscribe({
      next: ({ data }) => {
        this.experiences = this.experiences.map((exp) =>
          exp._id === data._id ? data : exp,
        );
        this.notify.notifyMessage('success', 'Experience Updated');
        this.onCloseModal();
      },

      error: (err) => showError(this.notify, err),
    });
  }

  private resetModal(): void {
    this.isModalVisible = false;
    this.selectedExperience = {};
    this.editingExpId = null;
  }

  deleteExperience(id: string): void {
    this.jobseekerService.deleteExperience(id).subscribe({
      next: () => {
        this.experiences = this.experiences.filter((exp) => exp._id !== id);
        this.notify.notifyMessage('success', 'Deleted Successfully');
      },

      error: (err) => showError(this.notify, err),
    });
  }
}
