// src/api/core/index.ts
import axios, { AxiosResponse, AxiosError } from 'axios';
export { default as Api } from './Api';
export { PublicApi } from './PublicApi';
export { AxiosHeaders, isAxiosError } from 'axios';

// 타입 재익스포트
export type { AxiosResponse, AxiosError };
