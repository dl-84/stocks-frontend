import { Component, Input, Output } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { StockLiveDataDto } from '../core/dto/stockLiveDataDto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent {
  @Input() stockLiveData: Array<StockLiveDataDto>;

  private width: number;
  private height: number;

  private marginTop: number;
  private marginRight: number;
  private marginBottom: number;
  private marginLeft: number;

  private svg: any;
  private x: any;
  private y: any;
  private line: any;

  constructor() {
    this.marginTop = 20;
    this.marginRight = 40;
    this.marginBottom = 20;
    this.marginLeft = 20;

    this.width = 380 - this.marginLeft - this.marginRight;
    this.height = 300 - this.marginTop - this.marginBottom;
  }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }

  private initSvg() {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.marginLeft + ',' + this.marginTop + ')');
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);

    this.x.domain(d3Array.extent(this.stockLiveData, (d) => d.timestamp));
    this.y.domain(d3Array.extent(this.stockLiveData, (d) => d.lastPrice));
  }

  private drawAxis() {
    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.timestamp))
      .y((d: any) => this.y(d.lastPrice));

    this.svg.append('path')
      .datum(this.stockLiveData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2.0)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", this.line);
  }
}