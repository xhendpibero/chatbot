/*! Rappid v3.4.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2021 client IO

 2022-03-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


import { NgModule } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { ChatbotModule } from 'src/app/chatbot/chatbot.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ChatbotModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
