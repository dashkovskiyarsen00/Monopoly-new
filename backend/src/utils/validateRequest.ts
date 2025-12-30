import { ApiError } from './errorHandler';

export const requireFields = (payload: Record<string, unknown>, fields: string[]): void => {
  const missing = fields.filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === '');
  if (missing.length) {
    throw new ApiError(`Missing fields: ${missing.join(', ')}`, 400);
  }
};
