import { TestBed } from '@angular/core/testing';

import { GatchaTemplateService } from './gatcha-template.service';

describe('GatchaTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GatchaTemplateService = TestBed.get(GatchaTemplateService);
    expect(service).toBeTruthy();
  });
});
