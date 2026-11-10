import { describe, expect, it } from 'vitest';
import { isAvailable } from './availability';

const valid = { start: 100, end: 200, now: 50, bookings: [] };

describe('R1: non-finite request and clock values fail closed', () => {
  for (const field of ['start', 'end', 'now'] as const) {
    it.each([NaN, Infinity, -Infinity])(`rejects ${field}=%s`, value => {
      expect(isAvailable({ ...valid, [field]: value }))
        .toEqual({ available: false, reason: 'invalid_range' });
    });
  }
  it('still accepts a finite request at exactly now', () => {
    expect(isAvailable({ ...valid, start: valid.now })).toEqual({ available: true });
  });
});
