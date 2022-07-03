import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
const localizer = momentLocalizer(moment);
const SunmaoCalendar = implementRuntimeComponent({
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
    styleSlots: [],
    events: [],
  },
})(({ elementRef }) => {
  return (
    <Calendar
      ref={elementRef}
      localizer={localizer}
      defaultDate={new Date(2022, 5, 1)}
      events={[]}
      endAccessor="end"
    />
  );
});
