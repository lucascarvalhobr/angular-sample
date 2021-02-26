import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { LoaderComponent } from 'src/app/shared/misc/miscelaneous/loader/loader.component';

export class LoadingOverlayRef {
    constructor(private overylayRef: OverlayRef) {

    }

    close(): void {
        this.overylayRef.dispose();
    }
}

@Injectable({ providedIn: 'root' })
export class LoaderService {

    constructor(private injector: Injector, private overlay: Overlay) {

    }

    open(): LoadingOverlayRef {
        const overlayRef = this.createOverlay();
        const dialogRef = new LoadingOverlayRef(overlayRef);
        const overlayComponent = this.attachDialogContainer(overlayRef, dialogRef);
        return dialogRef;
    }
    
    private createOverlay(): OverlayRef {
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConflg = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(), 
            positionStrategy
        });

        return this.overlay.create(overlayConflg);
    }

    private attachDialogContainer(overlayRef: OverlayRef, dialogRef: LoadingOverlayRef): LoaderComponent {
        const injector = this.createlnjector(dialogRef);
        const containerPortal = new ComponentPortal(LoaderComponent, null, injector);
        const containerRef: ComponentRef<LoaderComponent> = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }


    private createlnjector(dialogRef: LoadingOverlayRef) : PortalInjector{

        const injectionTokens = new WeakMap();
        injectionTokens.set(LoadingOverlayRef, dialogRef);

        return new PortalInjector(this.injector, injectionTokens);
    }

}