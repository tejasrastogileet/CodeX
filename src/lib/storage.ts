import { Child, BmiRecord, AcceptanceLog } from '@/types';

const KEYS = {
  children: 'aaharmitra_children',
  bmiRecords: 'aaharmitra_bmi_records',
  acceptanceLogs: 'aaharmitra_acceptance_logs',
};

function get<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function set<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Children
export function getChildren(): Child[] {
  return get<Child>(KEYS.children);
}

export function saveChild(child: Child): void {
  const children = getChildren();
  const idx = children.findIndex(c => c.id === child.id);
  if (idx >= 0) children[idx] = child;
  else children.push(child);
  set(KEYS.children, children);
}

export function deleteChild(id: string): void {
  set(KEYS.children, getChildren().filter(c => c.id !== id));
}

// BMI Records
export function getBmiRecords(childId?: string): BmiRecord[] {
  const records = get<BmiRecord>(KEYS.bmiRecords);
  return childId ? records.filter(r => r.childId === childId) : records;
}

export function saveBmiRecord(record: BmiRecord): void {
  const records = getBmiRecords();
  records.push(record);
  set(KEYS.bmiRecords, records);
}

// Acceptance Logs
export function getAcceptanceLogs(): AcceptanceLog[] {
  return get<AcceptanceLog>(KEYS.acceptanceLogs);
}

export function saveAcceptanceLog(log: AcceptanceLog): void {
  const logs = getAcceptanceLogs();
  logs.push(log);
  set(KEYS.acceptanceLogs, logs);
}

// CSV Export
export function exportToCsv(data: Record<string, any>[], filename: string): void {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => `"${String(row[h] ?? '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
