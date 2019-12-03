import { Directive, Input, ComponentFactory, ComponentRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';

@Directive({
  selector: '[appLoadingSpinner]'
})
export class LoadingSpinnerDirective {
  loadingFactory: ComponentFactory<LoadingComponent>;
  loadingComponent: ComponentRef<LoadingComponent>;

  @Input()
  set appLoadingSpinner(loading: boolean) {

    this.vcRef.clear();

    if (loading) {
      this.loadingComponent = this.vcRef.createComponent(this.loadingFactory);
    } else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
  }

}
