import Vue from 'vue'
import EventMap from '@/components/EventMap'

describe('EventMap.vue', () => {

  it('should render a map', () => {
    const Constructor = Vue.extend(EventMap)
    const vm = new Constructor({
      data () {
        return {
          map: null,
          z: 0,
          center: [0.0, 0.0]
        };
      }
    }).$mount()
    expect(vm.$el.querySelector('map'))
      .toEqual(null)
  });
})
