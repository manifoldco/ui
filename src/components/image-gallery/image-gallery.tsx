import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'image-gallery',
  styleUrl: 'image-gallery.css',
  shadow: true,
})
export class ImageGallery {
  @Prop() title: string;
  @Prop() images: string[] = [''];
  @State() selectedImage?: string;

  private selectImage(image: string) {
    this.selectedImage = image;
  }

  render() {
    return (
      <div class="container">
        <p class="heading">{this.title}</p>
        <div class="image-large">
          <div class="large-inner">
            <img src={this.selectedImage || this.images[0]} alt="" data-test="display-image" />
          </div>
        </div>
        <div class="menu-scroll">
          <ul class="menu" style={{ '--item-count': `${this.images.length}` }}>
            {this.images.map((image, i) => (
              <li class="menu-item">
                <button
                  class="image-wrapper"
                  data-selected={this.selectedImage === image}
                  onClick={() => this.selectImage(image)}
                >
                  <img
                    class="image-button"
                    src={image}
                    alt={`Screenshot ${i + 1}`}
                    data-test="thumbnail"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
