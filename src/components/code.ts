const NameCode = `const SunmaoCalendar = implementRuntimeComponent({
  version: 'site/v1',
  metadata: {
    name: 'calendar',
    displayName: 'Calendar',
  },
  spec: {
    properties: Type.Object({}),
    state: Type.Object({}),
    methods: {},
    slots: {},
    styleSlots: ['content'],
    events: [],
  },
})({ events, elementRef, customStyle } => {
  return (
    <div ref={elementRef} className={css(customStyle?.content)}>
      {/* Here will be calendar */}
    </div>
  );
});

`;
const PropertiesCode = `const SunmaoCalendar = implementRuntimeComponent({
  version: 'site/v1',
  metadata: {
    name: 'calendar',
    displayName: 'Calendar',
  },
  spec: {
    properties: Type.Object({
      events: Type.Array(
        Type.Object({
          id: Type.String(),
          title: Type.String(),
          start: Type.String(),
          end: Type.String(),
        }),
        {
          title: 'Events',
          widget: 'core/v1/array',
          category: 'Basic',
          widgetOptions: {
            displayedKeys: ['title'],
          },
        }
      ),
    }),
    state: Type.Object({}),
    methods: {},
    slots: {},
    styleSlots: ['content'],
    events: [],
  },
})({ events, elementRef, customStyle } => {
  return (
    <div ref={elementRef} className={css(customStyle?.content)}>
      {/* Here will be calendar */}
    </div>
  );
});
`;

const CalendarCode = `import { Calendar } from 'react-big-calendar';

const SunmaoCalendar = implementRuntimeComponent({
  version: 'site/v1',
  metadata: {
    name: 'calendar',
    displayName: 'Calendar',
  },
  spec: {
    properties: Type.Object({
      events: Type.Array(
        Type.Object({
          id: Type.String(),
          title: Type.String(),
          start: Type.String(),
          end: Type.String(),
        }),
        {
          title: 'Events',
          widget: 'core/v1/array',
          category: 'Basic',
          widgetOptions: {
            displayedKeys: ['title'],
          },
        }
      ),
    }),
    state: Type.Object({}),
    methods: {},
    slots: {},
    styleSlots: ['content'],
    events: [],
  },
})({ events, elementRef, customStyle } => {
  return (
    <div ref={elementRef} className={css(customStyle?.content)}>
      <Calendar
        localizer={localizer}
        defaultDate={new Date(2022, 5, 1)}
        events={events}
        endAccessor="end"
      />
    </div>
  );
});
`;

export const codes = [NameCode, PropertiesCode, CalendarCode];
