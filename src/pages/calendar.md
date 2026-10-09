---
layout: ../layouts/ContentLayout.astro
title: Calendar
sections:
  - color: dark
    blocks:
      - type: text
        text: |
          # Calendar

          See what is happening with HST!
  - color: light
    blocks:
      - type: embed
        embed:
          provider: calendar
          # Replace this with your Google Calendar embed URL.
          src: https://calendar.google.com/calendar/embed?src=c_82mdv15ld5l6snfgmnevijr920%40group.calendar.google.com&ctz=America%2FNew_York
          title: HST events calendar
          size: full
          height: tall
---
