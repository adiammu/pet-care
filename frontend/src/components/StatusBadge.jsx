const map = {
  booked: 'badge badge-blue',
  under_care: 'badge badge-yellow',
  medication_given: 'badge badge-blue',
  completed: 'badge badge-green',
  cancelled: 'badge badge-gray'
};

export default function StatusBadge({ status }) {
  const cls = map[status] || 'badge badge-gray';
  const label = status.replace(/_/g, ' ');
  return <span className={cls}>{label}</span>;
}



