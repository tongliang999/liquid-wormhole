import Ember from 'ember';

const { A, computed, inject, observer, run } = Ember;

const { service } = inject;
const { alias } = computed;

const LiquidWormhole = Ember.Component.extend({
  to: 'liquid-wormhole',
  targetsTo: 'global',
  classNames: ['liquid-wormhole-container'],

  liquidTarget: alias('to'),
  containerName: alias('targetsTo'),
  liquidTargetService: service('liquid-target'),

  nodes: computed(function() {
    if (this.element) {
      return this.$().children();
    }
  }),

  childWormholes: computed(() => A()),

  liquidTargetDidChange: observer('liquidTarget', function() {
    this.get('liquidTargetService').removeItem(this._target, this);
    this.get('liquidTargetService').appendItem(this._target, this);
  }),

  willRenderx() {
    this._super(...arguments);
    if (!this._didInsert) {
      this._didInsert = true;
      run.schedule('afterRender', () => {
        if (this.isDestroyed) { return; }
        this.didInsertElementx();
      });
    }
  },

  didInsertElement() {
    const parentWormhole = this.nearestOfType(LiquidWormhole);
    const childWormholes = this.get('childWormholes');
    const liquidTargetService = this.get('liquidTargetService');

    this._target = this.get('liquidTarget');

    if (parentWormhole && parentWormhole._state !== 'inDOM') {
      parentWormhole.get('childWormholes').unshiftObject(this);
      parentWormhole.get('childWormholes').unshiftObjects(childWormholes);
    } else {
      liquidTargetService.appendItem(this._target, this);

      childWormholes.forEach((wormhole) => liquidTargetService.appendItem(wormhole._target, wormhole));
    }

    this._super.apply(this, arguments);
  },

  willDestroyElement() {
    this.get('liquidTargetService').removeItem(this._target, this);

    this._super.apply(this, arguments);
  }
});

export default LiquidWormhole;
