/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/state-tunnel';
import {
  ExpandedFeature,
  Plan,
} from 'types/Plan';
import {
  Collection,
} from 'types/Collection';
import {
  Service,
} from 'types/Service';
import {
  FieldType,
} from './types/Input';
import {
  Option,
  Value,
} from 'types/Select';
import {
  Product,
} from 'types/Product';


export namespace Components {

  interface CustomPlanFeature {
    'feature': ExpandedFeature;
    'planLabel': string;
    'selectedValue': string;
    'setFeature': (label: string, value: string) => void;
  }
  interface CustomPlanFeatureAttributes extends StencilHTMLAttributes {
    'feature'?: ExpandedFeature;
    'planLabel'?: string;
    'selectedValue'?: string;
    'setFeature'?: (label: string, value: string) => void;
  }

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

  interface ManiTunnel {
    'collections': Collection[];
    'featured'?: string;
    'serviceLink'?: string;
    'services': Service[];
  }
  interface ManiTunnelAttributes extends StencilHTMLAttributes {
    'collections'?: Collection[];
    'featured'?: string;
    'serviceLink'?: string;
    'services'?: Service[];
  }

  interface ManifoldMarketplace {
    'collections': Collection[];
    'featured'?: string;
    'serviceLink'?: string;
    'url': string;
  }
  interface ManifoldMarketplaceAttributes extends StencilHTMLAttributes {
    'collections'?: Collection[];
    'featured'?: string;
    'serviceLink'?: string;
    'url'?: string;
  }

  interface ManifoldPlanSelector {
    'productId': string;
  }
  interface ManifoldPlanSelectorAttributes extends StencilHTMLAttributes {
    'productId'?: string;
  }

  interface ManifoldProduct {
    'productLabel': string;
  }
  interface ManifoldProductAttributes extends StencilHTMLAttributes {
    'productLabel'?: string;
  }

  interface MarketplaceCollection {
    'icon'?: string;
    'labels': string;
    'name': string;
    'tagLine': string;
  }
  interface MarketplaceCollectionAttributes extends StencilHTMLAttributes {
    'icon'?: string;
    'labels'?: string;
    'name'?: string;
    'tagLine'?: string;
  }

  interface MarketplaceResults {
    'featured'?: string;
    'serviceLink'?: string;
    'services': Service[];
  }
  interface MarketplaceResultsAttributes extends StencilHTMLAttributes {
    'featured'?: string;
    'serviceLink'?: string;
    'services'?: Service[];
  }

  interface MfBadge {}
  interface MfBadgeAttributes extends StencilHTMLAttributes {}

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

  interface MfInput {
    'max'?: number;
    'min'?: number;
    'name': string;
    'onChange': (e: UIEvent) => void;
    'placeholder': string;
    'required'?: boolean;
    'step'?: number;
    'type': FieldType;
    'value'?: string | number;
  }
  interface MfInputAttributes extends StencilHTMLAttributes {
    'max'?: number;
    'min'?: number;
    'name'?: string;
    'onChange'?: (e: UIEvent) => void;
    'placeholder'?: string;
    'required'?: boolean;
    'step'?: number;
    'type'?: FieldType;
    'value'?: string | number;
  }

  interface MfSelect {
    'name': string;
    'onChange': (e: UIEvent) => void;
    'options': Option[];
    'required'?: boolean;
    'selectedValue'?: Value;
  }
  interface MfSelectAttributes extends StencilHTMLAttributes {
    'name'?: string;
    'onChange'?: (e: UIEvent) => void;
    'options'?: Option[];
    'required'?: boolean;
    'selectedValue'?: Value;
  }

  interface MfSlider {
    'error'?: string;
    'increment': number;
    'max': number;
    'min': number;
    'name': string;
    'onChange': (e: Event) => void;
    'selectedValue': number;
    'suffix': string;
  }
  interface MfSliderAttributes extends StencilHTMLAttributes {
    'error'?: string;
    'increment'?: number;
    'max'?: number;
    'min'?: number;
    'name'?: string;
    'onChange'?: (e: Event) => void;
    'selectedValue'?: number;
    'suffix'?: string;
  }

  interface MfToggle {
    'ariaLabelledby'?: string;
    'disabled'?: boolean;
    'label'?: string;
    'name': string;
  }
  interface MfToggleAttributes extends StencilHTMLAttributes {
    'ariaLabelledby'?: string;
    'disabled'?: boolean;
    'label'?: string;
    'name'?: string;
  }

  interface PlanDetails {
    'plan': Plan;
    'product': Product;
  }
  interface PlanDetailsAttributes extends StencilHTMLAttributes {
    'plan'?: Plan;
    'product'?: Product;
  }

  interface PlanMenu {
    'plans': Plan[];
    'selectPlan': Function;
    'selectedPlanId': string;
  }
  interface PlanMenuAttributes extends StencilHTMLAttributes {
    'plans'?: Plan[];
    'selectPlan'?: Function;
    'selectedPlanId'?: string;
  }

  interface PlanSelector {
    'plans': Plan[];
    'product': Product;
  }
  interface PlanSelectorAttributes extends StencilHTMLAttributes {
    'plans'?: Plan[];
    'product'?: Product;
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
    'isCustom'?: boolean;
    'isFeatured'?: boolean;
    'label'?: string;
    'logo'?: string;
    'name'?: string;
    'serviceLink'?: string;
  }
  interface ServiceCardAttributes extends StencilHTMLAttributes {
    'description'?: string;
    'isCustom'?: boolean;
    'isFeatured'?: boolean;
    'label'?: string;
    'logo'?: string;
    'name'?: string;
    'onManifold-serviceCard-click'?: (event: CustomEvent) => void;
    'serviceLink'?: string;
  }

  interface SortedCategories {
    'observeCategory': (el?: HTMLElement) => void;
  }
  interface SortedCategoriesAttributes extends StencilHTMLAttributes {
    'observeCategory'?: (el?: HTMLElement) => void;
  }

  interface ServiceGrid {}
  interface ServiceGridAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'CustomPlanFeature': Components.CustomPlanFeature;
    'FeaturedService': Components.FeaturedService;
    'ImageGallery': Components.ImageGallery;
    'LinkButton': Components.LinkButton;
    'ManiTunnel': Components.ManiTunnel;
    'ManifoldMarketplace': Components.ManifoldMarketplace;
    'ManifoldPlanSelector': Components.ManifoldPlanSelector;
    'ManifoldProduct': Components.ManifoldProduct;
    'MarketplaceCollection': Components.MarketplaceCollection;
    'MarketplaceResults': Components.MarketplaceResults;
    'MfBadge': Components.MfBadge;
    'MfIcon': Components.MfIcon;
    'MfInput': Components.MfInput;
    'MfSelect': Components.MfSelect;
    'MfSlider': Components.MfSlider;
    'MfToggle': Components.MfToggle;
    'PlanDetails': Components.PlanDetails;
    'PlanMenu': Components.PlanMenu;
    'PlanSelector': Components.PlanSelector;
    'ProductDetails': Components.ProductDetails;
    'ProductPage': Components.ProductPage;
    'ServiceCard': Components.ServiceCard;
    'SortedCategories': Components.SortedCategories;
    'ServiceGrid': Components.ServiceGrid;
  }

  interface StencilIntrinsicElements {
    'custom-plan-feature': Components.CustomPlanFeatureAttributes;
    'featured-service': Components.FeaturedServiceAttributes;
    'image-gallery': Components.ImageGalleryAttributes;
    'link-button': Components.LinkButtonAttributes;
    'mani-tunnel': Components.ManiTunnelAttributes;
    'manifold-marketplace': Components.ManifoldMarketplaceAttributes;
    'manifold-plan-selector': Components.ManifoldPlanSelectorAttributes;
    'manifold-product': Components.ManifoldProductAttributes;
    'marketplace-collection': Components.MarketplaceCollectionAttributes;
    'marketplace-results': Components.MarketplaceResultsAttributes;
    'mf-badge': Components.MfBadgeAttributes;
    'mf-icon': Components.MfIconAttributes;
    'mf-input': Components.MfInputAttributes;
    'mf-select': Components.MfSelectAttributes;
    'mf-slider': Components.MfSliderAttributes;
    'mf-toggle': Components.MfToggleAttributes;
    'plan-details': Components.PlanDetailsAttributes;
    'plan-menu': Components.PlanMenuAttributes;
    'plan-selector': Components.PlanSelectorAttributes;
    'product-details': Components.ProductDetailsAttributes;
    'product-page': Components.ProductPageAttributes;
    'service-card': Components.ServiceCardAttributes;
    'sorted-categories': Components.SortedCategoriesAttributes;
    'service-grid': Components.ServiceGridAttributes;
  }


  interface HTMLCustomPlanFeatureElement extends Components.CustomPlanFeature, HTMLStencilElement {}
  var HTMLCustomPlanFeatureElement: {
    prototype: HTMLCustomPlanFeatureElement;
    new (): HTMLCustomPlanFeatureElement;
  };

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

  interface HTMLManiTunnelElement extends Components.ManiTunnel, HTMLStencilElement {}
  var HTMLManiTunnelElement: {
    prototype: HTMLManiTunnelElement;
    new (): HTMLManiTunnelElement;
  };

  interface HTMLManifoldMarketplaceElement extends Components.ManifoldMarketplace, HTMLStencilElement {}
  var HTMLManifoldMarketplaceElement: {
    prototype: HTMLManifoldMarketplaceElement;
    new (): HTMLManifoldMarketplaceElement;
  };

  interface HTMLManifoldPlanSelectorElement extends Components.ManifoldPlanSelector, HTMLStencilElement {}
  var HTMLManifoldPlanSelectorElement: {
    prototype: HTMLManifoldPlanSelectorElement;
    new (): HTMLManifoldPlanSelectorElement;
  };

  interface HTMLManifoldProductElement extends Components.ManifoldProduct, HTMLStencilElement {}
  var HTMLManifoldProductElement: {
    prototype: HTMLManifoldProductElement;
    new (): HTMLManifoldProductElement;
  };

  interface HTMLMarketplaceCollectionElement extends Components.MarketplaceCollection, HTMLStencilElement {}
  var HTMLMarketplaceCollectionElement: {
    prototype: HTMLMarketplaceCollectionElement;
    new (): HTMLMarketplaceCollectionElement;
  };

  interface HTMLMarketplaceResultsElement extends Components.MarketplaceResults, HTMLStencilElement {}
  var HTMLMarketplaceResultsElement: {
    prototype: HTMLMarketplaceResultsElement;
    new (): HTMLMarketplaceResultsElement;
  };

  interface HTMLMfBadgeElement extends Components.MfBadge, HTMLStencilElement {}
  var HTMLMfBadgeElement: {
    prototype: HTMLMfBadgeElement;
    new (): HTMLMfBadgeElement;
  };

  interface HTMLMfIconElement extends Components.MfIcon, HTMLStencilElement {}
  var HTMLMfIconElement: {
    prototype: HTMLMfIconElement;
    new (): HTMLMfIconElement;
  };

  interface HTMLMfInputElement extends Components.MfInput, HTMLStencilElement {}
  var HTMLMfInputElement: {
    prototype: HTMLMfInputElement;
    new (): HTMLMfInputElement;
  };

  interface HTMLMfSelectElement extends Components.MfSelect, HTMLStencilElement {}
  var HTMLMfSelectElement: {
    prototype: HTMLMfSelectElement;
    new (): HTMLMfSelectElement;
  };

  interface HTMLMfSliderElement extends Components.MfSlider, HTMLStencilElement {}
  var HTMLMfSliderElement: {
    prototype: HTMLMfSliderElement;
    new (): HTMLMfSliderElement;
  };

  interface HTMLMfToggleElement extends Components.MfToggle, HTMLStencilElement {}
  var HTMLMfToggleElement: {
    prototype: HTMLMfToggleElement;
    new (): HTMLMfToggleElement;
  };

  interface HTMLPlanDetailsElement extends Components.PlanDetails, HTMLStencilElement {}
  var HTMLPlanDetailsElement: {
    prototype: HTMLPlanDetailsElement;
    new (): HTMLPlanDetailsElement;
  };

  interface HTMLPlanMenuElement extends Components.PlanMenu, HTMLStencilElement {}
  var HTMLPlanMenuElement: {
    prototype: HTMLPlanMenuElement;
    new (): HTMLPlanMenuElement;
  };

  interface HTMLPlanSelectorElement extends Components.PlanSelector, HTMLStencilElement {}
  var HTMLPlanSelectorElement: {
    prototype: HTMLPlanSelectorElement;
    new (): HTMLPlanSelectorElement;
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

  interface HTMLSortedCategoriesElement extends Components.SortedCategories, HTMLStencilElement {}
  var HTMLSortedCategoriesElement: {
    prototype: HTMLSortedCategoriesElement;
    new (): HTMLSortedCategoriesElement;
  };

  interface HTMLServiceGridElement extends Components.ServiceGrid, HTMLStencilElement {}
  var HTMLServiceGridElement: {
    prototype: HTMLServiceGridElement;
    new (): HTMLServiceGridElement;
  };

  interface HTMLElementTagNameMap {
    'custom-plan-feature': HTMLCustomPlanFeatureElement
    'featured-service': HTMLFeaturedServiceElement
    'image-gallery': HTMLImageGalleryElement
    'link-button': HTMLLinkButtonElement
    'mani-tunnel': HTMLManiTunnelElement
    'manifold-marketplace': HTMLManifoldMarketplaceElement
    'manifold-plan-selector': HTMLManifoldPlanSelectorElement
    'manifold-product': HTMLManifoldProductElement
    'marketplace-collection': HTMLMarketplaceCollectionElement
    'marketplace-results': HTMLMarketplaceResultsElement
    'mf-badge': HTMLMfBadgeElement
    'mf-icon': HTMLMfIconElement
    'mf-input': HTMLMfInputElement
    'mf-select': HTMLMfSelectElement
    'mf-slider': HTMLMfSliderElement
    'mf-toggle': HTMLMfToggleElement
    'plan-details': HTMLPlanDetailsElement
    'plan-menu': HTMLPlanMenuElement
    'plan-selector': HTMLPlanSelectorElement
    'product-details': HTMLProductDetailsElement
    'product-page': HTMLProductPageElement
    'service-card': HTMLServiceCardElement
    'sorted-categories': HTMLSortedCategoriesElement
    'service-grid': HTMLServiceGridElement
  }

  interface ElementTagNameMap {
    'custom-plan-feature': HTMLCustomPlanFeatureElement;
    'featured-service': HTMLFeaturedServiceElement;
    'image-gallery': HTMLImageGalleryElement;
    'link-button': HTMLLinkButtonElement;
    'mani-tunnel': HTMLManiTunnelElement;
    'manifold-marketplace': HTMLManifoldMarketplaceElement;
    'manifold-plan-selector': HTMLManifoldPlanSelectorElement;
    'manifold-product': HTMLManifoldProductElement;
    'marketplace-collection': HTMLMarketplaceCollectionElement;
    'marketplace-results': HTMLMarketplaceResultsElement;
    'mf-badge': HTMLMfBadgeElement;
    'mf-icon': HTMLMfIconElement;
    'mf-input': HTMLMfInputElement;
    'mf-select': HTMLMfSelectElement;
    'mf-slider': HTMLMfSliderElement;
    'mf-toggle': HTMLMfToggleElement;
    'plan-details': HTMLPlanDetailsElement;
    'plan-menu': HTMLPlanMenuElement;
    'plan-selector': HTMLPlanSelectorElement;
    'product-details': HTMLProductDetailsElement;
    'product-page': HTMLProductPageElement;
    'service-card': HTMLServiceCardElement;
    'sorted-categories': HTMLSortedCategoriesElement;
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
