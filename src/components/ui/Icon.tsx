import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Briefcase,
  ChartColumn,
  ClipboardList,
  Cpu,
  Download,
  FileSearch,
  FileText,
  Globe,
  GraduationCap,
  SquareKanban,
  Landmark,
  Layers,
  LayoutTemplate,
  Lightbulb,
  Mail,
  MapPin,
  Pause,
  Play,
  PenTool,
  School,
  Search,
  Moon,
  Sparkles,
  Sun,
  Users,
  Workflow,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'

const icons = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  book: BookOpen,
  calendar: Calendar,
  briefcase: Briefcase,
  chart: ChartColumn,
  clipboard: ClipboardList,
  cpu: Cpu,
  download: Download,
  file: FileSearch,
  fileText: FileText,
  globe: Globe,
  graduation: GraduationCap,
  kanban: SquareKanban,
  landmark: Landmark,
  layers: Layers,
  layout: LayoutTemplate,
  lightbulb: Lightbulb,
  mail: Mail,
  mapPin: MapPin,
  pause: Pause,
  play: Play,
  pen: PenTool,
  school: School,
  search: Search,
  moon: Moon,
  sparkles: Sparkles,
  sun: Sun,
  users: Users,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons | 'linkedin'

/** lucide ships no brand marks, so LinkedIn is drawn here. */
function LinkedinMark({ size = 24, className }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.76v5.69h-4v-5.04c0-1.2-.02-2.75-1.77-2.75-1.78 0-2.05 1.3-2.05 2.66v5.13h-4v-11Z" />
    </svg>
  )
}

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  if (name === 'linkedin') return <LinkedinMark {...props} />
  const Component = icons[name]
  return <Component aria-hidden="true" strokeWidth={1.6} {...props} />
}
