/*! Rappid v3.4.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2021 client IO

 2022-03-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/

import {
  CONFIRMATION_ICON,
  ENTITY_ICON,
  MESSAGE_ICON,
  USER_INPUT_ICON,
} from "src/theme";

export const stencilConfig = {
  shapes: [
    {
      name: "FlowchartStart",
    },
    {
      name: "FlowchartEnd",
    },
    {
      name: "UserInput",
      attrs: {
        label: { text: "User Input" },
        icon: {
          xlinkHref:
            "https://ik.imagekit.io/yluuuqncdgqj/photo_2022-03-05_01.51.09_nAYnK6UETu.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1646419879476",
        },
      },
    },
    {
      name: "BotResponse",
      attrs: {
        label: { text: "Bot Response" },
        icon: {
          xlinkHref:
            "https://ik.imagekit.io/yluuuqncdgqj/Screen_Shot_2022-03-05_at_01.53.45_g9csY8FiBG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1646420129119",
        },
      },
    },
    {
      name: "Fallback",
      attrs: {
        label: { text: "Fallback" },
        icon: {
          xlinkHref:
            "https://ik.imagekit.io/yluuuqncdgqj/Screen_Shot_2022-03-05_at_01.54.01_K4wVLrKEUT.png?ik-sdk-version=javascript-1.4.3&updatedAt=1646420128921",
        },
      },
    },
    {
      name: "JsonApi",
      attrs: {
        label: { text: "JSON API" },
        icon: {
          xlinkHref:
            "https://ik.imagekit.io/yluuuqncdgqj/Screen_Shot_2022-03-05_at_01.54.16_SCKw1wnPwFy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1646420128626",
        },
      },
    },
    {
      name: "GoToElement",
      attrs: {
        label: { text: "Go To Element" },
        icon: {
          xlinkHref:
            "https://ik.imagekit.io/yluuuqncdgqj/Screen_Shot_2022-03-05_at_01.54.31_IbBtwhBgi1mM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1646420128306",
        },
      },
    },
    {
      name: "Webhook",
      attrs: {
        label: { text: "Webhook" },
        icon: {
          xlinkHref:
            "https://ik.imagekit.io/yluuuqncdgqj/Screen_Shot_2022-03-05_at_01.54.40_WXFyKlJjjWj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1646420127803",
        },
      },
    },
    {
      name: "CloseChat",
      attrs: {
        label: { text: "Close Chat" },
        icon: {
          xlinkHref:
            "https://ik.imagekit.io/yluuuqncdgqj/Screen_Shot_2022-03-05_at_01.54.55_LAfmmLLT4A.png?ik-sdk-version=javascript-1.4.3&updatedAt=1646420127845",
        },
      },
      // },
      // {
      //   name: "Message",
      //   attrs: {
      //     label: { text: "Bot Response" },
      //     icon: { xlinkHref: ENTITY_ICON },
      //   },
      // },
      // {
      //   name: "Message",
      //   attrs: {
      //     label: { text: "Fallback" },
      //     icon: { xlinkHref: MESSAGE_ICON },
      //   },
      // },
      // {
      //   name: "Message",
      //   attrs: {
      //     label: { text: "Entity" },
      //     icon: { xlinkHref: ENTITY_ICON },
      //   },
      // }, {
      //     name: 'Message',
      //     attrs: {
      //         label: { text: 'User action' },
      //         icon: { xlinkHref: USER_INPUT_ICON }
      //     }
      // }, {
      //     name: 'Message',
      //     attrs: {
      //         label: { text: 'Message' },
      //         icon: { xlinkHref: MESSAGE_ICON }
      //     }
      // }, {
      //     name: 'Message',
      //     attrs: {
      //         label: { text: 'Confirmation' },
      //         icon: { xlinkHref: CONFIRMATION_ICON }
      //     }
    },
  ],
};
