
export enum EmploymentStatus {
  PNS = 'PNS',
  PPNPN = 'PPNPN',
  INTERN = 'MAGANG'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  KSBU = 'KSBU',
  KASI = 'KEPALA_SEKSI',
  STAF_TEKNIS = 'STAF_TEKNIS',
  STAF_SUPPORT = 'STAF_SUPPORT',
  PKN = 'PELAYANAN_KEKAYAAN_NEGARA',
  PENILAIAN = 'PELAYANAN_PENILAIAN',
  LELANG = 'PELAYANAN_LELANG',
  PN = 'PIUTANG_NEGARA',
  HI = 'HUKUM_DAN_INFORMASI',
  KI = 'KEPATUHAN_INTERNAL',
  SATPAM = 'SATPAM',
  DRIVER = 'DRIVER',
  PRAMUBAKTI = 'PRAMUBAKTI',
  CS = 'CLEANING_SERVICE',
  MAGANG = 'ANAK_MAGANG'
}

export enum MailStatus {
  PENDING = 'PENDING',
  SENT = 'TERKIRIM',
  RECEIVED = 'DITERIMA',
  RETURNED = 'KEMBALI'
}

export interface EmailMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  content: string;
  date: string;
  time: string;
  isRead: boolean;
  isSystem: boolean;
  type: 'INBOX' | 'SENT' | 'TRASH';
}

export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
  MAINTENANCE = 'MAINTENANCE'
}

export enum PresenceStatus {
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT'
}

export enum VehicleType {
  TRUCK = 'TRUCK',
  CAR = 'CAR',
  MOTORCYCLE = 'MOTORCYCLE'
}

export enum ProposalStatus {
  PROPOSED = 'DIUSULKAN',
  PROCESSING = 'PROSES',
  COMPLETED = 'SELESAI',
  REJECTED = 'DITOLAK'
}

export enum LeaveStatus {
  PENDING = 'MENUNGGU',
  APPROVED = 'DISETUJUI',
  REJECTED = 'DITOLAK'
}

export enum LeaveType {
  TAHUNAN = 'Cuti Tahunan',
  SAKIT = 'Cuti Sakit',
  ALASAN_PENTING = 'Cuti Alasan Penting',
  BESAR = 'Cuti Besar',
  BERSALIN = 'Cuti Bersalin'
}

export interface LeaveRecord {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  appliedAt: string;
  status: LeaveStatus;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  approvedBy?: string;
  attachment?: string;
  attachmentData?: string;
}

export interface MaintenanceInfo {
  senderName: string;
  workshopName: string;
  workshopAddress: string;
  repairedItems?: string;
}

export interface InternLog {
  id: string;
  date: string;
  activity: string;
  startTime: string;
  endTime: string;
  status: 'SUBMITTED' | 'VERIFIED';
}

export interface MailLogEntry {
  id: string;
  letterNumber: string;
  subject: string;
  destination: string;
  date: string;
  status: MailStatus;
  courier: string;
  receiptNumber?: string;
  sender: string;
  attachment?: string;
  attachmentData?: string;
}

export interface OfficeConfig {
  name: string;
  address: string;
  lat: number;
  lng: number;
  radius: number;
  logo?: string; 
}

export interface TrainingRecord {
  id: string;
  name: string;
  hours: string;
  date: string;
  certificateUrl: string;
}

export interface SalaryRecord {
  id: string;
  skNumber: string;
  date: string;
  basicSalary: string;
  description: string;
}

export interface PositionRecord {
  id: string;
  positionName: string;
  section: string;
  startDate: string;
  endDate?: string;
  skNumber: string;
  isCurrent: boolean;
}

export interface User {
  id: string;
  nip: string;
  name: string;
  username: string;
  password?: string;
  ttePin?: string; 
  email: string;
  role: UserRole;
  employmentStatus: EmploymentStatus;
  section?: string;
  photo?: string;
  phone?: string;
  address?: string;
  leaveQuota?: number;
  jobdesk?: string; 
  trainingHistory?: TrainingRecord[];
  positionHistory?: PositionRecord[];
  salaryHistory?: SalaryRecord[];
  internLogs?: InternLog[];
  institution?: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  date: string;
  checkIn: string;
  checkOut: string;
  sessionPhotos?: string[]; 
  status: 'Hadir' | 'Terlambat' | 'Izin' | 'Sakit' | 'Tanpa Keterangan' | 'PENDING_APPROVAL' | 'REJECTED' | 'CUTI' | 'Pulang Cepat' | 'Tugas Luar';
  isOutsideRange: boolean;
  permissionReason?: string;
  approvedBy?: string;
  tteCode?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  target: string;
  time: string;
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ProcurementProposal {
  id: string;
  userId: string;
  userName: string;
  section: string;
  itemProposed: string;
  attachment?: string;
  attachmentData?: string; 
  attachmentSize?: string;
  status: ProposalStatus;
  date: string;
}

export interface AccountRequest {
  id: string;
  name: string;
  username: string;
  nip: string;
  email: string;
  role: UserRole;
  section: string;
  employmentStatus: EmploymentStatus;
  requestDate: string;
}

export interface VehicleRequest {
  id: string;
  requesterName: string;
  section: string;
  purpose: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  assignedVehicleId?: string;
  requestDate: string;
}

export interface ElectronicItem {
  id: string;
  itemName: string;
  itemCode: string;
  quantity: number;
  personName: string;
  section: string;
}

export interface Vehicle {
  id: string;
  name: string;
  plateNumber: string;
  type: VehicleType;
  status: VehicleStatus;
  category: 'OPERATIONAL' | 'HEAD_OFFICE';
  photo?: string;
  borrower?: string;
  maintenanceInfo?: MaintenanceInfo;
}
