/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/state-tunnel';
import {
  Connection,
} from './utils/connections';
import {
  Option,
} from 'types/Select';


export namespace Components {

  interface ManifoldActivePlan {
    'hideCta'?: boolean;
    'isExistingResource'?: boolean;
    'linkFormat'?: string;
    'plans': Catalog.ExpandedPlan[];
    'product'?: Catalog.ExpandedProduct;
  }
  interface ManifoldActivePlanAttributes extends StencilHTMLAttributes {
    'hideCta'?: boolean;
    'isExistingResource'?: boolean;
    'linkFormat'?: string;
    'plans'?: Catalog.ExpandedPlan[];
    'product'?: Catalog.ExpandedProduct;
  }

  interface ManifoldBadge {}
  interface ManifoldBadgeAttributes extends StencilHTMLAttributes {}

  interface ManifoldConnection {
    /**
    * _(optional)_ Specify `env="stage"` for staging
    */
    'env': 'stage' | 'prod';
  }
  interface ManifoldConnectionAttributes extends StencilHTMLAttributes {
    /**
    * _(optional)_ Specify `env="stage"` for staging
    */
    'env'?: 'stage' | 'prod';
  }

  interface ManifoldCostDisplay {
    'baseCost'?: number;
    'compact'?: boolean;
    'isCustomizable'?: boolean;
    'measuredCosts': [number, string][];
  }
  interface ManifoldCostDisplayAttributes extends StencilHTMLAttributes {
    'baseCost'?: number;
    'compact'?: boolean;
    'isCustomizable'?: boolean;
    'measuredCosts'?: [number, string][];
  }

  interface ManifoldDataProductLogo {
    /**
    * _(optional)_ `alt` attribute
    */
    'alt'?: string;
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection': Connection;
    /**
    * URL-friendly slug (e.g. `"jawsdb-mysql"`)
    */
    'productLabel': string;
  }
  interface ManifoldDataProductLogoAttributes extends StencilHTMLAttributes {
    /**
    * _(optional)_ `alt` attribute
    */
    'alt'?: string;
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection'?: Connection;
    /**
    * URL-friendly slug (e.g. `"jawsdb-mysql"`)
    */
    'productLabel'?: string;
  }

  interface ManifoldDataProductName {
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection': Connection;
    /**
    * URL-friendly slug (e.g. `"jawsdb-mysql"`)
    */
    'productLabel': string;
  }
  interface ManifoldDataProductNameAttributes extends StencilHTMLAttributes {
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection'?: Connection;
    /**
    * URL-friendly slug (e.g. `"jawsdb-mysql"`)
    */
    'productLabel'?: string;
  }

  interface ManifoldFeaturedService {
    'logo': string;
    'name': string;
    'productGradient': string;
  }
  interface ManifoldFeaturedServiceAttributes extends StencilHTMLAttributes {
    'logo'?: string;
    'name'?: string;
    'productGradient'?: string;
  }

  interface ManifoldIcon {
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
  interface ManifoldIconAttributes extends StencilHTMLAttributes {
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

  interface ManifoldImageGallery {
    'images': string[];
    'title': string;
  }
  interface ManifoldImageGalleryAttributes extends StencilHTMLAttributes {
    'images'?: string[];
    'title'?: string;
  }

  interface ManifoldLazyImage {
    'alt': string;
    'itemprop': string;
    'src': string;
  }
  interface ManifoldLazyImageAttributes extends StencilHTMLAttributes {
    'alt'?: string;
    'itemprop'?: string;
    'src'?: string;
  }

  interface ManifoldLinkButton {
    'href'?: string;
    'onClick'?: (e: Event) => void;
    'rel'?: string;
    'target'?: string;
  }
  interface ManifoldLinkButtonAttributes extends StencilHTMLAttributes {
    'href'?: string;
    'onClick'?: (e: Event) => void;
    'rel'?: string;
    'target'?: string;
  }

  interface ManifoldMarketplaceGrid {
    'blacklist'?: string[];
    'featured'?: string[];
    'hideCategories'?: boolean;
    'hideTemplates'?: boolean;
    'linkFormat'?: string;
    'services'?: Catalog.Product[];
    'whitelist'?: string[];
  }
  interface ManifoldMarketplaceGridAttributes extends StencilHTMLAttributes {
    'blacklist'?: string[];
    'featured'?: string[];
    'hideCategories'?: boolean;
    'hideTemplates'?: boolean;
    'linkFormat'?: string;
    'services'?: Catalog.Product[];
    'whitelist'?: string[];
  }

  interface ManifoldMarketplace {
    /**
    * Comma-separated list of hidden products (labels)
    */
    'blacklist'?: string;
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection': Connection;
    /**
    * Comma-separated list of featured products (labels)
    */
    'featured'?: string;
    /**
    * Hide categories & side menu?
    */
    'hideCategories'?: boolean;
    /**
    * Hide template cards?
    */
    'hideTemplates'?: boolean;
    /**
    * Link format structure, with `:product` placeholder
    */
    'linkFormat'?: string;
    /**
    * Comma-separated list of allowed products (labels)
    */
    'whitelist'?: string;
  }
  interface ManifoldMarketplaceAttributes extends StencilHTMLAttributes {
    /**
    * Comma-separated list of hidden products (labels)
    */
    'blacklist'?: string;
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection'?: Connection;
    /**
    * Comma-separated list of featured products (labels)
    */
    'featured'?: string;
    /**
    * Hide categories & side menu?
    */
    'hideCategories'?: boolean;
    /**
    * Hide template cards?
    */
    'hideTemplates'?: boolean;
    /**
    * Link format structure, with `:product` placeholder
    */
    'linkFormat'?: string;
    /**
    * Comma-separated list of allowed products (labels)
    */
    'whitelist'?: string;
  }

  interface ManifoldNumberInput {
    'decrementDisabledLabel'?: string;
    'error'?: string;
    'increment': number;
    'incrementDisabledLabel'?: string;
    'max': number;
    'min': number;
    'name': string;
    'suffix': string;
    'value': number;
  }
  interface ManifoldNumberInputAttributes extends StencilHTMLAttributes {
    'decrementDisabledLabel'?: string;
    'error'?: string;
    'increment'?: number;
    'incrementDisabledLabel'?: string;
    'max'?: number;
    'min'?: number;
    'name'?: string;
    'onUpdateValue'?: (event: CustomEvent) => void;
    'suffix'?: string;
    'value'?: number;
  }

  interface ManifoldPlanCost {
    'allFeatures': Catalog.ExpandedFeature[];
    'compact'?: boolean;
    'connection': Connection;
    'customizable'?: boolean;
    'planId': string;
    'selectedFeatures': UserFeatures;
  }
  interface ManifoldPlanCostAttributes extends StencilHTMLAttributes {
    'allFeatures'?: Catalog.ExpandedFeature[];
    'compact'?: boolean;
    'connection'?: Connection;
    'customizable'?: boolean;
    'planId'?: string;
    'selectedFeatures'?: UserFeatures;
  }

  interface ManifoldPlanDetails {
    'hideCta'?: boolean;
    'isExistingResource'?: boolean;
    'linkFormat'?: string;
    'plan'?: Catalog.ExpandedPlan;
    'product'?: Catalog.Product;
  }
  interface ManifoldPlanDetailsAttributes extends StencilHTMLAttributes {
    'hideCta'?: boolean;
    'isExistingResource'?: boolean;
    'linkFormat'?: string;
    'onManifold-planSelector-change'?: (event: CustomEvent) => void;
    'onManifold-planSelector-click'?: (event: CustomEvent) => void;
    'onManifold-planSelector-load'?: (event: CustomEvent) => void;
    'plan'?: Catalog.ExpandedPlan;
    'product'?: Catalog.Product;
  }

  interface ManifoldPlanMenu {
    'plans': Catalog.ExpandedPlan[];
    'selectPlan': Function;
    'selectedPlanId': string;
  }
  interface ManifoldPlanMenuAttributes extends StencilHTMLAttributes {
    'plans'?: Catalog.ExpandedPlan[];
    'selectPlan'?: Function;
    'selectedPlanId'?: string;
  }

  interface ManifoldPlanSelector {
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection': Connection;
    /**
    * _(optional)_ Hide CTA?
    */
    'hideCta'?: boolean;
    /**
    * _(optional)_ Link format structure, with `:product`, `:plan`, and `:features` placeholders
    */
    'linkFormat'?: string;
    /**
    * URL-friendly slug (e.g. `"jawsdb-mysql"`)
    */
    'productLabel': string;
    /**
    * _(optional)_ Is this modifying an existing resource?
    */
    'resourceId'?: string;
  }
  interface ManifoldPlanSelectorAttributes extends StencilHTMLAttributes {
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection'?: Connection;
    /**
    * _(optional)_ Hide CTA?
    */
    'hideCta'?: boolean;
    /**
    * _(optional)_ Link format structure, with `:product`, `:plan`, and `:features` placeholders
    */
    'linkFormat'?: string;
    /**
    * URL-friendly slug (e.g. `"jawsdb-mysql"`)
    */
    'productLabel'?: string;
    /**
    * _(optional)_ Is this modifying an existing resource?
    */
    'resourceId'?: string;
  }

  interface ManifoldProductDetails {
    'product'?: Catalog.ExpandedProduct;
  }
  interface ManifoldProductDetailsAttributes extends StencilHTMLAttributes {
    'product'?: Catalog.ExpandedProduct;
  }

  interface ManifoldProductPage {
    'hideCta'?: boolean;
    'linkFormat'?: string;
    'product'?: Catalog.ExpandedProduct;
    'provider'?: Catalog.Provider;
  }
  interface ManifoldProductPageAttributes extends StencilHTMLAttributes {
    'hideCta'?: boolean;
    'linkFormat'?: string;
    'onManifold-productCTA-click'?: (event: CustomEvent) => void;
    'product'?: Catalog.ExpandedProduct;
    'provider'?: Catalog.Provider;
  }

  interface ManifoldProduct {
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection': Connection;
    /**
    * _(optional)_ Hide the CTA on the left?
    */
    'hideCta'?: boolean;
    /**
    * _(optional)_ Link format structure, with `:product` placeholder
    */
    'linkFormat'?: string;
    /**
    * URL-friendly slug (e.g. `"jawsdb-mysql"`)
    */
    'productLabel': string;
  }
  interface ManifoldProductAttributes extends StencilHTMLAttributes {
    /**
    * _(hidden)_ Passed by `<manifold-connection>`
    */
    'connection'?: Connection;
    /**
    * _(optional)_ Hide the CTA on the left?
    */
    'hideCta'?: boolean;
    /**
    * _(optional)_ Link format structure, with `:product` placeholder
    */
    'linkFormat'?: string;
    /**
    * URL-friendly slug (e.g. `"jawsdb-mysql"`)
    */
    'productLabel'?: string;
  }

  interface ManifoldSelect {
    'defaultValue'?: string;
    'name': string;
    'options': Option[];
    'required'?: boolean;
  }
  interface ManifoldSelectAttributes extends StencilHTMLAttributes {
    'defaultValue'?: string;
    'name'?: string;
    'onUpdateValue'?: (event: CustomEvent) => void;
    'options'?: Option[];
    'required'?: boolean;
  }

  interface ManifoldServiceCard {
    'connection': Connection;
    'description'?: string;
    'isFeatured'?: boolean;
    'label'?: string;
    'linkFormat'?: string;
    'logo'?: string;
    'name'?: string;
    'productId'?: string;
  }
  interface ManifoldServiceCardAttributes extends StencilHTMLAttributes {
    'connection'?: Connection;
    'description'?: string;
    'isFeatured'?: boolean;
    'label'?: string;
    'linkFormat'?: string;
    'logo'?: string;
    'name'?: string;
    'onManifold-marketplace-click'?: (event: CustomEvent) => void;
    'productId'?: string;
  }

  interface ManifoldTemplateCard {
    'category': string;
    'linkFormat'?: string;
  }
  interface ManifoldTemplateCardAttributes extends StencilHTMLAttributes {
    'category'?: string;
    'linkFormat'?: string;
    'onManifold-template-click'?: (event: CustomEvent) => void;
  }

  interface ManifoldToast {
    /**
    * `success` | `warning` | `error`
    */
    'alertType'?: 'success' | 'warning' | 'error' | undefined;
    /**
    * Is this dismissable?
    */
    'dismissable'?: boolean;
    /**
    * Use custom icon path data (1024×1024)
    */
    'icon'?: string;
  }
  interface ManifoldToastAttributes extends StencilHTMLAttributes {
    /**
    * `success` | `warning` | `error`
    */
    'alertType'?: 'success' | 'warning' | 'error' | undefined;
    /**
    * Is this dismissable?
    */
    'dismissable'?: boolean;
    /**
    * Use custom icon path data (1024×1024)
    */
    'icon'?: string;
  }

  interface ManifoldToggle {
    'ariaLabelledby'?: string;
    'defaultValue'?: boolean;
    'disabled'?: boolean;
    'label'?: string;
    'name': string;
  }
  interface ManifoldToggleAttributes extends StencilHTMLAttributes {
    'ariaLabelledby'?: string;
    'defaultValue'?: boolean;
    'disabled'?: boolean;
    'label'?: string;
    'name'?: string;
    'onUpdateValue'?: (event: CustomEvent) => void;
  }

  interface ManifoldTooltip {
    'labelText'?: string;
  }
  interface ManifoldTooltipAttributes extends StencilHTMLAttributes {
    'labelText'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'ManifoldActivePlan': Components.ManifoldActivePlan;
    'ManifoldBadge': Components.ManifoldBadge;
    'ManifoldConnection': Components.ManifoldConnection;
    'ManifoldCostDisplay': Components.ManifoldCostDisplay;
    'ManifoldDataProductLogo': Components.ManifoldDataProductLogo;
    'ManifoldDataProductName': Components.ManifoldDataProductName;
    'ManifoldFeaturedService': Components.ManifoldFeaturedService;
    'ManifoldIcon': Components.ManifoldIcon;
    'ManifoldImageGallery': Components.ManifoldImageGallery;
    'ManifoldLazyImage': Components.ManifoldLazyImage;
    'ManifoldLinkButton': Components.ManifoldLinkButton;
    'ManifoldMarketplaceGrid': Components.ManifoldMarketplaceGrid;
    'ManifoldMarketplace': Components.ManifoldMarketplace;
    'ManifoldNumberInput': Components.ManifoldNumberInput;
    'ManifoldPlanCost': Components.ManifoldPlanCost;
    'ManifoldPlanDetails': Components.ManifoldPlanDetails;
    'ManifoldPlanMenu': Components.ManifoldPlanMenu;
    'ManifoldPlanSelector': Components.ManifoldPlanSelector;
    'ManifoldProductDetails': Components.ManifoldProductDetails;
    'ManifoldProductPage': Components.ManifoldProductPage;
    'ManifoldProduct': Components.ManifoldProduct;
    'ManifoldSelect': Components.ManifoldSelect;
    'ManifoldServiceCard': Components.ManifoldServiceCard;
    'ManifoldTemplateCard': Components.ManifoldTemplateCard;
    'ManifoldToast': Components.ManifoldToast;
    'ManifoldToggle': Components.ManifoldToggle;
    'ManifoldTooltip': Components.ManifoldTooltip;
  }

  interface StencilIntrinsicElements {
    'manifold-active-plan': Components.ManifoldActivePlanAttributes;
    'manifold-badge': Components.ManifoldBadgeAttributes;
    'manifold-connection': Components.ManifoldConnectionAttributes;
    'manifold-cost-display': Components.ManifoldCostDisplayAttributes;
    'manifold-data-product-logo': Components.ManifoldDataProductLogoAttributes;
    'manifold-data-product-name': Components.ManifoldDataProductNameAttributes;
    'manifold-featured-service': Components.ManifoldFeaturedServiceAttributes;
    'manifold-icon': Components.ManifoldIconAttributes;
    'manifold-image-gallery': Components.ManifoldImageGalleryAttributes;
    'manifold-lazy-image': Components.ManifoldLazyImageAttributes;
    'manifold-link-button': Components.ManifoldLinkButtonAttributes;
    'manifold-marketplace-grid': Components.ManifoldMarketplaceGridAttributes;
    'manifold-marketplace': Components.ManifoldMarketplaceAttributes;
    'manifold-number-input': Components.ManifoldNumberInputAttributes;
    'manifold-plan-cost': Components.ManifoldPlanCostAttributes;
    'manifold-plan-details': Components.ManifoldPlanDetailsAttributes;
    'manifold-plan-menu': Components.ManifoldPlanMenuAttributes;
    'manifold-plan-selector': Components.ManifoldPlanSelectorAttributes;
    'manifold-product-details': Components.ManifoldProductDetailsAttributes;
    'manifold-product-page': Components.ManifoldProductPageAttributes;
    'manifold-product': Components.ManifoldProductAttributes;
    'manifold-select': Components.ManifoldSelectAttributes;
    'manifold-service-card': Components.ManifoldServiceCardAttributes;
    'manifold-template-card': Components.ManifoldTemplateCardAttributes;
    'manifold-toast': Components.ManifoldToastAttributes;
    'manifold-toggle': Components.ManifoldToggleAttributes;
    'manifold-tooltip': Components.ManifoldTooltipAttributes;
  }


  interface HTMLManifoldActivePlanElement extends Components.ManifoldActivePlan, HTMLStencilElement {}
  var HTMLManifoldActivePlanElement: {
    prototype: HTMLManifoldActivePlanElement;
    new (): HTMLManifoldActivePlanElement;
  };

  interface HTMLManifoldBadgeElement extends Components.ManifoldBadge, HTMLStencilElement {}
  var HTMLManifoldBadgeElement: {
    prototype: HTMLManifoldBadgeElement;
    new (): HTMLManifoldBadgeElement;
  };

  interface HTMLManifoldConnectionElement extends Components.ManifoldConnection, HTMLStencilElement {}
  var HTMLManifoldConnectionElement: {
    prototype: HTMLManifoldConnectionElement;
    new (): HTMLManifoldConnectionElement;
  };

  interface HTMLManifoldCostDisplayElement extends Components.ManifoldCostDisplay, HTMLStencilElement {}
  var HTMLManifoldCostDisplayElement: {
    prototype: HTMLManifoldCostDisplayElement;
    new (): HTMLManifoldCostDisplayElement;
  };

  interface HTMLManifoldDataProductLogoElement extends Components.ManifoldDataProductLogo, HTMLStencilElement {}
  var HTMLManifoldDataProductLogoElement: {
    prototype: HTMLManifoldDataProductLogoElement;
    new (): HTMLManifoldDataProductLogoElement;
  };

  interface HTMLManifoldDataProductNameElement extends Components.ManifoldDataProductName, HTMLStencilElement {}
  var HTMLManifoldDataProductNameElement: {
    prototype: HTMLManifoldDataProductNameElement;
    new (): HTMLManifoldDataProductNameElement;
  };

  interface HTMLManifoldFeaturedServiceElement extends Components.ManifoldFeaturedService, HTMLStencilElement {}
  var HTMLManifoldFeaturedServiceElement: {
    prototype: HTMLManifoldFeaturedServiceElement;
    new (): HTMLManifoldFeaturedServiceElement;
  };

  interface HTMLManifoldIconElement extends Components.ManifoldIcon, HTMLStencilElement {}
  var HTMLManifoldIconElement: {
    prototype: HTMLManifoldIconElement;
    new (): HTMLManifoldIconElement;
  };

  interface HTMLManifoldImageGalleryElement extends Components.ManifoldImageGallery, HTMLStencilElement {}
  var HTMLManifoldImageGalleryElement: {
    prototype: HTMLManifoldImageGalleryElement;
    new (): HTMLManifoldImageGalleryElement;
  };

  interface HTMLManifoldLazyImageElement extends Components.ManifoldLazyImage, HTMLStencilElement {}
  var HTMLManifoldLazyImageElement: {
    prototype: HTMLManifoldLazyImageElement;
    new (): HTMLManifoldLazyImageElement;
  };

  interface HTMLManifoldLinkButtonElement extends Components.ManifoldLinkButton, HTMLStencilElement {}
  var HTMLManifoldLinkButtonElement: {
    prototype: HTMLManifoldLinkButtonElement;
    new (): HTMLManifoldLinkButtonElement;
  };

  interface HTMLManifoldMarketplaceGridElement extends Components.ManifoldMarketplaceGrid, HTMLStencilElement {}
  var HTMLManifoldMarketplaceGridElement: {
    prototype: HTMLManifoldMarketplaceGridElement;
    new (): HTMLManifoldMarketplaceGridElement;
  };

  interface HTMLManifoldMarketplaceElement extends Components.ManifoldMarketplace, HTMLStencilElement {}
  var HTMLManifoldMarketplaceElement: {
    prototype: HTMLManifoldMarketplaceElement;
    new (): HTMLManifoldMarketplaceElement;
  };

  interface HTMLManifoldNumberInputElement extends Components.ManifoldNumberInput, HTMLStencilElement {}
  var HTMLManifoldNumberInputElement: {
    prototype: HTMLManifoldNumberInputElement;
    new (): HTMLManifoldNumberInputElement;
  };

  interface HTMLManifoldPlanCostElement extends Components.ManifoldPlanCost, HTMLStencilElement {}
  var HTMLManifoldPlanCostElement: {
    prototype: HTMLManifoldPlanCostElement;
    new (): HTMLManifoldPlanCostElement;
  };

  interface HTMLManifoldPlanDetailsElement extends Components.ManifoldPlanDetails, HTMLStencilElement {}
  var HTMLManifoldPlanDetailsElement: {
    prototype: HTMLManifoldPlanDetailsElement;
    new (): HTMLManifoldPlanDetailsElement;
  };

  interface HTMLManifoldPlanMenuElement extends Components.ManifoldPlanMenu, HTMLStencilElement {}
  var HTMLManifoldPlanMenuElement: {
    prototype: HTMLManifoldPlanMenuElement;
    new (): HTMLManifoldPlanMenuElement;
  };

  interface HTMLManifoldPlanSelectorElement extends Components.ManifoldPlanSelector, HTMLStencilElement {}
  var HTMLManifoldPlanSelectorElement: {
    prototype: HTMLManifoldPlanSelectorElement;
    new (): HTMLManifoldPlanSelectorElement;
  };

  interface HTMLManifoldProductDetailsElement extends Components.ManifoldProductDetails, HTMLStencilElement {}
  var HTMLManifoldProductDetailsElement: {
    prototype: HTMLManifoldProductDetailsElement;
    new (): HTMLManifoldProductDetailsElement;
  };

  interface HTMLManifoldProductPageElement extends Components.ManifoldProductPage, HTMLStencilElement {}
  var HTMLManifoldProductPageElement: {
    prototype: HTMLManifoldProductPageElement;
    new (): HTMLManifoldProductPageElement;
  };

  interface HTMLManifoldProductElement extends Components.ManifoldProduct, HTMLStencilElement {}
  var HTMLManifoldProductElement: {
    prototype: HTMLManifoldProductElement;
    new (): HTMLManifoldProductElement;
  };

  interface HTMLManifoldSelectElement extends Components.ManifoldSelect, HTMLStencilElement {}
  var HTMLManifoldSelectElement: {
    prototype: HTMLManifoldSelectElement;
    new (): HTMLManifoldSelectElement;
  };

  interface HTMLManifoldServiceCardElement extends Components.ManifoldServiceCard, HTMLStencilElement {}
  var HTMLManifoldServiceCardElement: {
    prototype: HTMLManifoldServiceCardElement;
    new (): HTMLManifoldServiceCardElement;
  };

  interface HTMLManifoldTemplateCardElement extends Components.ManifoldTemplateCard, HTMLStencilElement {}
  var HTMLManifoldTemplateCardElement: {
    prototype: HTMLManifoldTemplateCardElement;
    new (): HTMLManifoldTemplateCardElement;
  };

  interface HTMLManifoldToastElement extends Components.ManifoldToast, HTMLStencilElement {}
  var HTMLManifoldToastElement: {
    prototype: HTMLManifoldToastElement;
    new (): HTMLManifoldToastElement;
  };

  interface HTMLManifoldToggleElement extends Components.ManifoldToggle, HTMLStencilElement {}
  var HTMLManifoldToggleElement: {
    prototype: HTMLManifoldToggleElement;
    new (): HTMLManifoldToggleElement;
  };

  interface HTMLManifoldTooltipElement extends Components.ManifoldTooltip, HTMLStencilElement {}
  var HTMLManifoldTooltipElement: {
    prototype: HTMLManifoldTooltipElement;
    new (): HTMLManifoldTooltipElement;
  };

  interface HTMLElementTagNameMap {
    'manifold-active-plan': HTMLManifoldActivePlanElement
    'manifold-badge': HTMLManifoldBadgeElement
    'manifold-connection': HTMLManifoldConnectionElement
    'manifold-cost-display': HTMLManifoldCostDisplayElement
    'manifold-data-product-logo': HTMLManifoldDataProductLogoElement
    'manifold-data-product-name': HTMLManifoldDataProductNameElement
    'manifold-featured-service': HTMLManifoldFeaturedServiceElement
    'manifold-icon': HTMLManifoldIconElement
    'manifold-image-gallery': HTMLManifoldImageGalleryElement
    'manifold-lazy-image': HTMLManifoldLazyImageElement
    'manifold-link-button': HTMLManifoldLinkButtonElement
    'manifold-marketplace-grid': HTMLManifoldMarketplaceGridElement
    'manifold-marketplace': HTMLManifoldMarketplaceElement
    'manifold-number-input': HTMLManifoldNumberInputElement
    'manifold-plan-cost': HTMLManifoldPlanCostElement
    'manifold-plan-details': HTMLManifoldPlanDetailsElement
    'manifold-plan-menu': HTMLManifoldPlanMenuElement
    'manifold-plan-selector': HTMLManifoldPlanSelectorElement
    'manifold-product-details': HTMLManifoldProductDetailsElement
    'manifold-product-page': HTMLManifoldProductPageElement
    'manifold-product': HTMLManifoldProductElement
    'manifold-select': HTMLManifoldSelectElement
    'manifold-service-card': HTMLManifoldServiceCardElement
    'manifold-template-card': HTMLManifoldTemplateCardElement
    'manifold-toast': HTMLManifoldToastElement
    'manifold-toggle': HTMLManifoldToggleElement
    'manifold-tooltip': HTMLManifoldTooltipElement
  }

  interface ElementTagNameMap {
    'manifold-active-plan': HTMLManifoldActivePlanElement;
    'manifold-badge': HTMLManifoldBadgeElement;
    'manifold-connection': HTMLManifoldConnectionElement;
    'manifold-cost-display': HTMLManifoldCostDisplayElement;
    'manifold-data-product-logo': HTMLManifoldDataProductLogoElement;
    'manifold-data-product-name': HTMLManifoldDataProductNameElement;
    'manifold-featured-service': HTMLManifoldFeaturedServiceElement;
    'manifold-icon': HTMLManifoldIconElement;
    'manifold-image-gallery': HTMLManifoldImageGalleryElement;
    'manifold-lazy-image': HTMLManifoldLazyImageElement;
    'manifold-link-button': HTMLManifoldLinkButtonElement;
    'manifold-marketplace-grid': HTMLManifoldMarketplaceGridElement;
    'manifold-marketplace': HTMLManifoldMarketplaceElement;
    'manifold-number-input': HTMLManifoldNumberInputElement;
    'manifold-plan-cost': HTMLManifoldPlanCostElement;
    'manifold-plan-details': HTMLManifoldPlanDetailsElement;
    'manifold-plan-menu': HTMLManifoldPlanMenuElement;
    'manifold-plan-selector': HTMLManifoldPlanSelectorElement;
    'manifold-product-details': HTMLManifoldProductDetailsElement;
    'manifold-product-page': HTMLManifoldProductPageElement;
    'manifold-product': HTMLManifoldProductElement;
    'manifold-select': HTMLManifoldSelectElement;
    'manifold-service-card': HTMLManifoldServiceCardElement;
    'manifold-template-card': HTMLManifoldTemplateCardElement;
    'manifold-toast': HTMLManifoldToastElement;
    'manifold-toggle': HTMLManifoldToggleElement;
    'manifold-tooltip': HTMLManifoldTooltipElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
