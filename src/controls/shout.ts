import { bindingMode } from 'aurelia-binding';
import { bindable, customElement } from 'aurelia-templating';

@customElement('shout')
export default class Shout {
  @bindable({ defaultBindingMode: bindingMode.toView })
  public value: string;
}