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
        initialRender: number;
        renderWithData: number;
        rttGraphql: number;
        duration: number;
      };
    }
  | {
      name: 'render_with_data';
      properties: {
        rttGraphql: number;
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
