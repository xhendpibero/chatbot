/*! Rappid v3.4.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2021 client IO

 2022-03-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/

import { dia } from "@clientio/rappid";

import "./app.shapes";
import "./stencil.shapes";

// extend joint.shapes namespace
declare module "@clientio/rappid" {
  namespace shapes {
    namespace app {
      class Base extends dia.Element {
        getBoundaryPadding(): dia.PaddingJSON;
        static fromStencilShape(element: dia.Element): Base;
      }
      class Message extends Base {
        addDefaultPort(): void;
        canAddPort(group: string): boolean;
        toggleAddPortButton(group: string): void;
      }
      class FlowchartStart extends Base {}
      class FlowchartEnd extends Base {}
      class BoxMessage extends Base {}
      class UserInput extends Base {}
      class BotResponse extends Base {}
      class Fallback extends Base {}
      class JsonApi extends Base {}
      class GoToElement extends Base {}
      class Webhook extends Base {}
      class CloseChat extends Base {}
      class Link extends dia.Link {}
    }
    namespace stencil {
      class Message extends dia.Element {}
      class FlowchartStart extends dia.Element {}
      class BoxMessage extends dia.Element {}
      class UserInput extends dia.Element {}
      class BotResponse extends dia.Element {}
      class Fallback extends dia.Element {}
      class JsonApi extends dia.Element {}
      class GoToElement extends dia.Element {}
      class Webhook extends dia.Element {}
      class CloseChat extends dia.Element {}
      class FlowchartEnd extends dia.Element {}
    }
  }
}
