import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartData, ChartOptions, ChartType, Chart } from 'chart.js';
import { format } from 'date-fns';
import { NgChartsModule } from 'ng2-charts';

@Component({
  standalone: true,
  imports: [NgChartsModule],
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() responseData: any;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Daily Applicants',
        backgroundColor: '#42A5F5',
        borderColor: '#42A5F5',
        borderWidth: 1,
      },
    ],
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: { display: true, text: 'Number of Applicants' },
      },
    },
    elements: {
      bar: {
        borderColor: '#42A5F5',
        borderWidth: 2,
      },
    },
  };

  public barChartType: ChartType = 'bar';

  ngOnInit(): void {
    this.processData(this.responseData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['responseData']) {
      this.processData(this.responseData);
    }
  }

  processData(data: any) {
    const dateMap: { [key: string]: number } = {};

    data.applicants.forEach((applicant: any) => {
      const createdAt = new Date(applicant.createdAt);
      const formattedDate = format(createdAt, 'yyyy-MM-dd');

      if (dateMap[formattedDate]) {
        dateMap[formattedDate] += 1;
      } else {
        dateMap[formattedDate] = 1;
      }
    });

    const labels = Object.keys(dateMap);
    const values = Object.values(dateMap);

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          data: values,
          label: 'Daily Applicants',
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5',
          borderWidth: 1,
        },
      ],
    };
  }
}
