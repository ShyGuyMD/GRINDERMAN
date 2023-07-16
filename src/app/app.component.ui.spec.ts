import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    it('should do nothing', async () => {
        await render(AppComponent);
    });
});