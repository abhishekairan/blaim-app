// Client entry: the only JavaScript the page ships. Loaded as a module (deferred).
import { initTheme } from "./theme";
import { initHeader } from "./header";
import { initCtaTracking } from "./cta-tracking";
import { initAbstractForm } from "./abstract-form";

initTheme();
initHeader();
initCtaTracking();
initAbstractForm();
