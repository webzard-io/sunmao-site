import { implementRuntimeComponent } from '@sunmao-ui/runtime';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Type } from '@sinclair/typebox';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { css } from '@emotion/css';

const localizer = momentLocalizer(moment);

export const SunmaoCalendar = implementRuntimeComponent({
  version: 'site/v1',
  metadata: {
    name: 'calendar',
    displayName: 'Calendar',
    exampleProperties: {
      events: [],
    },
    annotations: {
      category: 'Advance',
    },
  },
  spec: {
    properties: Type.Object({
      events: Type.Array(
        Type.Object(
          {
            id: Type.String(),
            title: Type.String(),
            start: Type.String(),
            end: Type.String(),
          },
          {
            title: 'Events',
            widget: 'array',
          }
        )
      ),
    }),
    state: Type.Object({}),
    methods: {},
    slots: {},
    styleSlots: ['content'],
    events: [],
  },
})(props => {
  const { events, elementRef, customStyle } = props;

  return (
    <div ref={elementRef} className={css(customStyle?.content)}>
      <Calendar
        toolbar={false}
        localizer={localizer}
        defaultDate={new Date(2022, 5, 1)}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
});
