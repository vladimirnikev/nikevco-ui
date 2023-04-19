import { TestBed } from '@angular/core/testing';

import { NikevcoUiService } from './nikevco-ui.service';

describe('NikevcoUiService', () => {
  let service: NikevcoUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NikevcoUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
