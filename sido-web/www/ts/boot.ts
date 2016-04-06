/**
 * Created by mvincent on 05/01/2016.
 */
import {bootstrap}        from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';

import {InternalRouter} from './router';

bootstrap(InternalRouter, [ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(APP_BASE_HREF, {useValue : '/'})]);

