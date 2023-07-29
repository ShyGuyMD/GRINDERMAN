import { TestBed, fakeAsync } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { BehaviorSubject } from 'rxjs';

describe('SharedService', () => {
  let service: SharedService;
  let mockSearchResultSubject: BehaviorSubject<any[]>;

  beforeEach(() => {
    mockSearchResultSubject = new BehaviorSubject<any[]>([]);

    TestBed.configureTestingModule({
      providers: [
        SharedService,
        { provide: BehaviorSubject, useValue: mockSearchResultSubject },
      ],
    });
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set search results correctly',  fakeAsync(() => {
    const mockResults = [
      { id: 1, name: 'Result 1' },
      { id: 2, name: 'Result 2' },
    ];

    service.setSearchResults(mockResults);

    service.searchResult$.subscribe((actualResults) => {
        expect(actualResults).toEqual(mockResults);
      });
  }));

  it('should get search results correctly',  fakeAsync(() => {
    const mockResults = [
      { id: 1, name: 'Result 1' },
      { id: 2, name: 'Result 2' },
    ];
    service.setSearchResults(mockResults);
    const results = service.getSearchResults();

    expect(results).toEqual(mockResults);
  }));
});


