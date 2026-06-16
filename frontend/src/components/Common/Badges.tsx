import React from "react";

export function statutBadge(statut: string) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    en_attente:        { label: "En attente",   color: "#b8943c", bg: "#fdf6e3" },
    approuve_manager:  { label: "Validé manager",color: "#2563eb", bg: "#eff6ff" },
    approuve_rh:       { label: "Approuvé RH",  color: "#27ae60", bg: "#f0faf4" },
    refuse:            { label: "Refusé",        color: "#e74c3c", bg: "#fef5f5" },
    annule:            { label: "Annulé",        color: "#94a3b8", bg: "#f1f5f9" },
  };
  const s = map[statut] ?? { label: statut, color: "#64748b", bg: "#f1f5f9" };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
      {s.label}
    </span>
  );
}

export function statutEmployeBadge(statut: string) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    actif:  { label: "Actif", color: "#27ae60", bg: "#f0faf4" },
    inactif: { label: "Inactif", color: "#e74c3c", bg: "#fef5f5" },
  };
  const s = map[statut] ?? { label: statut, color: "#64748b", bg: "#f1f5f9" };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
      {s.label}
    </span>
  );
}

export function statutTypeBadge(statut: string) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    actif:  { label: "Actif", color: "#27ae60", bg: "#f0faf4" },
    inactif: { label: "Inactif", color: "#e74c3c", bg: "#fef5f5" },
  };
  const s = map[statut] ?? { label: statut, color: "#64748b", bg: "#f1f5f9" };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
      {s.label}
    </span>
  );
}