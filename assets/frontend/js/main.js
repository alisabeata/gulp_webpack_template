/*global alert, console, history*/

'use strict';

import detectionDevice from './helpers/detectionDevice';
import loadingPage from './helpers/loadingPage';
import menu from './modules/menu';

const APP_DEVICE = detectionDevice();

loadingPage(APP_DEVICE);
menu('menu');