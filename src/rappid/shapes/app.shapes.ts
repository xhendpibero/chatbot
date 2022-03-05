/*! Rappid v3.4.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2021 client IO

 2022-03-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/

import { util, dia, g, shapes } from "@clientio/rappid";
import {
  MAX_PORT_COUNT,
  FONT_FAMILY,
  OUT_PORT_HEIGHT,
  OUT_PORT_WIDTH,
  OUT_PORT_LABEL,
  PORT_BORDER_RADIUS,
  PADDING_L,
  PADDING_S,
  ADD_PORT_SIZE,
  REMOVE_PORT_SIZE,
  BACKGROUND_COLOR,
  LIGHT_COLOR,
  DARK_COLOR,
  MAIN_COLOR,
  LINE_WIDTH,
} from "src/theme";

export enum ShapeTypesEnum {
  BASE = "app.Base",
  MESSAGE = "app.Message",
  FLOWCHART_START = "app.FlowchartStart",
  BOX_MESSAGE = "app.BoxMessage",

  USER_INPUT = "app.UserInput",
  BOT_RESPONSE = "app.BotResponse",
  FALLBACK = "app.Fallback",
  JSON_API = "app.JsonApi",
  GO_TO_ELEMENT = "app.GoToElement",
  WEBHOOK = "app.Webhook",
  CLOSE_CHAT = "app.CloseChat",

  FLOWCHART_END = "app.FlowchartEnd",
  LINK = "app.Link",
}

const outputPortPosition = (
  portsArgs: dia.Element.Port[],
  elBBox: dia.BBox
): g.Point[] => {
  const step = OUT_PORT_WIDTH + PADDING_S;
  return portsArgs.map(
    (port: dia.Element.Port, index: number) =>
      new g.Point({
        x: PADDING_L + OUT_PORT_WIDTH / 2 + index * step,
        y: elBBox.height,
      })
  );
};

const Base = dia.Element.define(
  ShapeTypesEnum.BASE,
  {
    // no default attributes
  },
  {
    getBoundaryPadding: function () {
      return util.normalizeSides(this.boundaryPadding);
    },

    toJSON: function () {
      // Simplify the element resulting JSON
      const json = dia.Element.prototype.toJSON.call(this);
      // Remove port groups and angle for better readability
      delete json.ports.groups;
      delete json.angle;
      return json;
    },
  },
  {
    fromStencilShape: function (element: dia.Element) {
      const attrs = {
        label: {
          text: element.attr(["label", "text"]),
        },
        body: {
          stroke: element.attr(["body", "stroke"]),
          fill: element.attr(["body", "fill"]),
        },
        icon: {
          xlinkHref: element.attr(["icon", "xlinkHref"]),
        },
      };
      return new this({ attrs });
    },
  }
);

const Message = Base.define(
  ShapeTypesEnum.MESSAGE,
  {
    size: { width: 368, height: 80 },
    ports: {
      groups: {
        in: {
          position: {
            name: "left",
            args: {
              x: -10,
              y: 40,
            },
          },
          size: {
            width: 16,
            height: 16,
          },
          attrs: {
            portBody: {
              magnet: "passive",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
              fill: LIGHT_COLOR,
              stroke: DARK_COLOR,
              strokeWidth: LINE_WIDTH,
            },
          },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
        out: {
          position: outputPortPosition,
          size: {
            width: OUT_PORT_WIDTH,
            height: OUT_PORT_HEIGHT,
          },
          attrs: {
            portBody: {
              magnet: "active",
              refWidth: "100%",
              refHeight: "100%",
              refX: "-50%",
              refY: "-50%",
              fill: DARK_COLOR,
              ry: PORT_BORDER_RADIUS,
              rx: PORT_BORDER_RADIUS,
            },
            portLabel: {
              pointerEvents: "none",
              fontFamily: FONT_FAMILY,
              fontWeight: 400,
              fontSize: 13,
              fill: LIGHT_COLOR,
              textAnchor: "start",
              textVerticalAnchor: "middle",
              textWrap: {
                width: -REMOVE_PORT_SIZE - PADDING_L - PADDING_S,
                maxLineCount: 1,
                ellipsis: true,
              },
              x: PADDING_L - OUT_PORT_WIDTH / 2,
            },
            portRemoveButton: {
              cursor: "pointer",
              event: "element:port:remove",
              refX: "-50%",
              refDx: -PADDING_L,
              dataTooltip: "Remove Output Port",
              dataTooltipPosition: "top",
            },
            portRemoveButtonBody: {
              width: REMOVE_PORT_SIZE,
              height: REMOVE_PORT_SIZE,
              x: -REMOVE_PORT_SIZE / 2,
              y: -REMOVE_PORT_SIZE / 2,
              fill: LIGHT_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
            portRemoveButtonIcon: {
              d: "M -4 -4 4 4 M -4 4 4 -4",
              stroke: DARK_COLOR,
              strokeWidth: LINE_WIDTH,
            },
          },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
            {
              tagName: "text",
              selector: "portLabel",
            },
            {
              tagName: "g",
              selector: "portRemoveButton",
              children: [
                {
                  tagName: "rect",
                  selector: "portRemoveButtonBody",
                },
                {
                  tagName: "path",
                  selector: "portRemoveButtonIcon",
                },
              ],
            },
          ],
        },
      },
      items: [
        {
          group: "in",
        },
        {
          group: "out",
          attrs: { portLabel: { text: OUT_PORT_LABEL } },
        },
      ],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: LIGHT_COLOR,
        strokeWidth: LINE_WIDTH / 2,
        stroke: "#D4D4D4",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: "#322A49",
        text: "Label",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      description: {
        refX: 54,
        refY: 38,
        fontFamily: FONT_FAMILY,
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 13,
        fill: "#655E77",
        textVerticalAnchor: "top",
        text: "Description",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 2,
          ellipsis: true,
        },
      },
      icon: {
        width: 20,
        height: 20,
        refX: PADDING_L,
        refY: 24,
        xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg",
      },
      portAddButton: {
        cursor: "pointer",
        fill: MAIN_COLOR,
        event: "element:port:add",
        refX: "100%",
        refX2: -28,
        refY: "100%",
        dataTooltip: "Add Output Port",
        dataTooltipPosition: "top",
      },
      portAddButtonBody: {
        width: ADD_PORT_SIZE,
        height: ADD_PORT_SIZE,
        rx: PORT_BORDER_RADIUS,
        ry: PORT_BORDER_RADIUS,
        x: -ADD_PORT_SIZE / 2,
        y: -ADD_PORT_SIZE / 2,
      },
      portAddButtonIcon: {
        d: "M -4 0 4 0 M 0 -4 0 4",
        stroke: "#FFFFFF",
        strokeWidth: LINE_WIDTH,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "text",
        selector: "description",
      },
      {
        tagName: "image",
        selector: "icon",
      },
      {
        tagName: "g",
        selector: "portAddButton",
        children: [
          {
            tagName: "rect",
            selector: "portAddButtonBody",
          },
          {
            tagName: "path",
            selector: "portAddButtonIcon",
          },
        ],
      },
    ],

    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: OUT_PORT_HEIGHT / 2 + PADDING_L,
    },

    addDefaultPort: function () {
      if (!this.canAddPort("out")) return;
      this.addPort({
        group: "out",
        attrs: { portLabel: { text: OUT_PORT_LABEL } },
      });
    },

    canAddPort: function (group: string): boolean {
      return Object.keys(this.getGroupPorts(group)).length < MAX_PORT_COUNT;
    },

    toggleAddPortButton: function (group: string): void {
      const buttonAttributes = this.canAddPort(group)
        ? { fill: MAIN_COLOR, cursor: "pointer" }
        : { fill: "#BEBEBE", cursor: "not-allowed" };
      this.attr(["portAddButton"], buttonAttributes, {
        dry: true /* to be ignored by the Command Manager */,
      });
    },
  }
);

const FlowchartStart = Base.define(
  ShapeTypesEnum.FLOWCHART_START,
  {
    size: { width: 120, height: 48 },
    ports: {
      groups: {
        out: {
          position: { name: "right" },
          attrs: {
            portBody: {
              magnet: "active",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
              //   refWidth: "100%",
              //   refHeight: 38,
              //   refY: -24,
              //   refX: "-100%",
              //   strokeWidth: 0,
              //   fill: "transparent",
              //   stroke: BACKGROUND_COLOR,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "out" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "#253858",
        strokeWidth: LINE_WIDTH / 2,
        stroke: "none",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: LIGHT_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        d: "M 2 8 L 4.29 5.71 L 1.41 2.83 L 2.83 1.41 L 5.71 4.29 L 8 2 L 8 8 Z M -2 8 L -8 8 L -8 2 L -5.71 4.29 L -1 -0.41 L -1 -8 L 1 -8 L 1 0.41 L -4.29 5.71 Z",
        fill: LIGHT_COLOR,
        refX: PADDING_L + 15,
        refY: 24,
        width: 20,
        height: 20,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "path",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

const FlowchartEnd = Base.define(
  ShapeTypesEnum.FLOWCHART_END,
  {
    size: { width: 120, height: 48 },
    ports: {
      groups: {
        in: {
          position: { name: "left" },
          attrs: {
            portBody: {
              magnet: "passive",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
              //   paintOrder: "stroke",
              //   refWidth: "100%",
              //   refHeight: "100%",
              //   refY: "-50%",
              //   refX: 0,
              //   strokeWidth: 0,
              //   fill: "transparent",
              //   stroke: BACKGROUND_COLOR,
              //   rx: PORT_BORDER_RADIUS,
              //   ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "in" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "#253858",
        strokeWidth: LINE_WIDTH / 2,
        stroke: "none",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: LIGHT_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: PADDING_L + 15,
        refY: 24,
        width: 20,
        height: 20,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "path",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

const UserInput = Base.define(
  ShapeTypesEnum.USER_INPUT,
  {
    size: { width: 48, height: 48 },
    ports: {
      groups: {
        out: {
          position: { name: "right" },
          attrs: {
            portBody: {
              magnet: "active",
              rotate: 60,
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
        in: {
          position: { name: "left" },
          attrs: {
            portBody: {
              magnet: "passive",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "in" }, { group: "out" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "transparent",
        strokeWidth: 0,
        // stroke: "none",
        // rx: 3,
        // ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: DARK_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: -5,
        refY: -5,
        width: 55,
        height: 55,
      },
      //   more: {
      //     xlinkHref: "https://cdn-icons-png.flaticon.com/512/61/61140.png",
      //     // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
      //     fill: LIGHT_COLOR,
      //     refX: 155,
      //     refY: 13,
      //     width: 20,
      //     height: 20,
      //   },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "image",
        selector: "more",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

const BotResponse = Base.define(
  ShapeTypesEnum.BOT_RESPONSE,
  {
    size: { width: 190, height: 48 },
    ports: {
      groups: {
        out: {
          position: { name: "right" },
          attrs: {
            portBody: {
              magnet: "active",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
        in: {
          position: { name: "left" },
          attrs: {
            portBody: {
              magnet: "passive",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "in" }, { group: "out" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "#253858",
        strokeWidth: LINE_WIDTH / 2,
        stroke: "none",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: DARK_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: PADDING_L + 5,
        refY: 13,
        width: 20,
        height: 20,
      },
      more: {
        xlinkHref: "https://cdn-icons-png.flaticon.com/512/61/61140.png",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: 155,
        refY: 13,
        width: 20,
        height: 20,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "image",
        selector: "more",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

const Fallback = Base.define(
  ShapeTypesEnum.FALLBACK,
  {
    size: { width: 190, height: 48 },
    ports: {
      groups: {
        out: {
          position: { name: "right" },
          attrs: {
            portBody: {
              magnet: "active",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
        in: {
          position: { name: "left" },
          attrs: {
            portBody: {
              magnet: "passive",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "in" }, { group: "out" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "#253858",
        strokeWidth: LINE_WIDTH / 2,
        stroke: "none",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: DARK_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: PADDING_L + 5,
        refY: 13,
        width: 20,
        height: 20,
      },
      more: {
        xlinkHref: "https://cdn-icons-png.flaticon.com/512/61/61140.png",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: 155,
        refY: 13,
        width: 20,
        height: 20,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "image",
        selector: "more",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

const JsonApi = Base.define(
  ShapeTypesEnum.JSON_API,
  {
    size: { width: 190, height: 48 },
    ports: {
      groups: {
        out: {
          position: { name: "right" },
          attrs: {
            portBody: {
              magnet: "active",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
        in: {
          position: { name: "left" },
          attrs: {
            portBody: {
              magnet: "passive",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "in" }, { group: "out" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "#253858",
        strokeWidth: LINE_WIDTH / 2,
        stroke: "none",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: DARK_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: PADDING_L + 5,
        refY: 13,
        width: 20,
        height: 20,
      },
      more: {
        xlinkHref: "https://cdn-icons-png.flaticon.com/512/61/61140.png",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: 155,
        refY: 13,
        width: 20,
        height: 20,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "image",
        selector: "more",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

const GoToElement = Base.define(
  ShapeTypesEnum.GO_TO_ELEMENT,
  {
    size: { width: 190, height: 48 },
    ports: {
      groups: {
        out: {
          position: { name: "right" },
          attrs: {
            portBody: {
              magnet: "active",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
        in: {
          position: { name: "left" },
          attrs: {
            portBody: {
              magnet: "passive",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "in" }, { group: "out" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "#253858",
        strokeWidth: LINE_WIDTH / 2,
        stroke: "none",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: DARK_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: PADDING_L + 5,
        refY: 13,
        width: 20,
        height: 20,
      },
      more: {
        xlinkHref: "https://cdn-icons-png.flaticon.com/512/61/61140.png",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: 155,
        refY: 13,
        width: 20,
        height: 20,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "image",
        selector: "more",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

const Webhook = Base.define(
  ShapeTypesEnum.WEBHOOK,
  {
    size: { width: 190, height: 48 },
    ports: {
      groups: {
        out: {
          position: { name: "right" },
          attrs: {
            portBody: {
              magnet: "active",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
        in: {
          position: { name: "left" },
          attrs: {
            portBody: {
              magnet: "passive",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "in" }, { group: "out" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "#253858",
        strokeWidth: LINE_WIDTH / 2,
        stroke: "none",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: DARK_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: PADDING_L + 5,
        refY: 13,
        width: 20,
        height: 20,
      },
      more: {
        xlinkHref: "https://cdn-icons-png.flaticon.com/512/61/61140.png",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: 155,
        refY: 13,
        width: 20,
        height: 20,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "image",
        selector: "more",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

const CloseChat = Base.define(
  ShapeTypesEnum.BOX_MESSAGE,
  {
    size: { width: 190, height: 48 },
    ports: {
      groups: {
        in: {
          position: { name: "left" },
          attrs: {
            portBody: {
              magnet: "passive",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "in" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "#253858",
        strokeWidth: LINE_WIDTH / 2,
        stroke: "none",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: DARK_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: PADDING_L + 5,
        refY: 13,
        width: 20,
        height: 20,
      },
      more: {
        xlinkHref: "https://cdn-icons-png.flaticon.com/512/61/61140.png",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: 155,
        refY: 13,
        width: 20,
        height: 20,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "image",
        selector: "more",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

const BoxMessage = Base.define(
  ShapeTypesEnum.BOX_MESSAGE,
  {
    size: { width: 190, height: 48 },
    ports: {
      groups: {
        out: {
          position: { name: "right" },
          attrs: {
            portBody: {
              magnet: "active",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
        in: {
          position: { name: "left" },
          attrs: {
            portBody: {
              magnet: "passive",
              paintOrder: "stroke",
              refWidth: "100%",
              refHeight: "100%",
              refY: "-50%",
              refX: "-50%",
              strokeWidth: 6,
              fill: DARK_COLOR,
              stroke: BACKGROUND_COLOR,
              rx: PORT_BORDER_RADIUS,
              ry: PORT_BORDER_RADIUS,
            },
          },
          size: { width: 10, height: 10 },
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
          ],
        },
      },
      items: [{ group: "in" }, { group: "out" }],
    },
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "#253858",
        strokeWidth: LINE_WIDTH / 2,
        stroke: "none",
        rx: 3,
        ry: 3,
      },
      label: {
        refX: 54,
        refY: PADDING_L,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 16,
        fill: DARK_COLOR,
        text: "",
        textWrap: {
          width: -54 - PADDING_L,
          maxLineCount: 1,
          ellipsis: true,
        },
        textVerticalAnchor: "top",
      },
      icon: {
        xlinkHref: "https://image.flaticon.com/icons/svg/151/151795.svg",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: PADDING_L + 5,
        refY: 13,
        width: 20,
        height: 20,
      },
      more: {
        xlinkHref: "https://cdn-icons-png.flaticon.com/512/61/61140.png",
        // d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
        fill: LIGHT_COLOR,
        refX: 155,
        refY: 13,
        width: 20,
        height: 20,
      },
    },
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "icon",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "image",
        selector: "more",
      },
    ],
    boundaryPadding: {
      horizontal: PADDING_L,
      top: PADDING_L,
      bottom: PADDING_L,
    },
  }
);

export const Link = dia.Link.define(
  ShapeTypesEnum.LINK,
  {
    attrs: {
      root: {
        cursor: "pointer",
      },
      line: {
        fill: "none",
        connection: true,
        stroke: DARK_COLOR,
        strokeWidth: LINE_WIDTH,
      },
      wrapper: {
        fill: "none",
        connection: true,
        stroke: "transparent",
        strokeWidth: 10,
      },
      arrowhead: {
        d: "M -5 -2.5 0 0 -5 2.5 Z",
        stroke: DARK_COLOR,
        fill: DARK_COLOR,
        atConnectionRatio: 0.55,
        strokeWidth: LINE_WIDTH,
      },
    },
    labels: [
      {
        attrs: {
          labelText: {
            text: "",
          },
        },
        position: {
          distance: 0.25,
        },
      },
    ],
  },
  {
    markup: [
      {
        tagName: "path",
        selector: "line",
      },
      {
        tagName: "path",
        selector: "wrapper",
      },
      {
        tagName: "path",
        selector: "arrowhead",
      },
    ],
    defaultLabel: {
      markup: [
        {
          tagName: "rect",
          selector: "labelBody",
        },
        {
          tagName: "text",
          selector: "labelText",
        },
      ],
      attrs: {
        labelText: {
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          textWrap: {
            width: 200,
            height: 100,
            ellipsis: true,
          },
          cursor: "pointer",
          fill: DARK_COLOR,
          textAnchor: "middle",
          textVerticalAnchor: "middle",
          pointerEvents: "none",
        },
        labelBody: {
          ref: "labelText",
          fill: BACKGROUND_COLOR,
          stroke: BACKGROUND_COLOR,
          strokeWidth: 2,
          refWidth: "100%",
          refHeight: "100%",
          refX: 0,
          refY: 0,
        },
      },
    },
  }
);

Object.assign(shapes, {
  app: {
    Base,
    Message,
    BoxMessage,

    UserInput,
    BotResponse,
    Fallback,
    JsonApi,
    GoToElement,
    Webhook,
    CloseChat,

    FlowchartStart,
    FlowchartEnd,
    Link,
  },
});
