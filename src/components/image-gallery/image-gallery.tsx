import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'image-gallery',
  styleUrl: 'image-gallery.css',
  shadow: true,
})
export class ImageGallery {
  @Prop() title: string;
  @Prop() images: string[];
  @State() currentImage: number = 0;

  render() {
    return (
      <div class="container">
        <figcaption>{this.title}</figcaption>
        <img src={this.images[0]} alt="" />
      </div>
    );
  }
}
