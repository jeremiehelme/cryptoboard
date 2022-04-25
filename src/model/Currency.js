export class Currency {
  name;
  total;
  average;
  value;
  inves;
  gain;

  constructor(name, total, average) {
    this.name = name;
    this.total = total;
    this.average = average;
    this.value = this.total * this.average;
  }
}