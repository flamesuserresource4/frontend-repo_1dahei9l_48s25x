import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

// Shared UI Primitives (minimal, MD3-inspired)
const Screen = ({ title, actions, children, pad = true }) => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-md px-4 h-14 flex items-center justify-between">
        <button onClick={() => history.back()} className="h-9 w-9 grid place-items-center rounded-full hover:bg-slate-100 text-slate-600" aria-label="Back">
          <span className="i">←</span>
        </button>
        <div className="font-semibold text-slate-800 tracking-tight">{title}</div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </div>
    <div className={`mx-auto max-w-md ${pad ? 'p-4' : ''} pb-24`}>{children}</div>
    <BottomNav />
  </div>
)

const BottomNav = () => (
  <div className="fixed bottom-0 inset-x-0 z-10">
    <div className="mx-auto max-w-md px-4 pb-4">
      <div className="bg-white shadow/10 shadow-slate-400/20 border border-slate-200 rounded-2xl p-2 grid grid-cols-5 gap-1">
        <NavIcon to="/" label="Index" icon="🏠" />
        <NavIcon to="/admin/dashboard" label="Admin" icon="📊" />
        <NavIcon to="/employee/home" label="Employee" icon="👤" />
        <NavIcon to="/analytics" label="Analytics" icon="📈" />
        <NavIcon to="/chat/list" label="Chat" icon="💬" />
      </div>
    </div>
  </div>
)

const NavIcon = ({ to, label, icon }) => (
  <Link to={to} className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl hover:bg-slate-50">
    <div className="text-xl">{icon}</div>
    <div className="text-[11px] text-slate-500">{label}</div>
  </Link>
)

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>{children}</div>
)

const SectionTitle = ({ children }) => (
  <div className="text-sm font-medium text-slate-600 px-1 mb-2 mt-4">{children}</div>
)

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'w-full h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.99] transition'
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50',
    subtle: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</button>
  )
}

const Input = ({ label, placeholder, type = 'text' }) => (
  <label className="block">
    <div className="text-sm text-slate-600 mb-1 px-1">{label}</div>
    <input type={type} placeholder={placeholder} className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
  </label>
)

const Select = ({ label, children }) => (
  <label className="block">
    <div className="text-sm text-slate-600 mb-1 px-1">{label}</div>
    <select className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">{children}</select>
  </label>
)

const Chip = ({ children, active }) => (
  <button className={`px-3 h-9 rounded-full border text-sm ${active ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-slate-600 border-slate-200'} `}>{children}</button>
)

const Placeholder = ({ height = 120, label = 'Chart' }) => (
  <div className="w-full bg-slate-100 border border-dashed border-slate-300 rounded-xl grid place-items-center text-slate-400" style={{ height }}>{label}</div>
)

// 1. Splash Screen
const Splash = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 grid place-items-center p-8">
    <div className="max-w-md w-full text-center">
      <Card className="p-10">
        <div className="text-5xl mb-4">🌀</div>
        <div className="text-2xl font-semibold text-slate-800">HRMS Performance Tracker</div>
        <div className="text-slate-500 mt-2">Enterprise workforce insights</div>
        <div className="mt-6 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-blue-600 rounded-full animate-pulse" />
        </div>
        <div className="text-xs text-slate-400 mt-2">Loading...</div>
      </Card>
      <div className="mt-6"><Link to="/login/selection"><Button>Continue</Button></Link></div>
    </div>
  </div>
)

// 2. Login Selection
const LoginSelection = () => (
  <Screen title="Login">
    <div className="space-y-4">
      <Link to="/login/admin"><Button>Admin Login</Button></Link>
      <Link to="/login/employee"><Button variant="outline">Employee Login</Button></Link>
    </div>
  </Screen>
)

// 3. Admin Login
const AdminLogin = () => (
  <Screen title="Admin Login">
    <div className="space-y-4">
      <Input label="Email" placeholder="admin@company.com" type="email" />
      <Input label="Password" placeholder="••••••••" type="password" />
      <Button>Login</Button>
      <div className="text-center"><Link to="#" className="text-sm text-blue-700">Forgot password?</Link></div>
    </div>
  </Screen>
)

// 4. Employee Login
const EmployeeLogin = () => (
  <Screen title="Employee Login">
    <div className="space-y-4">
      <Input label="Email or Employee ID" placeholder="e.g. E1234 or name@company.com" />
      <Input label="Password" placeholder="••••••••" type="password" />
      <Button>Login</Button>
    </div>
  </Screen>
)

// Shared tiles
const QuickTile = ({ icon, label, to }) => (
  <Link to={to} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3 hover:bg-slate-50">
    <div className="text-2xl">{icon}</div>
    <div className="font-medium text-slate-800">{label}</div>
  </Link>
)

// 5. Admin Dashboard
const AdminDashboard = () => (
  <Screen title="Admin Dashboard" actions={<>
    <button className="h-9 w-9 grid place-items-center rounded-full hover:bg-slate-100">🔔</button>
    <button className="h-9 w-9 grid place-items-center rounded-full hover:bg-slate-100">☰</button>
  </>}>
    <div className="grid grid-cols-2 gap-3">
      {[
        {label: 'Total Employees', value: '142', icon: '👥'},
        {label: 'Pending Tasks', value: '37', icon: '🗂️'},
        {label: 'Avg Performance', value: '84%', icon: '⭐'},
        {label: 'Payroll', value: '$412k', icon: '💸'},
      ].map((c, i) => (
        <Card key={i} className="p-4">
          <div className="text-2xl">{c.icon}</div>
          <div className="text-2xl font-semibold text-slate-800 mt-2">{c.value}</div>
          <div className="text-xs text-slate-500 mt-1">{c.label}</div>
        </Card>
      ))}
    </div>

    <SectionTitle>Quick Access</SectionTitle>
    <div className="grid grid-cols-3 gap-3">
      {[
        ['Employees','/employees','👤'], ['Tasks','/admin/tasks','📝'], ['Reviews','/reviews','⭐'],
        ['Salary','/salary','💰'], ['Attendance','/attendance/mark','📅'], ['Analytics','/analytics','📈']
      ].map(([label, to, icon], i) => (
        <Link key={i} to={to} className="bg-white rounded-2xl border border-slate-200 p-4 text-center hover:bg-slate-50">
          <div className="text-2xl mb-1">{icon}</div>
          <div className="text-xs text-slate-700">{label}</div>
        </Link>
      ))}
    </div>
  </Screen>
)

// 6. Employee Home
const EmployeeHome = () => (
  <Screen title="Employee Home">
    <Card className="p-4 flex items-center gap-4">
      <div className="h-14 w-14 rounded-2xl bg-blue-100 grid place-items-center text-xl">👩‍💼</div>
      <div>
        <div className="font-semibold">Alex Johnson</div>
        <div className="text-sm text-slate-500">Product Design • L5</div>
      </div>
    </Card>

    <div className="grid grid-cols-2 gap-3 mt-3">
      <QuickTile icon="🗒️" label="My Tasks" to="/employee/tasks" />
      <QuickTile icon="🕑" label="My Attendance" to="/attendance/summary" />
      <QuickTile icon="💵" label="My Salary" to="/salary" />
      <QuickTile icon="⭐" label="My Reviews" to="/reviews" />
    </div>

    <SectionTitle>Announcements</SectionTitle>
    <Card className="divide-y">
      {[1,2,3].map(i => (
        <div key={i} className="p-4">
          <div className="font-medium">Quarterly Townhall - Q{i}</div>
          <div className="text-sm text-slate-500 mt-1">Company-wide updates and recognition.</div>
        </div>
      ))}
    </Card>
  </Screen>
)

// 7. Employee List
const EmployeeList = () => (
  <Screen title="Employees">
    <Input label="Search" placeholder="Search by name, dept" />
    <div className="mt-3 space-y-3">
      {[1,2,3,4,5].map(i => (
        <Card key={i} className="p-3 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-slate-100 grid place-items-center">🧑‍💼</div>
          <div className="flex-1">
            <div className="font-medium">Employee {i}</div>
            <div className="text-xs text-slate-500">Engineering</div>
          </div>
          <Link to={`/employees/${i}`} className="text-blue-700 text-sm">View</Link>
        </Card>
      ))}
    </div>
  </Screen>
)

// 8. Add Employee
const AddEmployee = () => (
  <Screen title="Add Employee">
    <div className="space-y-4">
      <Input label="Full Name" placeholder="Jane Doe" />
      <Input label="Email" placeholder="jane@company.com" type="email" />
      <Input label="Phone" placeholder="(555) 123-4567" />
      <Select label="Department">
        <option>Engineering</option>
        <option>HR</option>
        <option>Design</option>
        <option>Finance</option>
      </Select>
      <Select label="Role">
        <option>Manager</option>
        <option>IC</option>
        <option>Intern</option>
      </Select>
      <Input label="Join Date" placeholder="YYYY-MM-DD" type="date" />
      <Button>Add Employee</Button>
    </div>
  </Screen>
)

// 9. Employee Details
const EmployeeDetails = () => (
  <Screen title="Employee Details">
    <Card className="p-4 flex items-center gap-4">
      <div className="h-14 w-14 rounded-2xl bg-blue-100 grid place-items-center text-xl">🧑‍💼</div>
      <div>
        <div className="font-semibold">Employee Name</div>
        <div className="text-sm text-slate-500">Engineering</div>
      </div>
    </Card>
    <div className="grid grid-cols-3 gap-2 mt-3">
      {['Personal','Salary','Attendance','Reviews'].map((t,i)=> (
        <button key={i} className="h-10 bg-white rounded-xl border border-slate-200 text-sm">{t}</button>
      ))}
    </div>
    <Card className="p-4 mt-3">
      <div className="font-medium">Personal Info</div>
      <div className="text-sm text-slate-500 mt-2">Email • Phone • Address</div>
    </Card>
  </Screen>
)

// 10. Admin Task List
const AdminTaskList = () => (
  <Screen title="Tasks">
    <div className="flex gap-2 overflow-auto pb-2">
      {['All','Open','In Progress','Blocked','Done'].map((c,i)=>(<Chip key={i} active={i===0}>{c}</Chip>))}
    </div>
    <div className="mt-3 space-y-3">
      {[1,2,3,4].map(i => (
        <Card key={i} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">Design Review #{i}</div>
              <div className="text-xs text-slate-500 mt-1">Assigned to Alex • Due 2025-11-30</div>
            </div>
            <span className="px-2 py-1 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200">In Progress</span>
          </div>
        </Card>
      ))}
    </div>
  </Screen>
)

// 11. Add Task
const AddTask = () => (
  <Screen title="Add Task">
    <div className="space-y-4">
      <Input label="Title" placeholder="Task title" />
      <label className="block">
        <div className="text-sm text-slate-600 mb-1 px-1">Description</div>
        <textarea className="w-full min-h-[100px] p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" placeholder="Describe the task"></textarea>
      </label>
      <Select label="Priority">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </Select>
      <Input label="Due Date" type="date" />
      <Select label="Assign To">
        <option>Alex</option>
        <option>Jordan</option>
        <option>Taylor</option>
      </Select>
      <Button>Create Task</Button>
    </div>
  </Screen>
)

// 12. Task Details
const TaskDetails = () => (
  <Screen title="Task Details">
    <Card className="p-4 space-y-3">
      <div className="text-lg font-semibold">Website Redesign</div>
      <div className="text-sm text-slate-500">Assigned to Alex • Due 2025-12-01</div>
      <Select label="Status">
        <option>Open</option>
        <option>In Progress</option>
        <option>Blocked</option>
        <option>Done</option>
      </Select>
      <div>
        <div className="text-sm text-slate-600 mb-1 px-1">Progress</div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-blue-600" />
        </div>
      </div>
      <Button variant="subtle">Start Timer ⏱️</Button>
    </Card>
  </Screen>
)

// 13. Performance Review List
const ReviewList = () => (
  <Screen title="Performance Reviews">
    <div className="space-y-3">
      {[1,2,3].map(i => (
        <Card key={i} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Alex Johnson</div>
              <div className="text-xs text-slate-500">Q{i} • 2025</div>
            </div>
            <div className="text-amber-500">★★★★★</div>
          </div>
        </Card>
      ))}
    </div>
  </Screen>
)

// 14. Add Review
const AddReview = () => (
  <Screen title="Add Review">
    <div className="space-y-4">
      <Select label="Employee">
        <option>Alex Johnson</option>
        <option>Jordan Park</option>
      </Select>
      <div>
        <div className="text-sm text-slate-600 mb-1 px-1">Rating</div>
        <div className="text-2xl text-amber-500">★★★★★</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Period Start" type="date" />
        <Input label="Period End" type="date" />
      </div>
      <label className="block">
        <div className="text-sm text-slate-600 mb-1 px-1">Comments</div>
        <textarea className="w-full min-h-[100px] p-4 rounded-xl border border-slate-300"></textarea>
      </label>
      <Button>Submit Review</Button>
    </div>
  </Screen>
)

// 15. Performance Heatmap
const PerformanceHeatmap = () => (
  <Screen title="Performance Heatmap">
    <Card className="p-4">
      <div className="grid grid-cols-7 gap-1">
        {Array.from({length: 7*12}).map((_,i)=> (
          <div key={i} className={`h-6 rounded ${['bg-slate-200','bg-blue-100','bg-blue-200','bg-blue-300','bg-blue-400'][i%5]}`}></div>
        ))}
      </div>
      <div className="text-xs text-slate-500 mt-3">Months vs performance intensity</div>
    </Card>
  </Screen>
)

// 16. Salary Management
const SalaryMgmt = () => (
  <Screen title="Salary Management">
    <div className="space-y-3">
      {[1,2,3].map(i => (
        <Card key={i} className="p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">2025-0{i} Salary</div>
            <div className="text-slate-600">Net: $7,200</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs text-slate-600 mt-2">
            <div className="bg-slate-50 rounded-lg p-2">Base<br/><span className="font-medium text-slate-800">$6,000</span></div>
            <div className="bg-slate-50 rounded-lg p-2">Bonus<br/><span className="font-medium text-slate-800">$1,500</span></div>
            <div className="bg-slate-50 rounded-lg p-2">Deduct<br/><span className="font-medium text-slate-800">$300</span></div>
            <div className="bg-slate-50 rounded-lg p-2">Net<br/><span className="font-medium text-slate-800">$7,200</span></div>
          </div>
        </Card>
      ))}
      <Button>Add Salary</Button>
    </div>
  </Screen>
)

// 17. Salary Slip Preview
const SalarySlip = () => (
  <Screen title="Salary Slip Preview">
    <Card className="p-4">
      <div className="text-center text-sm text-slate-500">Company Inc.</div>
      <div className="text-center text-lg font-semibold">Pay Slip - Nov 2025</div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {['Base','Bonus','Deduction','Net'].map((k,i)=> (
          <div key={i} className="border border-slate-200 rounded-xl p-3 bg-slate-50">
            <div className="text-xs text-slate-500">{k}</div>
            <div className="font-medium">$ {i===3? '7,200' : i===2 ? '300' : i===1 ? '1,500' : '6,000'}</div>
          </div>
        ))}
      </div>
      <div className="mt-6"><Button>Download PDF ⬇️</Button></div>
    </Card>
  </Screen>
)

// 18. Attendance – Mark Attendance
const AttendanceMark = () => (
  <Screen title="Mark Attendance">
    <div className="grid grid-cols-1 gap-3">
      <Card className="p-6 text-center">
        <div className="text-4xl">📷</div>
        <div className="font-medium mt-2">QR Scan</div>
      </Card>
      <Card className="p-6 text-center">
        <div className="text-4xl">📍</div>
        <div className="font-medium mt-2">Geo Check-In</div>
      </Card>
    </div>
  </Screen>
)

// 19. Attendance Summary
const AttendanceSummary = () => (
  <Screen title="Attendance Summary">
    <Card className="p-4">
      <div className="grid grid-cols-7 gap-1">
        {Array.from({length: 35}).map((_,i)=> (
          <div key={i} className={`h-10 rounded grid place-items-center text-xs ${i%7===0? 'bg-red-50 text-red-600' : i%5===0? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>{(i%30)+1}</div>
        ))}
      </div>
      <div className="flex gap-3 text-xs text-slate-500 mt-3">
        <span className="px-2 py-1 rounded bg-green-50 text-green-700">Present</span>
        <span className="px-2 py-1 rounded bg-amber-50 text-amber-700">Half</span>
        <span className="px-2 py-1 rounded bg-red-50 text-red-700">Absent</span>
      </div>
    </Card>
  </Screen>
)

// 20. Analytics Dashboard
const Analytics = () => (
  <Screen title="Analytics">
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Select label="Date Range"><option>Last 90 days</option></Select>
        <Select label="Department"><option>All</option></Select>
      </div>
      <Card className="p-4 space-y-3">
        <div className="font-medium">Performance</div>
        <Placeholder height={120} label="Line Chart" />
      </Card>
      <Card className="p-4 space-y-3">
        <div className="font-medium">Tasks</div>
        <Placeholder height={120} label="Bar Chart" />
      </Card>
      <Card className="p-4 space-y-3">
        <div className="font-medium">Salary Distribution</div>
        <Placeholder height={160} label="Pie Chart" />
      </Card>
    </div>
  </Screen>
)

// 21. Announcement Board
const Announcements = () => (
  <Screen title="Announcements">
    <Card className="divide-y">
      {[1,2,3,4].map(i => (
        <div key={i} className="p-4">
          <div className="font-medium">Announcement Title {i}</div>
          <div className="text-sm text-slate-500 mt-1">Short preview of the announcement content goes here.</div>
        </div>
      ))}
    </Card>
  </Screen>
)

// 22. Chat List
const ChatList = () => (
  <Screen title="Chats">
    <div className="space-y-3">
      {[1,2,3,4].map(i => (
        <Link to={`/chat/${i}`} key={i}>
          <Card className="p-3 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-slate-100 grid place-items-center">💼</div>
            <div className="flex-1">
              <div className="font-medium">Team {i}</div>
              <div className="text-xs text-slate-500">Last message preview...</div>
            </div>
            <div className="text-xs text-slate-400">2m</div>
          </Card>
        </Link>
      ))}
    </div>
  </Screen>
)

// 23. Chat Thread
const ChatThread = () => (
  <Screen title="Chat" pad={false}>
    <div className="p-4 space-y-2">
      {[...Array(10)].map((_,i)=> (
        <div key={i} className={`max-w-[80%] px-3 py-2 rounded-2xl ${i%2? 'ml-auto bg-blue-600 text-white rounded-br-sm':'bg-white border border-slate-200 rounded-bl-sm'}`}>Message {i+1}</div>
      ))}
    </div>
    <div className="fixed bottom-20 inset-x-0">
      <div className="mx-auto max-w-md px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-2 flex items-center gap-2">
          <input className="flex-1 h-10 px-3 rounded-xl focus:outline-none" placeholder="Type a message" />
          <button className="h-10 px-4 rounded-xl bg-blue-600 text-white">Send</button>
        </div>
      </div>
    </div>
  </Screen>
)

// 24. Survey List
const SurveyList = () => (
  <Screen title="Surveys">
    <div className="space-y-3">
      {[1,2,3].map(i => (
        <Card key={i} className="p-4">
          <div className="font-medium">Engagement Survey {i}</div>
          <div className="text-sm text-slate-500 mt-1">5-7 min • 10 questions</div>
        </Card>
      ))}
    </div>
  </Screen>
)

// 25. Take Survey
const TakeSurvey = () => (
  <Screen title="Take Survey">
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-600 mb-1 px-1">1. How satisfied are you?</div>
        <Select label=""><option>Very satisfied</option><option>Neutral</option><option>Unsatisfied</option></Select>
      </div>
      <div>
        <div className="text-sm text-slate-600 mb-1 px-1">2. Rate work-life balance</div>
        <input type="range" className="w-full" />
      </div>
      <label className="block">
        <div className="text-sm text-slate-600 mb-1 px-1">Comments</div>
        <textarea className="w-full min-h-[100px] p-4 rounded-xl border border-slate-300"></textarea>
      </label>
      <Button>Submit Survey</Button>
    </div>
  </Screen>
)

// 26. Training List
const TrainingList = () => (
  <Screen title="Training">
    <div className="space-y-3">
      {[1,2,3].map(i => (
        <Card key={i} className="p-4">
          <div className="font-medium">Security Compliance {i}</div>
          <div className="text-sm text-slate-500 mt-1">3 modules • 45 mins</div>
        </Card>
      ))}
    </div>
  </Screen>
)

// 27. Training Details
const TrainingDetails = () => (
  <Screen title="Course Details">
    <Card className="p-4">
      <div className="font-medium">Security Compliance Basics</div>
      <div className="text-sm text-slate-500">Complete the modules and upload certificate.</div>
      <SectionTitle>Modules</SectionTitle>
      <div className="space-y-2">
        {[1,2,3].map(i => (
          <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-200">Module {i}</div>
        ))}
      </div>
      <SectionTitle>Upload Certificate</SectionTitle>
      <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">Tap to upload</div>
    </Card>
  </Screen>
)

// 28. Goals & OKR
const GoalsOKR = () => (
  <Screen title="Goals & OKR">
    <div className="space-y-3">
      {[1,2].map(i => (
        <Card key={i} className="p-4">
          <div className="font-medium">Goal {i}: Improve NPS</div>
          <div className="mt-2 h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full w-1/2 bg-blue-600"/></div>
        </Card>
      ))}
      <Button>Add Goal</Button>
    </div>
  </Screen>
)

// 29. Feedback Page
const Feedback = () => (
  <Screen title="Feedback">
    <div className="space-y-4">
      <div className="flex items-center justify-between text-3xl px-6">
        <button>😞</button><button>😐</button><button>🙂</button><button>😊</button><button>🤩</button>
      </div>
      <label className="block">
        <div className="text-sm text-slate-600 mb-1 px-1">Comments</div>
        <textarea className="w-full min-h-[120px] p-4 rounded-xl border border-slate-300" placeholder="Share your thoughts"></textarea>
      </label>
      <Button>Submit</Button>
    </div>
  </Screen>
)

// 30. Security Settings
const SecuritySettings = () => (
  <Screen title="Security Settings">
    <Card className="divide-y">
      {[
        ['Biometric Login','Enable fingerprint or device biometrics'],
        ['Face ID','Use device Face ID for quick access'],
      ].map((row,i)=> (
        <div key={i} className="p-4 flex items-center justify-between">
          <div>
            <div className="font-medium">{row[0]}</div>
            <div className="text-xs text-slate-500">{row[1]}</div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:h-5 after:w-5 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 peer-checked:after:translate-x-5 transition"></div>
          </label>
        </div>
      ))}
      <div className="p-4">
        <div className="text-sm text-slate-600 mb-2">Trusted Devices</div>
        <div className="space-y-2">
          {['iPhone 15','MacBook Pro','Pixel 8'].map((d,i)=>(
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
              <div className="text-sm">{d}</div>
              <button className="text-red-600 text-sm">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  </Screen>
)

// 31. Logout Confirmation
const LogoutConfirm = () => {
  const nav = useNavigate()
  return (
    <Screen title="Logout">
      <div className="grid place-items-center py-10">
        <Card className="p-6 max-w-sm w-full text-center">
          <div className="text-lg font-semibold">Are you sure you want to logout?</div>
          <div className="text-sm text-slate-500 mt-1">You can log back in anytime.</div>
          <div className="grid grid-cols-2 gap-2 mt-6">
            <Button variant="outline" onClick={()=> nav(-1)}>Cancel</Button>
            <Button variant="danger">Logout</Button>
          </div>
        </Card>
      </div>
    </Screen>
  )
}

// Index page with links to every screen
const Index = () => (
  <div className="min-h-screen bg-slate-50 p-4">
    <div className="mx-auto max-w-md">
      <div className="text-2xl font-semibold mb-4">HRMS Wireframe System</div>
      <Card className="divide-y">
        {[
          ['Splash','/splash'],
          ['Login Selection','/login/selection'],
          ['Admin Login','/login/admin'],
          ['Employee Login','/login/employee'],
          ['Admin Dashboard','/admin/dashboard'],
          ['Employee Home','/employee/home'],
          ['Employee List','/employees'],
          ['Add Employee','/employees/add'],
          ['Employee Details','/employees/1'],
          ['Admin Task List','/admin/tasks'],
          ['Add Task','/admin/tasks/add'],
          ['Task Details','/admin/tasks/1'],
          ['Performance Review List','/reviews'],
          ['Add Review','/reviews/add'],
          ['Performance Heatmap','/reviews/heatmap'],
          ['Salary Management','/salary'],
          ['Salary Slip Preview','/salary/slip'],
          ['Attendance – Mark','/attendance/mark'],
          ['Attendance Summary','/attendance/summary'],
          ['Analytics Dashboard','/analytics'],
          ['Announcement Board','/announcements'],
          ['Chat List','/chat/list'],
          ['Chat Thread','/chat/1'],
          ['Survey List','/surveys'],
          ['Take Survey','/surveys/take'],
          ['Training List','/training'],
          ['Training Details','/training/1'],
          ['Goals & OKR','/goals'],
          ['Feedback','/feedback'],
          ['Security Settings','/security'],
          ['Logout Confirmation','/logout']
        ].map(([label, to], i)=> (
          <Link key={i} to={to} className="block p-4 hover:bg-slate-50">
            <div className="text-sm text-slate-700">{label}</div>
            <div className="text-xs text-slate-400">{to}</div>
          </Link>
        ))}
      </Card>
    </div>
  </div>
)

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/login/selection" element={<LoginSelection />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/employee" element={<EmployeeLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/employee/home" element={<EmployeeHome />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/employees/add" element={<AddEmployee />} />
      <Route path="/employees/:id" element={<EmployeeDetails />} />
      <Route path="/admin/tasks" element={<AdminTaskList />} />
      <Route path="/admin/tasks/add" element={<AddTask />} />
      <Route path="/admin/tasks/:id" element={<TaskDetails />} />
      <Route path="/reviews" element={<ReviewList />} />
      <Route path="/reviews/add" element={<AddReview />} />
      <Route path="/reviews/heatmap" element={<PerformanceHeatmap />} />
      <Route path="/salary" element={<SalaryMgmt />} />
      <Route path="/salary/slip" element={<SalarySlip />} />
      <Route path="/attendance/mark" element={<AttendanceMark />} />
      <Route path="/attendance/summary" element={<AttendanceSummary />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/chat/list" element={<ChatList />} />
      <Route path="/chat/:id" element={<ChatThread />} />
      <Route path="/surveys" element={<SurveyList />} />
      <Route path="/surveys/take" element={<TakeSurvey />} />
      <Route path="/training" element={<TrainingList />} />
      <Route path="/training/:id" element={<TrainingDetails />} />
      <Route path="/goals" element={<GoalsOKR />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/security" element={<SecuritySettings />} />
      <Route path="/logout" element={<LogoutConfirm />} />
      <Route path="*" element={<Index />} />
    </Routes>
  )
}
