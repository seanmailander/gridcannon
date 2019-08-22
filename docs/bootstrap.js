import {onLoad} from './app.js'
import {$on} from './helpers.js'

$on(window, 'load', onLoad)
$on(window, 'hashchange', onLoad)
