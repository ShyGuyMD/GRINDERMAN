import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleTemplateComponent } from './style-template.component';

describe('StyleTemplateComponent', () => {
    let component: StyleTemplateComponent;
    let fixture: ComponentFixture<StyleTemplateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StyleTemplateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(StyleTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
