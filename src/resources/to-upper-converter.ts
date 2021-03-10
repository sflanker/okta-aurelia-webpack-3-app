export class ToUpperValueConverter {
  toView(value: any): string {
    return typeof value === 'string' ? value.toUpperCase() : value;
  }
}