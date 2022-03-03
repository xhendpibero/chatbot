/*! Rappid v3.4.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2021 client IO

 2022-03-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EventBusService } from 'src/services/event-bus.service';
import { SharedEvents } from 'src/rappid/controller';

const DEBOUNCE_TIME_MS = 500;

@Component({
    selector: 'chatbot-json-editor',
    templateUrl: './json-editor.component.html',
    styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnInit {

    @Input() content: Object;
    public placeholder = 'e.g. { "cells": [{ "type": "app.Message"}] }';
    public contentSubject = new Subject<Object>();

    constructor(private eventBusService: EventBusService) {
    }

    public ngOnInit(): void {
        const { contentSubject, eventBusService } = this;
        contentSubject.pipe(debounceTime(DEBOUNCE_TIME_MS)).subscribe((json: Object) => {
            eventBusService.emit(SharedEvents.JSON_EDITOR_CHANGED, json);
        });
    }

    public parseJSON(jsonString: string): void {
        const { contentSubject } = this;
        let json;
        if (!jsonString) {
            json = { cells: [] };
        } else {
            try {
                json = JSON.parse(jsonString);
            } catch (e) {
                // Invalid JSON
                return;
            }
        }
        contentSubject.next(json);
    }
}
