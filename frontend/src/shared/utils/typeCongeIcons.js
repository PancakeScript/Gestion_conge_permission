const TYPE_CONGE_ICONS = {
  "congé annuel": { icon: "sun", color: "#d4af64" },
  "congé payé": { icon: "sun", color: "#d4af64" },
  "congé maladie": { icon: "heart", color: "#e74c3c" },
  "congé maternité": { icon: "baby", color: "#f472b6" },
  "congé paternité": { icon: "baby", color: "#3b82f6" },
  "congé sans solde": { icon: "briefcase", color: "#6b5c45" },
  "rtt": { icon: "clock", color: "#a78bfa" },
  "congé exceptionnel": { icon: "star", color: "#f59e0b" },
  "congé formation": { icon: "book", color: "#27ae60" },
  "congé sabbatique": { icon: "globe", color: "#06b6d4" },
  "congé parental": { icon: "users", color: "#8b5cf6" },
  "congé déménagement": { icon: "truck", color: "#f97316" },
  "congé mariage": { icon: "heart", color: "#ec4899" },
  "congé décès": { icon: "moon", color: "#64748b" },
};

const DEFAULT_ICON = { icon: "calendar", color: "#6b5c45" };

export function getTypeCongeIcon(nomType) {
  if (!nomType) return DEFAULT_ICON;
  const key = nomType.toLowerCase().trim();
  return TYPE_CONGE_ICONS[key] || DEFAULT_ICON;
}

export function getTypeCongeIconName(nomType) {
  return getTypeCongeIcon(nomType).icon;
}

export function getTypeCongeIconColor(nomType) {
  return getTypeCongeIcon(nomType).color;
}

export default TYPE_CONGE_ICONS;
