/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  Product,
} from 'types/Product';
import {
  Service,
} from 'types/Service';


export namespace Components {

  interface FeaturedService {
    'logo': string;
    'name': string;
    'serviceColorId': string;
  }
  interface FeaturedServiceAttributes extends StencilHTMLAttributes {
    'logo'?: string;
    'name'?: string;
    'serviceColorId'?: string;
  }

  interface ImageGallery {
    'images': string[];
    'title': string;
  }
  interface ImageGalleryAttributes extends StencilHTMLAttributes {
    'images'?: string[];
    'title'?: string;
  }

  interface LinkButton {
    'href': string;
    'rel'?: string;
    'target'?: string;
  }
  interface LinkButtonAttributes extends StencilHTMLAttributes {
    'href'?: string;
    'rel'?: string;
    'target'?: string;
  }

  interface ManifoldMarketplace {
    'serviceLink'?: string;
    'theme'?: 'light' | 'dark';
  }
  interface ManifoldMarketplaceAttributes extends StencilHTMLAttributes {
    'serviceLink'?: string;
    'theme'?: 'light' | 'dark';
  }

  interface ManifoldProduct {
    'productLabel'?: string;
    'theme'?: 'light' | 'dark';
  }
  interface ManifoldProductAttributes extends StencilHTMLAttributes {
    'productLabel'?: string;
    'theme'?: 'light' | 'dark';
  }

  interface MfIcon {
    /**
    * a CSS variable starting with `--mf-c-*`
    */
    'color': string;
    /**
    * a CSS variable starting with `--mf-g-*`
    */
    'gradient'?: string;
    /**
    * The icon ID
    */
    'icon': string;
    'marginLeft': boolean;
    'marginRight': boolean;
    'title': string;
  }
  interface MfIconAttributes extends StencilHTMLAttributes {
    /**
    * a CSS variable starting with `--mf-c-*`
    */
    'color'?: string;
    /**
    * a CSS variable starting with `--mf-g-*`
    */
    'gradient'?: string;
    /**
    * The icon ID
    */
    'icon'?: string;
    'marginLeft'?: boolean;
    'marginRight'?: boolean;
    'title'?: string;
  }

  interface ProductDetails {
    'product': Product;
  }
  interface ProductDetailsAttributes extends StencilHTMLAttributes {
    'product'?: Product;
  }

  interface ProductPage {
    'product': Product;
  }
  interface ProductPageAttributes extends StencilHTMLAttributes {
    'product'?: Product;
  }

  interface ServiceCard {
    'description'?: string;
    'isFeatured'?: boolean;
    'label'?: string;
    'logo'?: string;
    'name'?: string;
    'serviceLink'?: string;
  }
  interface ServiceCardAttributes extends StencilHTMLAttributes {
    'description'?: string;
    'isFeatured'?: boolean;
    'label'?: string;
    'logo'?: string;
    'name'?: string;
    'onServiceCardClicked'?: (event: CustomEvent) => void;
    'serviceLink'?: string;
  }

  interface ServiceGrid {
    'featured'?: string;
    'serviceLink'?: string;
    'services'?: Service[];
    'showCategoryMenu': boolean;
    'themeColor': { [index: string]: string };
  }
  interface ServiceGridAttributes extends StencilHTMLAttributes {
    'featured'?: string;
    'serviceLink'?: string;
    'services'?: Service[];
    'showCategoryMenu'?: boolean;
    'themeColor'?: { [index: string]: string };
  }
}

declare global {
  interface StencilElementInterfaces {
    'FeaturedService': Components.FeaturedService;
    'ImageGallery': Components.ImageGallery;
    'LinkButton': Components.LinkButton;
    'ManifoldMarketplace': Components.ManifoldMarketplace;
    'ManifoldProduct': Components.ManifoldProduct;
    'MfIcon': Components.MfIcon;
    'ProductDetails': Components.ProductDetails;
    'ProductPage': Components.ProductPage;
    'ServiceCard': Components.ServiceCard;
    'ServiceGrid': Components.ServiceGrid;
  }

  interface StencilIntrinsicElements {
    'featured-service': Components.FeaturedServiceAttributes;
    'image-gallery': Components.ImageGalleryAttributes;
    'link-button': Components.LinkButtonAttributes;
    'manifold-marketplace': Components.ManifoldMarketplaceAttributes;
    'manifold-product': Components.ManifoldProductAttributes;
    'mf-icon': Components.MfIconAttributes;
    'product-details': Components.ProductDetailsAttributes;
    'product-page': Components.ProductPageAttributes;
    'service-card': Components.ServiceCardAttributes;
    'service-grid': Components.ServiceGridAttributes;
  }


  interface HTMLFeaturedServiceElement extends Components.FeaturedService, HTMLStencilElement {}
  var HTMLFeaturedServiceElement: {
    prototype: HTMLFeaturedServiceElement;
    new (): HTMLFeaturedServiceElement;
  };

  interface HTMLImageGalleryElement extends Components.ImageGallery, HTMLStencilElement {}
  var HTMLImageGalleryElement: {
    prototype: HTMLImageGalleryElement;
    new (): HTMLImageGalleryElement;
  };

  interface HTMLLinkButtonElement extends Components.LinkButton, HTMLStencilElement {}
  var HTMLLinkButtonElement: {
    prototype: HTMLLinkButtonElement;
    new (): HTMLLinkButtonElement;
  };

  interface HTMLManifoldMarketplaceElement extends Components.ManifoldMarketplace, HTMLStencilElement {}
  var HTMLManifoldMarketplaceElement: {
    prototype: HTMLManifoldMarketplaceElement;
    new (): HTMLManifoldMarketplaceElement;
  };

  interface HTMLManifoldProductElement extends Components.ManifoldProduct, HTMLStencilElement {}
  var HTMLManifoldProductElement: {
    prototype: HTMLManifoldProductElement;
    new (): HTMLManifoldProductElement;
  };

  interface HTMLMfIconElement extends Components.MfIcon, HTMLStencilElement {}
  var HTMLMfIconElement: {
    prototype: HTMLMfIconElement;
    new (): HTMLMfIconElement;
  };

  interface HTMLProductDetailsElement extends Components.ProductDetails, HTMLStencilElement {}
  var HTMLProductDetailsElement: {
    prototype: HTMLProductDetailsElement;
    new (): HTMLProductDetailsElement;
  };

  interface HTMLProductPageElement extends Components.ProductPage, HTMLStencilElement {}
  var HTMLProductPageElement: {
    prototype: HTMLProductPageElement;
    new (): HTMLProductPageElement;
  };

  interface HTMLServiceCardElement extends Components.ServiceCard, HTMLStencilElement {}
  var HTMLServiceCardElement: {
    prototype: HTMLServiceCardElement;
    new (): HTMLServiceCardElement;
  };

  interface HTMLServiceGridElement extends Components.ServiceGrid, HTMLStencilElement {}
  var HTMLServiceGridElement: {
    prototype: HTMLServiceGridElement;
    new (): HTMLServiceGridElement;
  };

  interface HTMLElementTagNameMap {
    'featured-service': HTMLFeaturedServiceElement
    'image-gallery': HTMLImageGalleryElement
    'link-button': HTMLLinkButtonElement
    'manifold-marketplace': HTMLManifoldMarketplaceElement
    'manifold-product': HTMLManifoldProductElement
    'mf-icon': HTMLMfIconElement
    'product-details': HTMLProductDetailsElement
    'product-page': HTMLProductPageElement
    'service-card': HTMLServiceCardElement
    'service-grid': HTMLServiceGridElement
  }

  interface ElementTagNameMap {
    'featured-service': HTMLFeaturedServiceElement;
    'image-gallery': HTMLImageGalleryElement;
    'link-button': HTMLLinkButtonElement;
    'manifold-marketplace': HTMLManifoldMarketplaceElement;
    'manifold-product': HTMLManifoldProductElement;
    'mf-icon': HTMLMfIconElement;
    'product-details': HTMLProductDetailsElement;
    'product-page': HTMLProductPageElement;
    'service-card': HTMLServiceCardElement;
    'service-grid': HTMLServiceGridElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
