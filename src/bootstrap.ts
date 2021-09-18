import './libs/polyfills';

import onLoad from './app/app';
import { $on } from './ui/helpers';

import './ui/styles.css';

$on(window, 'load', onLoad);
$on(window, 'hashchange', onLoad);
