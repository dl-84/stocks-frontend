import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

import { Chart } from 'angular-highcharts';

import { StockDisplayDataDto } from '../core/dto/stockDisplayDataDto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges {
  @Input() public data: Array<StockDisplayDataDto>;

  ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('data') && this.data) {
      this.data.forEach(x => {
        if (x.price) {
          this.chart.addPoint(x.price);
        }
      });
    }
  }

  chart = new Chart({
    accessibility: {
      enabled: false
    },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Overview'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: '',
        data: [],
      } as any
    ],
    xAxis: {
      title: {
        text: ''
      }
    },
    yAxis: {
      title: {
        text: ''
      }
    },
  });
}
