import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { apiServiceMock } from '@core/mocks/api.service.mock';
import { WooCommerceApiService } from '../woo-commerce';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';
import { UserRole } from '@shared/constants';
import { Admin, Client, User } from '@core/models/user';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;

  let _wooCommerceApiService: WooCommerceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock },
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    _wooCommerceApiService = TestBed.inject(WooCommerceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
/*
  describe('setUserData', () => {
    it('should set activeUser correctly', () => {
      const user: User = { email: 'test@example.com', role: UserRole.CLIENT };
      service.setUserData(user);

      expect(service['activeUser']).toEqual(user);
    });
  });

  describe('getUserData', () => {
    it('should return undefined when activeUser is not set', () => {
      expect(service.getUserData()).toBeUndefined();
    });

    it('should return the activeUser when it is set', () => {
      const user = { email: 'test@example.com', role: UserRole.CLIENT };
      service['activeUser'] = user;

      expect(service.getUserData()).toEqual(user);
    });
  });

  describe('getUserName', () => {
    it('should return an empty string when activeUser is not set', () => {
      // Act & Assert
      expect(service.getUserName()).toBe('');
    });

    it('should return the email of the activeUser when it is set', () => {
      // Arrange
      const user = { email: 'test@example.com', role: UserRole.CLIENT };
      service.setUserData(user);

      // Act & Assert
      expect(service.getUserName()).toBe(user.email);
    });
  });

  describe('registerClient', () => {
    it('should call the postCustomer method of WooCommerceApiService with correct data', () => {
      const client: Client = {
        email: 'client@example.com',
        password: 'clientPassword',
        role: UserRole.CLIENT,
      };
      const bodyRequest = {
        email: client.email,
        password: client.password,
        role: UserRole.CLIENT,
      };
      (<jest.Mock>_wooCommerceApiService.postCustomer).mockReturnValue(of({}));

      service.registerClient(client).subscribe();

      expect(_wooCommerceApiService.postCustomer).toHaveBeenCalledWith(
        bodyRequest
      );
    });
  });

  describe('registerAdministrator', () => {
    it('should call the postCustomer method of WooCommerceApiService with correct data', () => {
      const admin: Admin = {
        email: 'admin@example.com',
        password: 'adminPassword',
        role: UserRole.ADMIN,
      };
      const bodyRequest = {
        email: admin.email,
        password: admin.password,
        role: UserRole.ADMIN,
      };
      (<jest.Mock>_wooCommerceApiService.postCustomer).mockReturnValue(of({}));

      service.registerAdministrator(admin).subscribe();

      expect(_wooCommerceApiService.postCustomer).toHaveBeenCalledWith(
        bodyRequest
      );
    });
  });

  describe('encryptPassword', () => {
    it('should encrypt the password correctly', () => {
      const password = 'testPassword';

      const encryptedPassword = service['encryptPassword'](password);

      expect(encryptedPassword).toBe(password);
    });
  });
  */
});
