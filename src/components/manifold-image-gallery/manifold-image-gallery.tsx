import { h, Component, Prop, State, FunctionalComponent } from '@stencil/core';
import logger from '../../utils/logger';

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
  @Prop() images?: string[];
  @State() selectedImage?: string;

  selectImage = (image: string) => {
    this.selectedImage = image;
  };

  @logger()
  render() {
    if (Array.isArray(this.images)) {
      if (this.images.length === 0) {
        return null;
      }

      return (
        <div class="container">
          <p class="heading">
            <slot />
          </p>
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
                    isSelected={this.selectedImage ? this.selectedImage === image : i === 0}
                    onClick={this.selectImage}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    // 💀

    return (
      <div class="container">
        <div class="image-large">
          <div class="large-inner">
            <manifold-skeleton-img />
          </div>
        </div>
        <div class="menu-scroll">
          <ul class="menu" style={{ '--item-count': `4` }}>
            {[1, 2, 3, 4].map(() => (
              <li class="menu-item">
                <div class="skeleton-img">
                  <manifold-skeleton-img />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
