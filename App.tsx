
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Users, Truck, Clock, Archive, Settings, 
  LogOut, Bell, Menu, X, Shield, Mail, Gavel, FileText, 
  HelpCircle, MessageSquare, PieChart, Briefcase, GraduationCap,
  Package, Search, Zap, LogIn, UserCircle, Inbox, History, ClipboardList, LifeBuoy,
  FileSearch, Activity, Smartphone, ShieldCheck, Lock, CalendarDays, ClipboardCheck
} from 'lucide-react';
import { 
  User, UserRole, EmploymentStatus, AttendanceRecord, Vehicle, 
  LeaveRecord, ProcurementProposal, AccountRequest, VehicleRequest, 
  AuditLog, OfficeConfig, MailLogEntry, EmailMessage, ElectronicItem,
  VehicleStatus, VehicleType, ProposalStatus, LeaveStatus, LeaveType
} from './types';

// Import all components
import Dashboard from './components/Dashboard';
import VehicleModule from './components/VehicleModule';
import PublicVehicleDashboard from './components/PublicVehicleDashboard';
import Login from './components/Login';
import PpnpnPresence from './components/PpnpnPresence';
import AdminDashboard from './components/AdminDashboard';
import EmployeeManagement from './components/EmployeeManagement';
import PnsProfile from './components/PnsProfile';
import AttendanceReport from './components/AttendanceReport';
import HouseholdModule from './components/HouseholdModule';
import SettingsModule from './components/SettingsModule';
import ProcurementModule from './components/ProcurementModule';
import LeaveModule from './components/LeaveModule';
import PerformanceModule from './components/PerformanceModule';
import SectionPortal from './components/SectionPortal';
import SupportModule from './components/SupportModule';
import UnifiedTicketModule from './components/UnifiedTicketModule';
import MailLog from './components/MailLog';
import SectionManagement from './components/SectionManagement';
import InternModule from './components/InternModule';
import MailboxModule from './components/MailboxModule';
import AuditHistory from './components/AuditHistory';
import SecurityModule from './components/SecurityModule';
import CalendarModule from './components/CalendarModule';

// Initial Mock Data
const INITIAL_USERS: User[] = [
  {
    id: 'ADMIN-01',
    nip: '198501012010011001',
    name: 'Administrator Utama',
    username: 'admin',
    password: '123',
    email: 'admin.kpknlserang@kemenkeu.go.id',
    role: UserRole.ADMIN,
    employmentStatus: EmploymentStatus.PNS,
    section: 'Sub Bagian Umum',
    ttePin: '123456',
    leaveQuota: 12
  },
  {
    id: 'KASI-01',
    nip: '198805122012011002',
    name: 'Hadi Saputra',
    username: 'hadi',
    password: '123',
    email: 'hadi.saputra@kemenkeu.go.id',
    role: UserRole.KSBU,
    employmentStatus: EmploymentStatus.PNS,
    section: 'Sub Bagian Umum',
    leaveQuota: 12
  }
];

const INITIAL_OFFICE: OfficeConfig = {
  name: 'KPKNL Serang',
  address: 'Jl. Raya Serang No. 1, Kota Serang, Banten',
  lat: -6.1189,
  lng: 106.1503,
  radius: 0.1, // 100 meters
};

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('vehicles-public');
  
  // App Global State
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_users');
    const parsed = saved ? JSON.parse(saved) : INITIAL_USERS;
    if (!parsed.find((u: any) => u.username === 'admin')) {
      return [...parsed, ...INITIAL_USERS.filter(iu => iu.username === 'admin')];
    }
    return parsed;
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_attendance');
    return saved ? JSON.parse(saved) : [];
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_vehicles');
    return saved ? JSON.parse(saved) : [
      { id: 'V-01', name: 'Toyota Innova', plateNumber: 'A 1234 XX', type: VehicleType.CAR, status: VehicleStatus.AVAILABLE, category: 'OPERATIONAL', photo: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=400' },
      { id: 'V-02', name: 'Toyota Fortuner', plateNumber: 'A 1 RI', type: VehicleType.CAR, status: VehicleStatus.AVAILABLE, category: 'HEAD_OFFICE', photo: 'https://images.unsplash.com/photo-1621235332613-25501869e5d7?auto=format&fit=crop&q=80&w=400' }
    ];
  });

  const [vehicleRequests, setVehicleRequests] = useState<VehicleRequest[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_vehicle_req');
    return saved ? JSON.parse(saved) : [];
  });

  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_leave');
    return saved ? JSON.parse(saved) : [];
  });

  const [proposals, setProposals] = useState<ProcurementProposal[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_proposals');
    return saved ? JSON.parse(saved) : [];
  });

  const [accountRequests, setAccountRequests] = useState<AccountRequest[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_account_req');
    return saved ? JSON.parse(saved) : [];
  });

  const [mailLogs, setMailLogs] = useState<MailLogEntry[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_mails');
    return saved ? JSON.parse(saved) : [];
  });

  const [emails, setEmails] = useState<EmailMessage[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_internal_emails');
    return saved ? JSON.parse(saved) : [];
  });

  const [inventory, setInventory] = useState<any[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_inventory');
    return saved ? JSON.parse(saved) : [
      { id: 'STK-01', name: 'Paket ATK Standar', stock: 50, unit: 'Set', category: 'ATK', status: 'IN_STOCK' },
      { id: 'STK-02', name: 'Tinta Epson 664 Hitam', stock: 12, unit: 'Botol', category: 'ATK', status: 'IN_STOCK' }
    ];
  });

  const [inventoryRequests, setInventoryRequests] = useState<any[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_inv_req');
    return saved ? JSON.parse(saved) : [];
  });

  const [unifiedTickets, setUnifiedTickets] = useState<any[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_tickets');
    return saved ? JSON.parse(saved) : [];
  });

  const [householdItems, setHouseholdItems] = useState<ElectronicItem[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_electronics');
    return saved ? JSON.parse(saved) : [];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('satu_kpknl_audits');
    return saved ? JSON.parse(saved) : [];
  });

  const [officeConfig, setOfficeConfig] = useState<OfficeConfig>(() => {
    const saved = localStorage.getItem('satu_kpknl_office');
    return saved ? JSON.parse(saved) : INITIAL_OFFICE;
  });

  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [chatMode, setChatMode] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('satu_kpknl_users', JSON.stringify(users));
    localStorage.setItem('satu_kpknl_attendance', JSON.stringify(attendanceRecords));
    localStorage.setItem('satu_kpknl_vehicles', JSON.stringify(vehicles));
    localStorage.setItem('satu_kpknl_vehicle_req', JSON.stringify(vehicleRequests));
    localStorage.setItem('satu_kpknl_leave', JSON.stringify(leaveRecords));
    localStorage.setItem('satu_kpknl_proposals', JSON.stringify(proposals));
    localStorage.setItem('satu_kpknl_account_req', JSON.stringify(accountRequests));
    localStorage.setItem('satu_kpknl_mails', JSON.stringify(mailLogs));
    localStorage.setItem('satu_kpknl_inventory', JSON.stringify(inventory));
    localStorage.setItem('satu_kpknl_inv_req', JSON.stringify(inventoryRequests));
    localStorage.setItem('satu_kpknl_tickets', JSON.stringify(unifiedTickets));
    localStorage.setItem('satu_kpknl_electronics', JSON.stringify(householdItems));
    localStorage.setItem('satu_kpknl_audits', JSON.stringify(auditLogs));
    localStorage.setItem('satu_kpknl_office', JSON.stringify(officeConfig));
    localStorage.setItem('satu_kpknl_internal_emails', JSON.stringify(emails));
  }, [users, attendanceRecords, vehicles, vehicleRequests, leaveRecords, proposals, accountRequests, mailLogs, inventory, inventoryRequests, unifiedTickets, householdItems, auditLogs, officeConfig, emails]);

  const addAudit = (action: string, target: string, impact: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW') => {
    const newAudit: AuditLog = {
      id: `AUD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      action,
      user: currentUser?.name || 'Public User',
      target,
      time: new Date().toLocaleString('id-ID'),
      impact
    };
    setAuditLogs(prev => [newAudit, ...prev]);
  };

  const handleApproveAccount = (id: string) => {
    const req = accountRequests.find(r => r.id === id);
    if (!req) return;

    const newUser: User = {
      id: `USER-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      nip: req.nip,
      name: req.name,
      username: req.username,
      password: '123',
      email: req.email,
      role: req.role,
      section: req.section,
      employmentStatus: req.employmentStatus,
      leaveQuota: req.employmentStatus === EmploymentStatus.PNS ? 12 : 0
    };
    setUsers(prev => [...prev, newUser]);
    setAccountRequests(prev => prev.filter(r => r.id !== id));
    addAudit('APPROVE_ACCOUNT', req.name, 'MEDIUM');
  };

  const handleUpdateAttendance = (id: string, status: AttendanceRecord['status'], approvedBy?: string, tteCode?: string) => {
    const updated = attendanceRecords.map(r => 
      r.id === id ? { ...r, status, approvedBy, tteCode } : r
    );
    setAttendanceRecords(updated);
    addAudit('VERIFIKASI_ABSEN', `ID: ${id} menjadi ${status}`, 'MEDIUM');
  };

  const handleUpdateLeave = (id: string, status: LeaveStatus, approvedBy: string) => {
    const leave = leaveRecords.find(l => l.id === id);
    if (!leave) return;
    
    // Update leave quota if approved
    if (status === LeaveStatus.APPROVED) {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      setUsers(prev => prev.map(u => {
        if (u.id === leave.userId && leave.type === LeaveType.TAHUNAN) {
          return { ...u, leaveQuota: (u.leaveQuota || 0) - diffDays };
        }
        return u;
      }));
    }

    setLeaveRecords(leaveRecords.map(l => l.id === id ? { ...l, status, approvedBy } : l));
    addAudit('VERIFIKASI_CUTI', `ID: ${id} (${leave.type}) menjadi ${status}`, 'MEDIUM');
  };

  const handleApproveVehicleRequest = (requestId: string, vehicleId: string) => {
    const req = vehicleRequests.find(r => r.id === requestId);
    if (!req) return;

    // 1. Update the request status and assign vehicle
    setVehicleRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'APPROVED', assignedVehicleId: vehicleId } : r
    ));

    // 2. Mark the vehicle as BORROWED and set the borrower
    setVehicles(prev => prev.map(v => 
      v.id === vehicleId ? { ...v, status: VehicleStatus.BORROWED, borrower: req.requesterName } : v
    ));

    addAudit('SETUJU_KENDARAAN', `REQ: ${requestId} via UNIT: ${vehicleId}`, 'MEDIUM');
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === UserRole.MAGANG) setActiveTab('intern-hub');
    else setActiveTab('dashboard');
    addAudit('LOGIN', 'Sistem Satu KPKNL', 'LOW');
  };

  const handleLogout = () => {
    addAudit('LOGOUT', 'Sistem Satu KPKNL', 'LOW');
    setCurrentUser(null);
    setActiveTab('vehicles-public');
  };

  const renderContent = () => {
    const isAdminView = [UserRole.ADMIN, UserRole.KSBU].includes(currentUser?.role!);
    const isSpecialistView = [UserRole.ADMIN, UserRole.KSBU, UserRole.KASI].includes(currentUser?.role!);

    switch (activeTab) {
      case 'login':
        return <Login users={users} onLogin={handleLogin} onCancel={() => setActiveTab('vehicles-public')} onRegister={(req) => setAccountRequests([...accountRequests, req])} onForgotPassword={(e) => alert(e)} />;

      case 'dashboard':
        return (currentUser?.role === UserRole.ADMIN || currentUser?.role === UserRole.KSBU) ? 
          <AdminDashboard 
            users={users} attendanceRecords={attendanceRecords} vehicles={vehicles} leaveRecords={leaveRecords} proposals={proposals} accountRequests={accountRequests} vehicleRequests={vehicleRequests} mailLogs={mailLogs}
            onViewLogs={() => setActiveTab('audit')} onUpdateAttendance={handleUpdateAttendance} onUpdateLeave={handleUpdateLeave} onUpdateProposal={(id, s) => setProposals(proposals.map(p => p.id === id ? {...p, status: s} : p))} 
            onApproveVehicle={handleApproveVehicleRequest} onRejectVehicle={(r) => setVehicleRequests(vehicleRequests.map(req => req.id === r ? {...req, status: 'REJECTED'} : req))} 
            onSaveAttendance={(r) => setAttendanceRecords([r, ...attendanceRecords])} onNavigate={(t) => setActiveTab(t)} onApproveAccount={handleApproveAccount}
          /> : <Dashboard onNavigate={(t) => setActiveTab(t)} currentUser={currentUser!} />;
      
      case 'presence':
        return <PpnpnPresence user={currentUser!} onSaveAttendance={(r) => setAttendanceRecords([r, ...attendanceRecords])} existingRecords={attendanceRecords} officeConfig={officeConfig} onClose={() => setActiveTab('dashboard')} />;
      
      case 'presensi-report':
        return <AttendanceReport records={attendanceRecords} users={users} onUpdateRecords={setAttendanceRecords} onUpdateAttendance={handleUpdateAttendance} isAdminView={isSpecialistView} currentUser={currentUser!} />;

      case 'leave':
        return <LeaveModule currentUser={currentUser!} leaveRecords={leaveRecords} onAddLeave={(l) => setLeaveRecords([l, ...leaveRecords])} onUpdateLeave={handleUpdateLeave} isAdminView={isSpecialistView} officeConfig={officeConfig} />;

      case 'mail-log':
        return <MailLog logs={mailLogs} onUpdateLogs={setMailLogs} currentUser={currentUser!} />;

      case 'vehicles':
        return <VehicleModule currentUser={currentUser!} vehicles={vehicles} onUpdateVehicles={setVehicles} />;

      case 'vehicles-public':
        return <PublicVehicleDashboard vehicles={vehicles} onAddRequest={(req) => { setVehicleRequests([req, ...vehicleRequests]); addAudit('PUBLIC_VEHICLE_REQUEST', req.requesterName, 'LOW'); }} vehicleRequests={vehicleRequests} users={users} />;

      case 'household': 
        return <HouseholdModule items={householdItems} user={currentUser!} onUpdateItems={setHouseholdItems} inventory={inventory} setInventory={setInventory} requests={inventoryRequests} setRequests={setInventoryRequests} isAdminView={isAdminView} onAudit={(a, t, i) => addAudit(a, t, i)} tickets={unifiedTickets} setTickets={setUnifiedTickets} />;

      case 'management':
        return <EmployeeManagement currentUser={currentUser!} users={users} accountRequests={accountRequests} onApproveAccount={handleApproveAccount} onRejectAccount={(id) => setAccountRequests(accountRequests.filter(r => r.id !== id))} onUpdateUsers={setUsers} canEditWorkHours={currentUser?.role === UserRole.ADMIN} />;

      case 'mailbox':
        return <MailboxModule user={currentUser!} emails={emails} onUpdateEmails={setEmails} users={users} />;

      case 'tickets':
        return <UnifiedTicketModule user={currentUser!} tickets={unifiedTickets} setTickets={setUnifiedTickets} isAdminView={isSpecialistView} />;

      case 'section-manage':
        return <SectionManagement currentUser={currentUser!} users={users} onUpdateUsers={setUsers} attendanceRecords={attendanceRecords} />;

      case 'calendar':
        return <CalendarModule />;

      case 'intern-hub':
        return <InternModule user={currentUser!} officeConfig={officeConfig} attendanceRecords={attendanceRecords} onUpdateUser={(u) => { setCurrentUser(u); setUsers(users.map(us => us.id === u.id ? u : us)); }} onSaveAttendance={(r) => setAttendanceRecords([r, ...attendanceRecords])} />;

      case 'security':
        return <SecurityModule logs={auditLogs} users={users} />;

      case 'settings':
        return <SettingsModule currentUser={currentUser!} users={users} onUpdateUsers={setUsers} onUpdateSelf={setCurrentUser} officeConfig={officeConfig} onUpdateOfficeConfig={setOfficeConfig} />;

      case 'profile':
        return <PnsProfile user={currentUser!} onUpdateProfile={(u) => { setCurrentUser(u); setUsers(users.map(us => us.id === u.id ? u : us)); }} />;

      case 'section-portal':
        return (
          <SectionPortal 
            user={currentUser!} 
            vehicles={vehicles} 
            vehicleRequests={vehicleRequests} 
            onApproveVehicle={handleApproveVehicleRequest}
            onRejectVehicle={(rId) => setVehicleRequests(vehicleRequests.map(r => r.id === rId ? {...r, status: 'REJECTED'} : r))}
          />
        );

      default:
        return <Dashboard onNavigate={(t) => setActiveTab(t)} currentUser={currentUser!} />;
    }
  };

  // Menu navigation items - Sesuai Permintaan Final
  const isAdmin = [UserRole.ADMIN, UserRole.KSBU].includes(currentUser?.role!);
  
  const navItems = useMemo(() => {
    if (!currentUser) return [];

    // Jika Admin / KSBU
    if (isAdmin) {
      return [
        { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
        { id: 'calendar', label: 'Kalender Kerja', icon: CalendarDays },
        { id: 'management', label: 'Database Pegawai', icon: Users },
        { id: 'section-manage', label: 'Penugasan Staf', icon: Briefcase },
        { id: 'vehicles', label: 'Manajemen Armada', icon: Truck },
        { id: 'household', label: 'Rumah Tangga', icon: Archive },
        { id: 'tickets', label: 'Tiket Layanan', icon: ClipboardList },
        { id: 'presensi-report', label: 'Laporan Presensi', icon: Clock },
        { id: 'leave', label: 'Manajemen Cuti', icon: FileText },
        { id: 'mail-log', label: 'Buku Ekspedisi', icon: History },
        { id: 'security', label: 'Security Center', icon: ShieldCheck },
        { id: 'settings', label: 'Pengaturan', icon: Settings },
      ];
    }

    // Jika Mahasiswa Magang
    if (currentUser.role === UserRole.MAGANG) {
      return [
        { id: 'intern-hub', label: 'Portal Magang', icon: GraduationCap },
        { id: 'calendar', label: 'Kalender Kerja', icon: CalendarDays },
        { id: 'tickets', label: 'Tiket Layanan', icon: ClipboardList }
      ];
    }

    // LOGIKA FINAL: Menu untuk PEGAWAI (PNS/PPNPN)
    return [
      { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
      { id: 'presence', label: 'Presensi Biometrik', icon: Smartphone },
      { id: 'presensi-report', label: 'Laporan Presensi', icon: Clock },
      { id: 'leave', label: 'Menu Cuti', icon: FileText },
      { id: 'tickets', label: 'Pengajuan Tiket', icon: ClipboardList },
      { id: 'section-portal', label: 'Penugasan Khusus', icon: ClipboardCheck },
      { id: 'calendar', label: 'Kalender Kerja', icon: CalendarDays },
      { id: 'settings', label: 'Pengaturan Akun', icon: Settings },
    ];
  }, [currentUser, isAdmin]);

  if (!currentUser && activeTab !== 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="h-20 bg-white border-b border-slate-200 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-black italic shadow-lg">S</div>
              <div>
                 <h1 className="font-black italic tracking-tighter text-lg leading-none uppercase text-slate-900">Satu-Serang</h1>
                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">DJKN Public Portal</p>
              </div>
           </div>
           <button onClick={() => setActiveTab('login')} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl">
              <LogIn className="w-4 h-4" /> Login Pegawai
           </button>
        </header>
        <main className="flex-1 p-6 md:p-12 max-w-screen-2xl mx-auto w-full">
           <PublicVehicleDashboard vehicles={vehicles} onAddRequest={(req) => { setVehicleRequests([req, ...vehicleRequests]); addAudit('PUBLIC_VEHICLE_REQUEST', req.requesterName, 'LOW'); }} vehicleRequests={vehicleRequests} users={users} />
        </main>
      </div>
    );
  }

  if (activeTab === 'login') return <Login users={users} onLogin={handleLogin} onCancel={() => setActiveTab('vehicles-public')} onRegister={(req) => setAccountRequests([...accountRequests, req])} onForgotPassword={(e) => alert(e)} />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row h-full overflow-hidden">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black italic">S</div>
                <div><h1 className="font-black italic tracking-tighter text-xl uppercase leading-none">Satu-Serang</h1><p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-1">Management Hub</p></div>
             </div>
             <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-hide">
             {navItems.map(item => (
               <button key={item.id} onClick={() => { setActiveTab(item.id); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`w-full flex items-center justify-start gap-4 px-6 py-4 rounded-2xl transition-all text-left ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                 <div className="w-6 flex justify-center shrink-0"><item.icon className="w-5 h-5" /></div>
                 <span className="text-[11px] uppercase tracking-wide font-black italic whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>
               </button>
             ))}
          </nav>
          <div className="p-6 bg-black/20 shrink-0">
             <button onClick={handleLogout} className="w-full flex items-center justify-start gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 font-black uppercase tracking-widest text-[10px] text-left">
                <div className="w-6 flex justify-center shrink-0"><LogOut className="w-5 h-5" /></div>
                <span className="italic">Keluar Sistem</span>
             </button>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shrink-0">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 bg-slate-50 text-slate-600 rounded-xl lg:hidden hover:bg-slate-100"><Menu className="w-6 h-6" /></button>
           <div className="flex items-center gap-4 ml-auto">
              <button onClick={() => setIsSupportOpen(true)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm" title="Bantuan AI"><LifeBuoy className="w-5 h-5" /></button>
              <button onClick={() => setActiveTab('profile')} className="flex items-center gap-4 group border-l border-slate-100 pl-4">
                 <div className="text-right hidden md:block"><p className="text-xs font-black italic text-slate-900 group-hover:text-blue-600 transition-colors">{currentUser?.name}</p><p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{currentUser?.section}</p></div>
                 <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg group-active:scale-90 transition-all overflow-hidden">{currentUser?.photo ? <img src={currentUser.photo} className="w-full h-full object-cover" /> : currentUser?.name.charAt(0)}</div>
              </button>
           </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-screen-2xl mx-auto w-full">
           {renderContent()}
        </main>
      </div>
      <SupportModule user={currentUser!} isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} chatMode={chatMode} setChatMode={setChatMode} />
    </div>
  );
};
