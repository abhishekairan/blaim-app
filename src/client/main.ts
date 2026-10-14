// Client entry: the only JavaScript the page ships. Loaded as a module (deferred).
import { initUi } from "./ui";
import { initCtaTracking } from "./cta-tracking";
import { initAbstractForm } from "./abstract-form";

initUi();
initCtaTracking();
initAbstractForm();
