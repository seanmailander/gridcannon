import onLoad from "./app/app.ts";
import { $on } from "./ui/helpers.ts";

import "./ui/styles.css";

$on(window, "load", onLoad);
$on(window, "hashchange", onLoad);
