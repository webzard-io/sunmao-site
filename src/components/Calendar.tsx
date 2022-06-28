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
    exampleProperties: {},
    annotations: {
      category: 'Advance',
    },
    isDraggable: false,
    isResizable: false,
    exampleSize: [1, 1],
  },
  spec: {
    properties: Type.Object({
      events: Type.Array(
        Type.Object({
          id: Type.String(),
          title: Type.String(),
          start: Type.String(),
          end: Type.String(),
        })
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
        localizer={localizer}
        defaultDate={new Date(2022, 5, 1)}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
});
