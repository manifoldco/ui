/**
 *  Properties that should be found in every analytics event
 */
interface SharedProperties {
  description?: string;
  properties: {
    componentName: string;
    uiVersion: string;
  };
  source?: 'ui';
}

/**
 *  Based on `name`, what data should be sent?
 */
export type EventTypes =
  | {
      name: 'load';
      properties: {
        duration: number;
      };
    }
  | {
      name: 'first_render';
      properties: {
        duration: number;
      };
    }
  | {
      name: 'rtt_graphql';
      properties: {
        duration: number;
      };
    }
  | {
      name: 'token_received';
      properties: {
        duration: number;
      };
    }
  | {
      name: 'first_render_with_data';
      properties: {
        duration: number;
        rttGraphql: number;
        load: number;
      };
    };

export type EventEvent = {
  type: 'metric';
} & SharedProperties &
  EventTypes;

/**
 *  Error analytics event
 */
export interface ErrorEvent extends SharedProperties {
  type: 'error';
  name: 'ui_error';
  properties: {
    code: string;
    componentName: string;
    message: string;
    uiVersion: string;
  };
  source?: 'ui';
}

export type AnalyticsEvent = ErrorEvent | EventEvent;
