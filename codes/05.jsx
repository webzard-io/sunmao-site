import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
const localizer = momentLocalizer(moment);
import { css } from '@emotion/css';
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
})(({ elementRef, events, customStyle }) => {
  return (
    <Calendar
      className={css(customStyle?.content)}
      ref={elementRef}
      localizer={localizer}
      defaultDate={new Date(2022, 5, 1)}
      events={events}
      endAccessor="end"
    />
  );
});
