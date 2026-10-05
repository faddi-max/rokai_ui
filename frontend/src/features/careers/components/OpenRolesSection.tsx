import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import SectionGlow from "@/shared/components/layout/SectionGlow";

/* -------------------------------------------------------------------------- */
/*  Types — API-ready                                                         */
/* -------------------------------------------------------------------------- */

export interface OpenRole {
  id: string;
  title: string;
  description: string;
  department: string;
  jobType: string; // e.g. "Full Time", "Internship"
  tags: string[];
  href?: string;
}

export interface OpenRolesSectionProps {
  eyebrow?: string;
  titleWhite?: string;
  titleRed?: string;
  description?: string;
  searchPlaceholder?: string;
  allDepartmentsLabel?: string;
  allJobTypesLabel?: string;
  roles?: OpenRole[];
}

/* -------------------------------------------------------------------------- */
/*  Default content                                                           */
/* -------------------------------------------------------------------------- */

const DEFAULT_ROLES: OpenRole[] = [
  {
    id: "project-manager",
    title: "Project Manager",
    description:
      "Lead projects from planning through completion while coordinating teams, timelines, quality, and client expectations.",
    department: "Management",
    jobType: "Full Time",
    tags: ["Management", "On-Site", "Career Driven"],
  },
  {
    id: "site-supervisor",
    title: "Site Supervisor",
    description:
      "Oversee daily site operations, coordinate field teams, maintain quality standards, and keep construction moving safely.",
    department: "Construction",
    jobType: "Full Time",
    tags: ["Construction", "On-Site", "Career Driven"],
  },
  {
    id: "construction-designer",
    title: "Construction Designer",
    description:
      "Support the design process with thoughtful plans, visual details, technical documentation, and project collaboration.",
    department: "Design",
    jobType: "Full Time",
    tags: ["Design", "Hybrid", "Mid Level"],
  },
  {
    id: "project-coordinator",
    title: "Project Coordinator",
    description:
      "Keep project communication, documentation, scheduling, and coordination organized across internal and external teams.",
    department: "Management",
    jobType: "Full Time",
    tags: ["Management", "Hybrid", "Entry Level"],
  },
  {
    id: "construction-intern",
    title: "Construction Intern",
    description:
      "Gain hands-on experience alongside experienced professionals and learn how projects move from plans to completed spaces.",
    department: "Construction",
    jobType: "Internship",
    tags: ["Construction", "On-Site", "Internship"],
  },
  {
    id: "design-intern",
    title: "Design Intern",
    description:
      "Work with the team on visual concepts, project presentations, documentation, and design development.",
    department: "Design",
    jobType: "Internship",
    tags: ["Design", "Hybrid", "Internship"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

const controlClass =
  "h-[44px] w-full rounded-[8px] border border-white/10 bg-[#111111] px-4 font-space-grotesk text-[13px] text-white/80 transition-colors duration-300 hover:border-white/20 focus:border-[#E51B24] focus:outline-none focus:ring-1 focus:ring-[#E51B24]/40";

function FilterSelect({
  value,
  onChange,
  allLabel,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
  options: string[];
  ariaLabel: string;
}) {
  return (
    <div className="relative w-full">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${controlClass} cursor-pointer appearance-none pr-10`}
      >
        <option value="">{allLabel}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
      />
    </div>
  );
}

function RoleCard({ role, index }: { role: OpenRole; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.a
      href={role.href ?? `/careers/${role.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, borderColor: "rgba(229, 27, 36, 0.4)" }}
      className="group relative flex min-h-[275px] w-full flex-col justify-between overflow-hidden rounded-[14px] border border-[#FFFFFF1A] bg-[#111111] px-7 pb-8 pt-7 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E51B24] lg:h-[275px] lg:max-w-[604px]"
    >
      {/* Decorative corner circle */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 size-[150px] rounded-full bg-[#E51B24]/[0.15] transition-colors duration-300 group-hover:bg-[#E51B24]/[0.22]"
      />

      {/* Top row: number / type + arrow */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="font-space-grotesk text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#E63946]">
          {number} / {role.jobType}
        </span>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-white/20 text-white transition-colors duration-300 group-hover:border-[#E63946] group-hover:bg-[#E63946]">
          <ArrowUpRight size={16} aria-hidden />
        </span>
      </div>

      {/* Bottom block */}
      <div className="relative z-10 flex flex-col">
        <h3 className="font-space-grotesk text-[28px] font-bold leading-[1.1] text-white">
          {role.title}
        </h3>
        <p className="mt-3 max-w-[520px] font-space-grotesk text-[14px] font-normal leading-[22px] text-white/55">
          {role.description}
        </p>

        {role.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="flex h-6 items-center rounded-[4px] bg-white/10 px-2.5 font-space-grotesk text-[10px] font-medium uppercase leading-none tracking-[0.06em] text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function OpenRolesSection({
  eyebrow = "We're hiring",
  titleWhite = "OPEN",
  titleRed = "ROLES",
  description = "Find your next opportunity at Rokai. Explore available positions and become part of a team that builds with purpose.",
  searchPlaceholder = "Search positions...",
  allDepartmentsLabel = "All Departments",
  allJobTypesLabel = "All Job Types",
  roles = DEFAULT_ROLES,
}: OpenRolesSectionProps) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [jobType, setJobType] = useState("");

  const departments = useMemo(
    () => Array.from(new Set(roles.map((r) => r.department))),
    [roles]
  );
  const jobTypes = useMemo(
    () => Array.from(new Set(roles.map((r) => r.jobType))),
    [roles]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roles.filter((r) => {
      if (department && r.department !== department) return false;
      if (jobType && r.jobType !== jobType) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [roles, query, department, jobType]);

  return (
    <SectionGlow className="relative overflow-hidden">
      <div id="career-opportunities" className="scroll-mt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="m-5 my-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between lg:mx-25"
        >
          <div>
            <div className="mb-3 flex items-center gap-6">
              <span className="font-space-grotesk text-xs uppercase tracking-widest text-white/70">
                {eyebrow}
              </span>
              <span aria-hidden className="h-px w-10 bg-[#E51B24]" />
            </div>

            <h2 className="font-space-grotesk text-3xl font-bold uppercase leading-[1.1] md:text-4xl lg:text-5xl">
              <span className="text-white">{titleWhite} </span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #E51B24 0%, #690106 100%)" }}
              >
                {titleRed}
              </span>
            </h2>
          </div>

          <p className="max-w-xs border-l-2 border-[#E51B24] pl-4 text-sm text-white/60">
            {description}
          </p>
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-[1330px] px-5 pb-20 sm:px-8 lg:px-[30px]">
          {/* Filters */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1.7fr_1fr_1fr]">
            <div className="relative w-full">
              <Search
                size={15}
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search positions"
                className={`${controlClass} pl-10 placeholder:text-white/40`}
              />
            </div>

            <FilterSelect
              ariaLabel="Filter by department"
              value={department}
              onChange={setDepartment}
              allLabel={allDepartmentsLabel}
              options={departments}
            />
            <FilterSelect
              ariaLabel="Filter by job type"
              value={jobType}
              onChange={setJobType}
              allLabel={allJobTypesLabel}
              options={jobTypes}
            />
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="mx-auto mt-8 grid w-full max-w-[1228px] grid-cols-1 justify-items-center gap-4 lg:grid-cols-2 lg:gap-5">
              {filtered.map((role, i) => (
                <RoleCard key={role.id} role={role} index={i} />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center font-space-grotesk text-sm text-white/50">
              No positions match your search. Try adjusting your filters.
            </p>
          )}
        </div>
      </div>
    </SectionGlow>
  );
}