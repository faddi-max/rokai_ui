import fs from "fs";
import path from "path";

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]
  );

const files = walk("src").filter((f) => f.endsWith(".tsx"));
let changed = 0;

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  const o = s;

  s = s.replace(
    /^const (container|item|formVariants|itemVariants|containerVariants|tagVariants) = \{/gm,
    "const $1: Variants = {"
  );
  if (s !== o && !/type Variants/.test(s)) {
    s = 'import type { Variants } from "framer-motion";\n' + s;
  }

  if (f.endsWith("StepCard.tsx")) {
    s = s.replace(/const motionProps = \{/, "const motionProps: MotionProps = {");
    if (!/MotionProps \}/.test(s))
      s = 'import type { MotionProps } from "framer-motion";\n' + s;
  }

  if (/blogCatagoryPage\.tsx$|SingleBlogPage\.tsx$/.test(f)) {
    s = s.replace(/\}, \[slug\]\);/, "}, { deps: [slug] });");
  }

  if (s !== o) {
    fs.writeFileSync(f, s);
    changed++;
    console.log("fixed", f);
  }
}
console.log("files changed:", changed);
