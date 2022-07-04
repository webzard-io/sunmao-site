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
})(() => {
  return <div>Calendar Placeholder</div>;
});
