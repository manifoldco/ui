import { Component, Prop, State, FunctionalComponent } from '@stencil/core';

interface ThumbnailProps {
  src: string;
  alt: string;
  isSelected?: boolean;
  onClick: (image: string) => void;
}
const Thumbnail: FunctionalComponent<ThumbnailProps> = ({ isSelected, onClick, ...rest }) => (
  <li class="menu-item">
    <button class="image-wrapper" data-selected={isSelected} onClick={() => onClick(rest.src)}>
      <img class="image-button" {...rest} data-test="thumbnail" />
    </button>
  </li>
);

@Component({
  tag: 'manifold-image-gallery',
  styleUrl: 'image-gallery.css',
  shadow: true,
})
export class ImageGallery {
  @Prop() title: string;
  @Prop() images: string[] = [];
  @State() selectedImage?: string;

  selectImage = (image: string) => {
    this.selectedImage = image;
  };

  render() {
    return (
      <div class="container">
        <p class="heading">{this.title}</p>
        <div class="image-large">
          <div class="large-inner">
            <img src={this.selectedImage || this.images[0]} alt="" data-test="display-image" />
          </div>
        </div>
        {this.images.length > 1 && (
          <div class="menu-scroll">
            <ul class="menu" style={{ '--item-count': `${this.images.length}` }}>
              {this.images.map((image, i) => (
                <Thumbnail
                  src={image}
                  alt={`Screenshot ${i + 1}`}
                  isSelected={this.selectedImage === image}
                  onClick={this.selectImage}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
