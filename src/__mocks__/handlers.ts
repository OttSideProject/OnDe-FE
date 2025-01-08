import { http, HttpResponse } from 'msw';
import sections from './data/sections.json';
// const API_DOMAIN = 'http://localhost:3000';

export const handlers = [
  http.get('/api/sections', ({ request }) => {
    console.log('sections', sections);
    return HttpResponse.json(sections);
  }),
];
