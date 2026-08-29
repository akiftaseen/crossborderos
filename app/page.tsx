'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Bell,
  Blocks,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Download,
  ExternalLink,
  FileCheck2,
  FileClock,
  FileText,
  Files,
  Filter,
  Gauge,
  Globe2,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  X,
} from 'lucide-react';

type View =
  | 'Overview'
  | 'Requirements'
  | 'Documents'
  | 'Timeline'
  | 'Reviews'
  | 'Changes'
  | 'Sources';
type Requirement = {
  id: string;
  title: string;
  category: string;
  status: string;
  risk: string;
  owner: string;
  confidence: string;
  due: string;
  description: string;
};
const nav: [typeof LayoutDashboard, View][] = [
  [LayoutDashboard, 'Overview'],
  [ListChecks, 'Requirements'],
  [Files, 'Documents'],
  [Blocks, 'Timeline'],
  [Users, 'Reviews'],
];
const categories = [
  ['Product compliance', 42, 'amber'],
  ['Trade & customs', 76, 'green'],
  ['Corporate', 80, 'green'],
  ['Commercial', 61, 'blue'],
  ['Localization', 37, 'amber'],
  ['Operations', 54, 'blue'],
] as const;
const requirements: Requirement[] = [
  {
    id: 'REQ-001',
    title: 'Wireless equipment type approval',
    category: 'Product compliance',
    status: 'Not started',
    risk: 'High',
    owner: 'Certification partner',
    confidence: 'High',
    due: 'Sep 12',
    description:
      'The integrated Wi-Fi and Bluetooth radio modules may require SIRIM type approval before import and sale in Malaysia.',
  },
  {
    id: 'REQ-002',
    title: 'Bahasa Malaysia packaging review',
    category: 'Localization',
    status: 'In progress',
    risk: 'High',
    owner: 'Meridian Labs',
    confidence: 'Confirmed',
    due: 'Sep 18',
    description:
      'Consumer-facing safety and operating information must be reviewed for local language requirements before packaging is printed.',
  },
  {
    id: 'REQ-003',
    title: 'Confirm tariff classification',
    category: 'Trade & customs',
    status: 'Review',
    risk: 'Medium',
    owner: 'Customs broker',
    confidence: '72%',
    due: 'Sep 08',
    description:
      'Candidate HS code 8525.89 requires verification against the product’s recording and wireless functions.',
  },
  {
    id: 'REQ-004',
    title: 'Importer of record appointment',
    category: 'Corporate',
    status: 'Complete',
    risk: 'Medium',
    owner: 'Meridian MY',
    confidence: 'Confirmed',
    due: 'Completed',
    description:
      'A Malaysian importing party has been identified and its registration details have been collected.',
  },
  {
    id: 'REQ-005',
    title: 'Electrical safety evidence mapping',
    category: 'Product compliance',
    status: 'In progress',
    risk: 'Medium',
    owner: 'Jia Wei',
    confidence: 'High',
    due: 'Sep 14',
    description:
      'Map the existing IEC 62368-1 report to Malaysian approval evidence and confirm laboratory recognition.',
  },
  {
    id: 'REQ-006',
    title: 'Ecommerce returns policy',
    category: 'Commercial',
    status: 'Not started',
    risk: 'Low',
    owner: 'Nadia',
    confidence: 'High',
    due: 'Oct 02',
    description:
      'Prepare Malaysia-specific returns, warranty and customer support terms for direct ecommerce sales.',
  },
];
const documents = [
  [
    'IEC-62368-1-Test-Report.pdf',
    'Safety test report',
    'Intertek',
    'Verified',
    '12.4 MB',
  ],
  [
    'SmartCam-S2-User-Manual.pdf',
    'Technical manual',
    'Meridian Labs',
    'Mapped',
    '4.8 MB',
  ],
  [
    'RF-Test-Report-WiFi.pdf',
    'RF test report',
    'SGS',
    'Review needed',
    '8.1 MB',
  ],
  [
    'Certificate-of-Incorporation.pdf',
    'Company record',
    'HK Companies Registry',
    'Verified',
    '1.2 MB',
  ],
  [
    'Retail-Packaging-v3.pdf',
    'Packaging artwork',
    'Meridian Labs',
    'Gap found',
    '22.7 MB',
  ],
];
const timeline = [
  [
    'Week 1',
    'Classification & audit',
    'Confirm HS code, map existing evidence',
    '3 tasks',
    'current',
  ],
  [
    'Week 2',
    'Prepare & translate',
    'Complete radio pack and packaging translation',
    '4 tasks',
    'next',
  ],
  [
    'Week 3–4',
    'Testing & application',
    'Laboratory review and SIRIM submission',
    '3 tasks',
    'future',
  ],
  [
    'Week 5',
    'Importer setup',
    'Finalize importer declarations and customs packet',
    '2 tasks',
    'future',
  ],
  [
    'Week 6–7',
    'Launch verification',
    'Final evidence check and commercial readiness sign-off',
    '3 tasks',
    'future',
  ],
];

function Button({
  variant = 'default',
  className = '',
  ...props
}: {
  variant?: 'default' | 'outline';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`app-button ${variant === 'outline' ? 'outline' : ''} ${className}`}
      {...props}
    />
  );
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}
const ModalContext = createContext<() => void>(() => {});
function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('keydown', close);
      document.body.style.overflow = previous;
    };
  }, [open, onOpenChange]);
  if (!open) return null;
  return (
    <ModalContext.Provider value={() => onOpenChange(false)}>
      {children}
    </ModalContext.Provider>
  );
}
function DialogContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const close = useContext(ModalContext);
  return (
    <div className="dialog-overlay">
      <dialog open aria-modal="true" className={`dialog-content ${className}`}>
        <button className="dialog-close" onClick={close} aria-label="Close">
          <X />
        </button>
        {children}
      </dialog>
    </div>
  );
}
function DialogHeader({ children }: { children: React.ReactNode }) {
  return <header className="dialog-header">{children}</header>;
}
function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="dialog-title">{children}</h2>;
}
function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="dialog-description">{children}</p>;
}
function DialogFooter({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <footer className={`dialog-footer ${className}`}>{children}</footer>;
}

function Status({ children }: { children: string }) {
  const cls =
    children === 'Complete' || children === 'Verified'
      ? 'complete'
      : children === 'Review' || children.includes('needed')
        ? 'review'
        : children === 'In progress' || children === 'Mapped'
          ? 'progress'
          : children === 'Gap found'
            ? 'risk-status'
            : 'not-started';
  return <span className={`status ${cls}`}>{children}</span>;
}

export default function Home() {
  const [view, setView] = useState<View>('Overview');
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notices, setNotices] = useState(false);
  const [projectMenu, setProjectMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const filtered = useMemo(
    () =>
      requirements.filter((r) =>
        `${r.title} ${r.category} ${r.owner}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const flash = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button
          aria-label="CrossBorderOS home"
          className="brand"
          onClick={() => setView('Overview')}
        >
          <span className="brand-mark">
            <Globe2 />
          </span>
          <span>
            CrossBorder<span>OS</span>
          </span>
        </button>
        <nav aria-label="Primary navigation">
          <p className="eyebrow">Workspace</p>
          {nav.map(([Icon, label]) => (
            <button
              aria-label={label}
              className={`nav-item primary-nav-item ${view === label ? 'active' : ''}`}
              key={label}
              onClick={() => setView(label)}
            >
              <Icon />
              <span>{label}</span>
              {label === 'Reviews' && <b>2</b>}
            </button>
          ))}
          <p className="eyebrow secondary-label">Intelligence</p>
          <button
            aria-label="Changes"
            className={`nav-item intelligence-item ${view === 'Changes' ? 'active' : ''}`}
            onClick={() => setView('Changes')}
          >
            <FileClock />
            <span>Changes</span>
            <b>1</b>
          </button>
          <button
            aria-label="Sources"
            className={`nav-item intelligence-item ${view === 'Sources' ? 'active' : ''}`}
            onClick={() => setView('Sources')}
          >
            <ShieldCheck />
            <span>Sources</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <button className="source-health" onClick={() => setView('Sources')}>
            <ShieldCheck />
            <div>
              <strong>Evidence health</strong>
              <span>14 of 18 verified</span>
            </div>
            <em>78%</em>
          </button>
          <div className="user">
            <div className="avatar">AT</div>
            <div>
              <strong>Akif Taseen</strong>
              <span>Admin · Meridian Labs</span>
            </div>
            <ChevronDown />
          </div>
        </div>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div className="project-menu-wrap">
            <button
              aria-expanded={projectMenu}
              className="project-switcher"
              onClick={() => setProjectMenu(!projectMenu)}
            >
              <span className="flag">MY</span>
              <div>
                <span>Expansion project</span>
                <strong>SmartCam S2 → Malaysia</strong>
              </div>
              <ChevronDown />
            </button>
            {projectMenu && (
              <div className="project-menu">
                <small>CURRENT EXPANSION</small>
                <button
                  onClick={() => {
                    setProjectMenu(false);
                    setView('Overview');
                  }}
                >
                  <span className="flag">MY</span>
                  <div>
                    <strong>SmartCam S2 → Malaysia</strong>
                    <em>58% ready · 3 blockers</em>
                  </div>
                  <CheckCircle2 />
                </button>
                <button
                  className="portfolio-link"
                  onClick={() => {
                    setProjectMenu(false);
                    flash('Expansion portfolio is the next product module');
                  }}
                >
                  View expansion portfolio <ArrowUpRight />
                </button>
              </div>
            )}
          </div>
          <div className="top-actions">
            <button aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search />
            </button>
            <div className="notice-wrap">
              <button
                aria-label="Notifications"
                className="notification"
                onClick={() => setNotices(!notices)}
              >
                <Bell />
                <i />
              </button>
              {notices && (
                <div className="notice-pop">
                  <strong>1 requirement changed</strong>
                  <p>
                    MCMC published updated equipment guidance. No current task
                    was invalidated.
                  </p>
                  <button
                    onClick={() => {
                      setNotices(false);
                      setView('Changes');
                    }}
                  >
                    Review impact <ArrowUpRight />
                  </button>
                </div>
              )}
            </div>
            <Button className="new-project" onClick={() => setNewOpen(true)}>
              <Plus /> New expansion
            </Button>
          </div>
        </header>
        <div className="content">
          {view === 'Overview' && (
            <Overview
              setView={setView}
              openRequirement={setRequirement}
              flash={flash}
            />
          )}{' '}
          {view === 'Requirements' && (
            <Requirements
              rows={requirements}
              openRequirement={setRequirement}
              flash={flash}
            />
          )}{' '}
          {view === 'Documents' && <Documents flash={flash} />}{' '}
          {view === 'Timeline' && <Timeline flash={flash} />}{' '}
          {view === 'Reviews' && <Reviews flash={flash} />}{' '}
          {view === 'Changes' && <Changes openRequirement={setRequirement} />}{' '}
          {view === 'Sources' && <Sources />}
        </div>
      </section>
      <Dialog
        open={!!requirement}
        onOpenChange={(open) => !open && setRequirement(null)}
      >
        <DialogContent className="requirement-dialog">
          {requirement && (
            <>
              <DialogHeader>
                <div className="dialog-meta">
                  <span>{requirement.id}</span>
                  <span
                    className={`risk-level ${requirement.risk.toLowerCase()}`}
                  >
                    {requirement.risk} risk
                  </span>
                </div>
                <DialogTitle>{requirement.title}</DialogTitle>
                <DialogDescription>{requirement.description}</DialogDescription>
              </DialogHeader>
              <div className="detail-grid">
                <div>
                  <span>Status</span>
                  <Status>{requirement.status}</Status>
                </div>
                <div>
                  <span>Confidence</span>
                  <strong>{requirement.confidence}</strong>
                </div>
                <div>
                  <span>Owner</span>
                  <strong>{requirement.owner}</strong>
                </div>
                <div>
                  <span>Deadline</span>
                  <strong>{requirement.due}</strong>
                </div>
              </div>
              <section className="detail-section">
                <h4>Why this applies</h4>
                <p>
                  SmartCam S2 transmits data over 2.4 GHz Wi-Fi and Bluetooth
                  Low Energy. This product relationship brings the radio
                  equipment approval pathway into scope.
                </p>
              </section>
              <section className="evidence-box">
                <ShieldCheck />
                <div>
                  <small>PRIMARY EVIDENCE</small>
                  <strong>
                    Malaysian Communications and Multimedia Commission
                  </strong>
                  <p>
                    Communications and Multimedia (Technical Standards)
                    Regulations · retrieved Aug 29, 2026
                  </p>
                </div>
                <ExternalLink />
              </section>
              <div className="interpretation">
                <Sparkles />
                <div>
                  <strong>AI interpretation</strong>
                  <p>
                    High confidence · 3 official sources · professional
                    verification recommended
                  </p>
                </div>
              </div>
              <DialogFooter className="detail-footer">
                <Button variant="outline" onClick={() => setRequirement(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    flash('Review packet prepared');
                    setRequirement(null);
                  }}
                >
                  Request professional verification
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent className="new-dialog">
          <DialogHeader>
            <div className="dialog-icon">
              <Globe2 />
            </div>
            <DialogTitle>Create an expansion</DialogTitle>
            <DialogDescription>
              Define a new product × market project. You can add documents after
              setup.
            </DialogDescription>
          </DialogHeader>
          <div className="form-grid">
            <label htmlFor="new-product">
              Product
              <Input id="new-product" defaultValue="SmartCam S2" />
            </label>
            <label>
              Target market
              <select defaultValue="Singapore">
                <option>Singapore</option>
                <option>Thailand</option>
                <option>Vietnam</option>
                <option>Indonesia</option>
                <option>Malaysia</option>
              </select>
            </label>
            <label>
              Sales model
              <select>
                <option>Distributor + ecommerce</option>
                <option>Direct B2B</option>
                <option>Ecommerce only</option>
              </select>
            </label>
            <label htmlFor="new-launch">
              Target launch
              <Input id="new-launch" type="date" defaultValue="2026-12-15" />
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setNewOpen(false);
                flash('Singapore expansion draft created');
              }}
            >
              Create draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="search-dialog">
          <DialogHeader>
            <DialogTitle>Search this expansion</DialogTitle>
            <DialogDescription>
              Find a requirement, document, source or owner.
            </DialogDescription>
          </DialogHeader>
          <div className="search-field">
            <Search />
            <Input
              placeholder="Try “wireless” or “customs”…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="search-results">
            {query &&
              filtered.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSearchOpen(false);
                    setRequirement(r);
                  }}
                >
                  <span>
                    <ListChecks />
                  </span>
                  <div>
                    <strong>{r.title}</strong>
                    <small>
                      {r.id} · {r.category}
                    </small>
                  </div>
                  <ArrowUpRight />
                </button>
              ))}
            {query && !filtered.length && <p>No matching project records.</p>}
            {!query && <p>Search across 18 requirements and 23 documents.</p>}
          </div>
        </DialogContent>
      </Dialog>
      {toast && (
        <output className="toast">
          <CheckCircle2 /> {toast}
          <button
            onClick={() => setToast('')}
            aria-label="Dismiss notification"
          >
            <X />
          </button>
        </output>
      )}
    </main>
  );
}

function PageHeading({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="crumb">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {action}
    </div>
  );
}
function Overview({
  setView,
  openRequirement,
  flash,
}: {
  setView: (v: View) => void;
  openRequirement: (r: Requirement) => void;
  flash: (m: string) => void;
}) {
  return (
    <>
      <PageHeading
        eyebrow="EXPANSION / MALAYSIA  •  LAST ANALYSED 2 HOURS AGO"
        title="Malaysia market entry"
        copy="SmartCam S2 · Consumer electronics · B2B + ecommerce"
        action={
          <Button
            variant="outline"
            className="report-button"
            onClick={() => window.print()}
          >
            <FileCheck2 /> Export readiness report
          </Button>
        }
      />
      <div className="demo-notice">
        <CircleAlert />
        <span>
          <strong>Illustrative readiness analysis</strong> · Example project
          data for workflow evaluation—not legal, customs, certification, or
          market-entry clearance.
        </span>
      </div>
      <section className="readiness-panel">
        <div className="score-block">
          <div className="score-ring">
            <div>
              <strong>58</strong>
              <span>%</span>
              <small>READY</small>
            </div>
          </div>
          <div>
            <span className="status-pill">Conditionally viable</span>
            <h2>
              12 actions stand between
              <br />
              this product and launch.
            </h2>
            <p>
              3 blockers require attention. Your target launch is{' '}
              <strong>74 days away.</strong>
            </p>
          </div>
        </div>
        <div className="category-grid">
          {categories.map(([label, value, color]) => (
            <div className="category" key={label}>
              <div>
                <span>{label}</span>
                <strong>{value}%</strong>
              </div>
              <div className="bar">
                <i className={color} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="section-title">
        <div>
          <span className="kicker">
            <CircleAlert /> CRITICAL PATH
          </span>
          <h2>Resolve these before you ship</h2>
        </div>
        <button onClick={() => setView('Requirements')}>
          View all requirements <ArrowUpRight />
        </button>
      </div>
      <section className="blocker-grid">
        {requirements.slice(0, 2).map((r, index) => (
          <article className="blocker-card" key={r.id}>
            <div className="blocker-number">0{index + 1}</div>
            <div className="blocker-copy">
              <div>
                <span className="risk">HIGH RISK</span>
                <span className="due">
                  <Clock3 /> Due {r.due}
                </span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
              <footer>
                <span>
                  {r.owner === 'Meridian Labs'
                    ? 'Company action'
                    : 'Professional review'}
                </span>
                <button onClick={() => openRequirement(r)}>
                  Open requirement <ArrowUpRight />
                </button>
              </footer>
            </div>
          </article>
        ))}
      </section>
      <section className="bottom-grid">
        <article className="next-card">
          <div className="card-title">
            <span>
              <Sparkles />
            </span>
            <div>
              <small>RECOMMENDED NEXT</small>
              <h3>Send technical pack for review</h3>
            </div>
          </div>
          <p>
            Bundle the RF report, user manual, and module datasheets into a
            verified review packet for a Malaysian certification partner.
          </p>
          <div className="doc-row">
            <Files />
            <div>
              <strong>3 of 4 documents ready</strong>
              <span>Missing: Radio module datasheet</span>
            </div>
            <button onClick={() => flash('Technical review packet prepared')}>
              Prepare packet
            </button>
          </div>
        </article>
        <article className="activity-card">
          <div className="card-title">
            <span>
              <Gauge />
            </span>
            <div>
              <small>PROJECT PULSE</small>
              <h3>Moving in the right direction</h3>
            </div>
          </div>
          <div className="pulse-metrics">
            <div>
              <strong>+8%</strong>
              <span>this week</span>
            </div>
            <div>
              <strong>5</strong>
              <span>tasks closed</span>
            </div>
            <div>
              <strong>2</strong>
              <span>reviews pending</span>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
function Requirements({
  rows,
  openRequirement,
  flash,
}: {
  rows: Requirement[];
  openRequirement: (r: Requirement) => void;
  flash: (m: string) => void;
}) {
  const [filter, setFilter] = useState('All');
  const [highOnly, setHighOnly] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const visible = rows.filter(
    (r) =>
      (filter === 'All' || r.category === filter) &&
      (!highOnly || r.risk === 'High'),
  );
  return (
    <>
      <PageHeading
        eyebrow="EXPANSION GRAPH / 18 REQUIREMENTS"
        title="Requirements"
        copy="Every obligation, dependency, evidence source and accountable owner in one auditable view."
        action={
          <Button onClick={() => setAddOpen(true)}>
            <Plus /> Add requirement
          </Button>
        }
      />
      <div className="view-toolbar">
        <div className="filter-tabs">
          {['All', 'Product compliance', 'Trade & customs', 'Localization'].map(
            (f) => (
              <button
                aria-pressed={filter === f}
                className={filter === f ? 'selected' : ''}
                onClick={() => setFilter(f)}
                key={f}
              >
                {f}
              </button>
            ),
          )}
        </div>
        <button
          aria-pressed={highOnly}
          className={`filter-button ${highOnly ? 'selected-filter' : ''}`}
          onClick={() => setHighOnly(!highOnly)}
        >
          <Filter /> {highOnly ? 'Clear risk filter' : 'High risk only'}
        </button>
      </div>
      <section className="requirements-table">
        <div className="table-head">
          <span>Requirement</span>
          <span>Category</span>
          <span>Status</span>
          <span>Risk</span>
          <span>Owner</span>
          <span>Due</span>
          <span />
        </div>
        {visible.map((r) => (
          <button
            className="table-row"
            key={r.id}
            onClick={() => openRequirement(r)}
          >
            <span>
              <small>{r.id}</small>
              <strong>{r.title}</strong>
            </span>
            <span>{r.category}</span>
            <span>
              <Status>{r.status}</Status>
            </span>
            <span>
              <i className={`risk-dot ${r.risk.toLowerCase()}`} />
              {r.risk}
            </span>
            <span>{r.owner}</span>
            <span>{r.due}</span>
            <span>
              <ArrowUpRight />
            </span>
          </button>
        ))}
        {!visible.length && (
          <div className="table-empty">
            No requirements match these filters.
          </div>
        )}
      </section>
      <div className="table-summary">
        <span>
          <ShieldCheck /> 14 requirements have primary evidence
        </span>
        <span>{visible.length} shown of 18 total</span>
      </div>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="new-dialog">
          <DialogHeader>
            <DialogTitle>Add a requirement</DialogTitle>
            <DialogDescription>
              Add a manually discovered obligation to this expansion graph. New
              entries begin as unverified.
            </DialogDescription>
          </DialogHeader>
          <div className="form-grid">
            <label htmlFor="requirement-title">
              Requirement title
              <Input id="requirement-title" placeholder="e.g. Confirm warranty disclosure" />
            </label>
            <label>
              Category
              <select defaultValue="Commercial">
                <option>Product compliance</option>
                <option>Trade & customs</option>
                <option>Corporate</option>
                <option>Commercial</option>
                <option>Localization</option>
                <option>Operations</option>
              </select>
            </label>
            <label htmlFor="requirement-owner">
              Owner
              <Input id="requirement-owner" placeholder="Assign an owner" />
            </label>
            <label htmlFor="requirement-date">
              Target date
              <Input id="requirement-date" type="date" defaultValue="2026-09-30" />
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setAddOpen(false);
                flash('Requirement draft added for verification');
              }}
            >
              Add draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
function Documents({ flash }: { flash: (m: string) => void }) {
  const [panel, setPanel] = useState<'upload' | 'gaps' | null>(null);
  return (
    <>
      <PageHeading
        eyebrow="EVIDENCE VAULT / 23 FILES"
        title="Documents"
        copy="Upload once, map to requirements, and reuse verified evidence across markets."
        action={
          <Button onClick={() => setPanel('upload')}>
            <Upload /> Upload documents
          </Button>
        }
      />
      <section className="gap-banner">
        <div>
          <FileCheck2 />
          <span>
            <small>DOCUMENT GAP ANALYSIS</small>
            <strong>18 of 23 required evidence items are ready</strong>
          </span>
        </div>
        <div className="gap-meter">
          <i style={{ width: '78%' }} />
        </div>
        <button onClick={() => setPanel('gaps')}>
          View 5 gaps <ArrowUpRight />
        </button>
      </section>
      <section className="document-grid">
        {documents.map(([name, type, issuer, status, size]) => (
          <article key={name} className="document-card">
            <div className="file-icon">
              <FileText />
            </div>
            <button
              aria-label={`More actions for ${name}`}
              className="more-button"
              onClick={() => flash(`Document actions opened for ${name}`)}
            >
              <MoreHorizontal />
            </button>
            <h3>{name}</h3>
            <p>
              {type} · {size}
            </p>
            <dl>
              <div>
                <dt>Issuer</dt>
                <dd>{issuer}</dd>
              </div>
              <div>
                <dt>Evidence state</dt>
                <dd>
                  <Status>{status}</Status>
                </dd>
              </div>
            </dl>
            <footer>
              <span>
                <LockKeyhole /> Private
              </span>
              <button onClick={() => flash(`${name} prepared for download`)}>
                <Download /> Download
              </button>
            </footer>
          </article>
        ))}
      </section>
      <Dialog open={panel === 'upload'} onOpenChange={() => setPanel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload evidence</DialogTitle>
            <DialogDescription>
              Add test reports, certificates, manuals or packaging. Files are
              classified and mapped to requirements after upload.
            </DialogDescription>
          </DialogHeader>
          <button
            className="upload-drop"
            onClick={() => flash('Choose a sample file from your device')}
          >
            <Upload />
            <strong>Choose files</strong>
            <span>PDF, DOCX, XLSX, JPG or PNG · up to 50 MB</span>
          </button>
          <div className="security-note">
            <LockKeyhole />
            <span>
              Private to Meridian Labs · signed access links · no public-model
              training
            </span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPanel(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setPanel(null);
                flash('Upload workflow ready');
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={panel === 'gaps'} onOpenChange={() => setPanel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>5 evidence gaps</DialogTitle>
            <DialogDescription>
              These items block or weaken current readiness conclusions.
            </DialogDescription>
          </DialogHeader>
          <div className="gap-list">
            {[
              'Radio module datasheet',
              'Bahasa Malaysia label artwork',
              'Importer declaration',
              'Warranty disclosure',
              'Final type approval certificate',
            ].map((gap, index) => (
              <div key={gap}>
                <span>{index + 1}</span>
                <strong>{gap}</strong>
                <Status>{index < 2 ? 'Not started' : 'Review'}</Status>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setPanel(null);
                flash('Gap tasks added to the plan');
              }}
            >
              Add gaps to timeline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
function Timeline({ flash }: { flash: (m: string) => void }) {
  const [dateOpen, setDateOpen] = useState(false);
  return (
    <>
      <PageHeading
        eyebrow="PROJECT PLANNER / TARGET 12 NOV 2026"
        title="Path to launch"
        copy="A dependency-aware plan generated from your requirements and evidence gaps."
        action={
          <Button variant="outline" onClick={() => setDateOpen(true)}>
            <CalendarDays /> Adjust launch date
          </Button>
        }
      />
      <section className="timeline-summary">
        <div>
          <small>TARGET LAUNCH</small>
          <strong>12 Nov</strong>
          <span>74 days away</span>
        </div>
        <div>
          <small>CRITICAL PATH</small>
          <strong>7 weeks</strong>
          <span>2 reviews can run in parallel</span>
        </div>
        <div>
          <small>REQUIREMENTS</small>
          <strong>18</strong>
          <span>6 completed · 3 blocked</span>
        </div>
        <div>
          <small>PLAN CONFIDENCE</small>
          <strong>Medium</strong>
          <span>Certification time unverified</span>
        </div>
      </section>
      <section className="timeline-list">
        {timeline.map(([week, title, copy, count, state], index) => (
          <article key={week} className={`timeline-item ${state}`}>
            <div className="timeline-marker">
              <span>{index + 1}</span>
            </div>
            <div className="timeline-week">
              <small>{week}</small>
              <strong>{title}</strong>
            </div>
            <p>{copy}</p>
            <span className="task-count">{count}</span>
            <button
              aria-label={`Open ${title} tasks`}
              onClick={() => flash(`${title}: ${count}`)}
            >
              <ArrowUpRight />
            </button>
          </article>
        ))}
      </section>
      <div className="human-check">
        <Users />
        <div>
          <strong>Human verification gate</strong>
          <p>
            The plan will pause before certification submission until a
            qualified Malaysian partner verifies product classification and the
            evidence packet.
          </p>
        </div>
        <span>Required</span>
      </div>
      <Dialog open={dateOpen} onOpenChange={setDateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust target launch</DialogTitle>
            <DialogDescription>
              CrossBorderOS will recalculate dependent deadlines and flag tasks
              that no longer fit.
            </DialogDescription>
          </DialogHeader>
          <label className="single-field" htmlFor="launch-date">
            New target date
            <Input id="launch-date" type="date" defaultValue="2026-11-12" />
          </label>
          <div className="impact-note">
            <Clock3 />
            <span>
              <strong>Estimated impact</strong> · Current 7-week critical path
              still fits with 3 weeks of buffer.
            </span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setDateOpen(false);
                flash('Launch plan recalculated');
              }}
            >
              Recalculate plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
function Reviews({ flash }: { flash: (m: string) => void }) {
  return (
    <>
      <PageHeading
        eyebrow="HUMAN VERIFICATION / 2 PENDING"
        title="Professional reviews"
        copy="Give qualified experts a precise question, complete context, and an auditable evidence packet."
        action={
          <Button onClick={() => flash('New review request started')}>
            <Plus /> Request review
          </Button>
        }
      />
      <section className="review-hero">
        <div>
          <span className="review-icon">
            <Users />
          </span>
          <div>
            <small>WHY THIS MATTERS</small>
            <h2>
              AI prepares the decision. Professionals verify what carries risk.
            </h2>
            <p>
              CrossBorderOS routes uncertainty to qualified experts without
              asking them to reconstruct the project from email threads.
            </p>
          </div>
        </div>
        <span className="verified-badge">
          <ShieldCheck /> Professional verification layer
        </span>
      </section>
      <section className="review-list">
        <article>
          <div className="review-avatar">TL</div>
          <div className="review-main">
            <div>
              <span className="risk">HIGH RISK</span>
              <small>SUBMITTED AUG 28</small>
            </div>
            <h3>Verify wireless equipment classification</h3>
            <p>
              Confirm whether SmartCam S2 requires SIRIM type approval and
              identify the appropriate submission path.
            </p>
            <div className="review-packet">
              <FileCheck2 />
              <span>
                <strong>Structured packet</strong>
                <small>
                  1 question · 5 evidence files · 3 official sources
                </small>
              </span>
            </div>
          </div>
          <div className="review-side">
            <Status>Review</Status>
            <span>TechLink Malaysia</span>
            <button onClick={() => flash('Review workspace opened')}>
              Open review <ArrowUpRight />
            </button>
          </div>
        </article>
        <article>
          <div className="review-avatar amber-avatar">CW</div>
          <div className="review-main">
            <div>
              <span className="medium-tag">MEDIUM RISK</span>
              <small>SUBMITTED AUG 29</small>
            </div>
            <h3>Validate candidate HS classification</h3>
            <p>
              Assess candidate code 8525.89 and document the basis for
              classification before the first shipment.
            </p>
            <div className="review-packet">
              <FileCheck2 />
              <span>
                <strong>Structured packet</strong>
                <small>
                  1 question · 4 evidence files · 2 official sources
                </small>
              </span>
            </div>
          </div>
          <div className="review-side">
            <Status>Review</Status>
            <span>Chan Wai Customs</span>
            <button onClick={() => flash('Review workspace opened')}>
              Open review <ArrowUpRight />
            </button>
          </div>
        </article>
      </section>
    </>
  );
}

function Changes({
  openRequirement,
}: {
  openRequirement: (r: Requirement) => void;
}) {
  return (
    <>
      <PageHeading
        eyebrow="CHANGE MONITOR / 1 IMPACT TO REVIEW"
        title="Regulatory changes"
        copy="Track source revisions and identify every requirement, product and project that may be affected."
      />
      <section className="change-alert">
        <FileClock />
        <div>
          <span>IMPACT REVIEW NEEDED</span>
          <h2>Communications equipment guidance updated</h2>
          <p>
            Illustrative source change detected on 29 Aug 2026. The existing
            wireless classification conclusion has not been overwritten.
          </p>
        </div>
        <Status>Review</Status>
      </section>
      <section className="change-history">
        <div className="change-head">
          <span>Version history</span>
          <span>Effective</span>
          <span>Affected</span>
          <span>State</span>
          <span />
        </div>
        <button onClick={() => openRequirement(requirements[0])}>
          <span>
            <small>v4 · CURRENT</small>
            <strong>Equipment type approval guidance</strong>
          </span>
          <span>1 Sep 2026</span>
          <span>1 project · 2 requirements</span>
          <Status>Review</Status>
          <ArrowUpRight />
        </button>
        <div>
          <span>
            <small>v3 · REPLACED</small>
            <strong>Equipment type approval guidance</strong>
          </span>
          <span>15 Mar 2025</span>
          <span>Archived baseline</span>
          <Status>Complete</Status>
          <span />
        </div>
      </section>
      <div className="change-principle">
        <ShieldCheck />
        <div>
          <strong>Change-safe by design</strong>
          <p>
            Source updates create a review task. They never silently convert a
            prior AI interpretation into a new legal fact.
          </p>
        </div>
      </div>
    </>
  );
}

function Sources() {
  const sources = [
    [
      'Malaysian Communications and Multimedia Commission',
      'Regulator',
      '3 requirements',
      'Verified',
    ],
    [
      'Royal Malaysian Customs Department',
      'Customs authority',
      '4 requirements',
      'Verified',
    ],
    [
      'Department of Standards Malaysia',
      'Standards authority',
      '2 requirements',
      'Mapped',
    ],
    [
      'Companies Commission of Malaysia',
      'Government registry',
      '2 requirements',
      'Verified',
    ],
    [
      'Illustrative professional validation note',
      'Professional review',
      '1 requirement',
      'Review needed',
    ],
  ];
  const [selected, setSelected] = useState<string[] | null>(null);
  return (
    <>
      <PageHeading
        eyebrow="EVIDENCE PROVENANCE / 14 VERIFIED"
        title="Sources"
        copy="See what supports each conclusion, who issued it, and when it was last checked."
      />
      <section className="source-summary">
        <div>
          <ShieldCheck />
          <span>
            <strong>78%</strong>
            <small>PRIMARY EVIDENCE COVERAGE</small>
          </span>
        </div>
        <div>
          <strong>14</strong>
          <span>verified sources</span>
        </div>
        <div>
          <strong>3</strong>
          <span>awaiting review</span>
        </div>
        <div>
          <strong>29 Aug</strong>
          <span>last evidence sweep</span>
        </div>
      </section>
      <section className="source-table">
        <div className="source-head">
          <span>Issuing body</span>
          <span>Source type</span>
          <span>Mapped to</span>
          <span>Evidence state</span>
          <span />
        </div>
        {sources.map((source) => {
          const [issuer, type, mapped, status] = source;
          return (
            <div key={issuer}>
              <span>
                <ShieldCheck />
                <strong>{issuer}</strong>
              </span>
              <span>{type}</span>
              <span>{mapped}</span>
              <Status>{status}</Status>
              <button
                aria-label={`Open source record for ${issuer}`}
                onClick={() => setSelected(source)}
              >
                <ExternalLink />
              </button>
            </div>
          );
        })}
      </section>
      <div className="source-foot">
        <CircleAlert />
        <span>
          <strong>Prototype evidence register.</strong> Source names and
          mappings are illustrative until official URLs, passages, effective
          dates, and professional validations are connected.
        </span>
      </div>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <div className="dialog-icon">
                  <ShieldCheck />
                </div>
                <DialogTitle>{selected[0]}</DialogTitle>
                <DialogDescription>
                  Illustrative evidence record. Connect the official URL and
                  preserved passage before relying on this source operationally.
                </DialogDescription>
              </DialogHeader>
              <div className="detail-grid">
                <div>
                  <span>Source type</span>
                  <strong>{selected[1]}</strong>
                </div>
                <div>
                  <span>Mapped to</span>
                  <strong>{selected[2]}</strong>
                </div>
                <div>
                  <span>Evidence state</span>
                  <Status>{selected[3]}</Status>
                </div>
                <div>
                  <span>Retrieved</span>
                  <strong>29 Aug 2026</strong>
                </div>
              </div>
              <div className="interpretation">
                <CircleAlert />
                <div>
                  <strong>Verification required</strong>
                  <p>
                    No external official source URL is connected in this
                    prototype.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setSelected(null)}>Done</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
