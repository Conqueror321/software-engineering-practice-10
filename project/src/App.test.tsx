import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Simulate } from 'react-dom/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from './App';

let host: HTMLDivElement;
let root: Root;

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  act(() => root.render(<App />));
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

const status = () => host.querySelector('[role="status"]');
function clickCheck() {
  act(() => host.querySelector('button')!.click());
}
function changeTime(index: number, value: string) {
  const input = host.querySelectorAll<HTMLInputElement>('input[type="datetime-local"]')[index];
  act(() => {
    input.value = value;
    Simulate.change(input);
  });
}

describe('R2 / AC6: form submission and feedback', () => {
  it('provides native form semantics and handles a submit without navigating', () => {
    const form = host.querySelector('form');
    expect(form).not.toBeNull();
    const event = new Event('submit', { bubbles: true, cancelable: true });
    act(() => form!.dispatchEvent(event));
    expect(event.defaultPrevented).toBe(true);
    expect(status()?.textContent).toContain('Available');
  });
  it('retains click submission and polite live feedback', () => {
    expect(status()).toBeNull();
    clickCheck();
    expect(status()?.getAttribute('aria-live')).toBe('polite');
    expect(status()?.textContent).toContain('Available');
    expect(status()?.textContent).toContain('Library Study Room A is free from');
  });
  it.each([
    ['2026-10-27T10:30', '2026-10-27T10:30', 'End time must be after the start time.'],
    ['2026-10-27T09:30', '2026-10-27T10:30', 'That time is already in the past.'],
    ['2026-10-27T12:00', '2026-10-27T14:01', 'Bookings can be at most 2 hours long.'],
    ['2026-10-27T11:00', '2026-10-27T11:15', 'That time overlaps an existing booking.'],
    ['', '2026-10-27T11:00', 'End time must be after the start time.'],
  ])('shows exact feedback for %s to %s', (start, end, reason) => {
    changeTime(0, start);
    changeTime(1, end);
    clickCheck();
    expect(status()?.textContent).toContain('Unavailable');
    expect(status()?.textContent).toContain(reason);
  });
  it.each([0, 1])('clears stale success when date field %s changes', index => {
    clickCheck();
    expect(status()).not.toBeNull();
    changeTime(index, '2026-10-27T10:45');
    expect(status()).toBeNull();
  });
  it('clears stale success when the block flag changes and explains the rejection', () => {
    clickCheck();
    act(() => host.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click());
    expect(status()).toBeNull();
    clickCheck();
    expect(status()?.textContent).toContain('This room is currently blocked and cannot be booked.');
  });
  it('preserves the displayed booking list across repeated checks', () => {
    const before = host.querySelector('ul')!.textContent;
    clickCheck();
    changeTime(0, '2026-10-27T11:00');
    changeTime(1, '2026-10-27T11:15');
    clickCheck();
    expect(host.querySelector('ul')!.textContent).toBe(before);
  });
});
