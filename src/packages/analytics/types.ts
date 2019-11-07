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
        time: number;
      };
    }
  | {
      name: 'render_with_data';
      properties: {
        rttGraphql: number;
        time: number;
      };
    }
  | {
      name: 'rtt_graphql';
      properties: {
        time: number;
      };
    }
  | {
      name: 'token_received';
      properties: {
        time: number;
      };
    };

export type EventEvent = {
  type: 'event';
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
