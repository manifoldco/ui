/**
 *  Properties that should be found  in every analytics event
 */
export interface RequiredProperties {
  properties: {
    componentName: string;
    uiVersion: string;
  };
}

/**
 *  Based on `name`, what data should be sent?
 */
export type EventTypes =
  | {
      name: 'load';
      description: string;
      properties: {
        initialRender: number;
        renderWithData: number;
        rttGraphql: number;
        time: number;
      };
    }
  | {
      name: 'render_with_data';
      description: string;
      properties: {
        rttGraphql: number;
        time: number;
      };
    }
  | {
      name: 'rtt_graphql';
      description: string;
      properties: {
        time: number;
      };
    }
  | {
      name: 'token_received';
      description: string;
      properties: {
        time: number;
      };
    };

export type EventEvent = {
  type: 'event';
} & RequiredProperties &
  EventTypes;

/**
 *  Error analytics event
 */
export interface ErrorEvent extends RequiredProperties {
  type: 'error';
  name: string;
  properties: {
    code: string;
    componentName: string;
    message: string;
    uiVersion: string;
  };
}

export type AnalyticsEvent = ErrorEvent | EventEvent;
