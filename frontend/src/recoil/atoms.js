import { atom } from 'recoil';

export const meterUsage = atom({
  key: 'meterUsage',
  default: [],
});

export const paginationData = atom({
  current: 1,
  pageSize: 10,
  total: 0,
});
