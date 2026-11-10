"""Run from repo root with Vite servers on 5190/5191 and gstack browse installed.
Set BROWSE_BIN and BROWSE_STATE_FILE. All browser work goes through gstack.
"""
from pathlib import Path
import json
import os
import subprocess

ROOT = Path(__file__).resolve().parent.parent
LOG, RESULTS = [], []


def browse(*args):
    proc = subprocess.run([os.environ['BROWSE_BIN'], *args], capture_output=True, text=True)
    LOG.append('$ browse ' + ' '.join(args) + '\n' + proc.stdout + proc.stderr
               + f'EXIT_CODE={proc.returncode}\n')
    if proc.returncode:
        raise RuntimeError(proc.stdout + proc.stderr)
    return proc.stdout.strip()


def verify(name, expression):
    observed = browse('js', expression)
    passed = observed == 'true'
    RESULTS.append(dict(check=name, passed=passed, observed=observed))
    if not passed:
        raise AssertionError(f'{name}: {observed}')


def times(start, end):
    for index, value in enumerate([start, end]):
        browse('fill', f'input[type="datetime-local"] >> nth={index}', '2026-10-27T' + value)


try:
    for name, port in [('before', 5190), ('after', 5191)]:
        browse('goto', f'http://127.0.0.1:{port}/')
        browse('fill', 'input[type="datetime-local"] >> nth=1', '2026-10-27T11:00')
        browse('press', 'Enter')
        if name == 'before':
            verify('before: Enter produces no feedback (R2 reproduction)',
                   'document.querySelector("[role=status]") === null')
            browse('click', 'button')
        else:
            verify('after: Enter produces Available',
                   'document.querySelector("[role=status]")?.textContent.includes("Available") === true')
        for size, layout in [('1440x1000', 'desktop'), ('390x844', 'mobile')]:
            browse('viewport', size)
            verify(f'{name}: {layout} has no horizontal overflow',
                   'document.documentElement.scrollWidth <= window.innerWidth')
            browse('screenshot', str(ROOT / 'screenshots' / f'{name}-{layout}.png'))
    for start, end, reason in [
        ('10:30', '10:30', 'End time must be after the start time.'),
        ('10:45', '10:30', 'End time must be after the start time.'),
        ('09:30', '10:30', 'That time is already in the past.'),
        ('12:00', '14:01', 'Bookings can be at most 2 hours long.'),
        ('11:00', '11:15', 'That time overlaps an existing booking.'),
        ('12:00', '14:00', 'Available'),
        ('11:30', '12:00', 'Available'),
    ]:
        times(start, end)
        verify(f'after: edits clear stale feedback ({start}/{end})',
               'document.querySelector("[role=status]") === null')
        browse('press', 'Enter')
        verify(f'after: {start}/{end}: {reason}',
               'document.querySelector("[role=status]")?.textContent.includes(' + json.dumps(reason) + ') === true')
    browse('click', 'input[type="checkbox"]')
    verify('after: block toggle clears stale feedback', 'document.querySelector("[role=status]") === null')
    browse('click', 'button')
    verify('after: blocked message', 'document.querySelector("[role=status]")?.textContent.includes("This room is currently blocked and cannot be booked.") === true')
    verify('after: polite status region', 'document.querySelector("[role=status]")?.getAttribute("aria-live") === "polite"')
    browse('screenshot', str(ROOT / 'screenshots/after-mobile-blocked.png'))
    browse('viewport', '1440x1000')
    browse('screenshot', str(ROOT / 'screenshots/after-desktop-blocked.png'))
    browse('console', '--errors')
    browse('network')
finally:
    (ROOT / 'evidence/ui-commands.txt').write_text('\n'.join(LOG))
    (ROOT / 'evidence/ui-results.json').write_text(json.dumps(RESULTS, indent=2) + '\n')
    print(json.dumps(RESULTS, indent=2))
