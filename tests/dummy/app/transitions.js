import { target, onOpenWormhole } from 'liquid-wormhole';

export default function() {
  this.transition(
    target('hello-drawer'),
    onOpenWormhole(),
    this.use('to-left', { duration: 400, easing: [200, 22] }),
    this.reverse('to-right', { duration: 400, easing: [200, 22] })
  );

  this.transition(
    target('flyout'),
    onOpenWormhole(),
    this.use('explode', {
      pick: '.flyout',
        use: ['to-left', { duration: 400, easing: [200, 22] }]
    }, {
      pick: '.modal-backdrop',
      use: 'fade'
    }),
    this.reverse('explode', {
      pick: '.flyout',
      use: ['to-right', { duration: 400, easing: [200, 22] }]
    }, {
      pick: '.modal-backdrop',
      use: 'fade'
    })
  );
}
