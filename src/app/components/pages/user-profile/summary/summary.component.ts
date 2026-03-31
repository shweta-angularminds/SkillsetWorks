import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { NotifyService } from '../../../../services/notify.service';
import { add_details } from '../../../../../constants/url/urls';

export const Summary = [
  {
    fields: [
      {
        label: 'Profile Summary',
        inputType: 'textarea',
        placeholder: 'write profile summary .....',
        value: '',
        name: 'summary',
      },
    ],
  },
];
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent implements OnInit {
  @Input()
  id!: string;
  @Input()
  summary: string = '';
  isModalVisible = false;
  formFields = Summary[0];

  formTitle = 'Add Profile Summary';
  constructor(private http: HttpService, private notify: NotifyService) {}
  ngOnInit(): void {}

  openModal() {
    this.formFields = Summary[0];
    if (this.summary) {
      this.formFields.fields;
    }

    this.isModalVisible = true;
  }

  onCloseModal() {
    this.isModalVisible = false;
  }

  handleFormDataChange(labelValuePairs: any) {
    this.AddSummary(labelValuePairs[0].value);
  }

  AddSummary(summary: string) {
    const body = { summary: summary };
    this.http.Patch(add_details + '/' + this.id + '/summary', body).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', res.message);
        window.location.reload();
      },
      error: (err: any) => {
        this.notify.notifyMessage('error', err.message);
      },
    });
  }
}
