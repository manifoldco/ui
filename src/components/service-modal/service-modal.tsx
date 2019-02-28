import { Component, Element, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'service-modal',
  styleUrl: 'service-modal.css',
  shadow: true,
})
export class ServiceModal {
  @Element() modalEl: HTMLElement;

  @Prop() title: string;
  @Prop() content?: string;
  @Prop({
    mutable: true,
    reflectToAttr: true,
  })
  @State()
  showPopup = false;

  @Event()
  private ok: EventEmitter;

  private handleOkClick = () => {
    this.showPopup = false;
    this.ok.emit();
  };

  render() {
    return (
      <div>
        <div class={this.showPopup ? 'service-modal-wrapper visible' : 'service-modal-wrapper'}>
          <div class="service-modal">
            <div class="service-modal-header">
              <span>{this.title}</span>
            </div>
            <div class="service-modal-content">{this.content}</div>
            <div class="service-modal-footer">
              <button class="service-modal-ok" onClick={this.handleOkClick}>
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
