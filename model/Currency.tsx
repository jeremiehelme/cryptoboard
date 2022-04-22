export class Currency {
  name: string;
  total: number;
  average: number;
  value: number;
  invest: number;
  gain: number;

  constructor(name: string, total: number, average: number) {
    this.name = name;
    this.total = total;
    this.average = average;
    this.value = this.total * this.average;
  }
}