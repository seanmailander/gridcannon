import onLoad from "./app.ts";
import { $on } from "./helpers.ts";

import "./styles.css";

$on(window, "load", onLoad);
$on(window, "hashchange", onLoad);
