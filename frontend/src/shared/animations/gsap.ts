import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

// Register once at the application boundary. Import `gsap` and `useGSAP` from
// `@/shared/animations` rather than their packages in feature code.
gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };
