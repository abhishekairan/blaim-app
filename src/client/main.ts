// Client entry: the only JavaScript the page ships. Loaded as a module (deferred).
import { initTheme } from "./theme";
import { initUi } from "./ui";
import { initCtaTracking } from "./cta-tracking";
import { initAbstractForm } from "./abstract-form";
import { initTranslate } from "./translate";

initTheme();
initTranslate();
initUi();
initCtaTracking();
initAbstractForm();
