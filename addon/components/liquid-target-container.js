import Ember from 'ember';
import layout from '../templates/components/liquid-target-container';

const { inject, computed } = Ember;
const { service } = inject;

export default Ember.Component.extend({
  layout: layout,
  name: "global",
  classNames: ['liquid-target-container'],
  classNameBindings: ['hasTargets'],

  hasTargets: computed.bool('liquidTargetService.targets.length'),
  targets: computed('liquidTargetService.targets.[]', 'name', function() {
    let targets = this.get('liquidTargetService.targets');
    return targets.filterBy('containerName', this.get('name') || 'global');
  }),
  liquidTargetService: service('liquid-target')
});
