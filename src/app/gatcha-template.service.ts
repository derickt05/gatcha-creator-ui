import { Injectable } from '@angular/core';
import { CardTemplate } from './models/card-template.model';
import { TEMPLATES } from './models/mock-card-template';

@Injectable({
  providedIn: 'root'
})
export class GatchaTemplateService {
  constructor() { }

  // Mocked until templates are stored in database or file.
  returnTemplates(): CardTemplate[] {
    return TEMPLATES;
  }
}
