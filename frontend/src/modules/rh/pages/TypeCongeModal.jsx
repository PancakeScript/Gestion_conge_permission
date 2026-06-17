import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";

// Types de congés prédéfinis
const TYPES_PREDEFINIS = [
  { value: "", label: "Sélectionner un type de congé", disabled: true },
  { value: "Congé annuel", label: "Congé annuel", icon: "sun", color: "#d4af64" },
  { value: "Congé maladie", label: "Congé maladie", icon: "heart", color: "#e74c3c" },
  { value: "Congé maternité", label: "Congé maternité", icon: "baby", color: "#f472b6" },
  { value: "Congé paternité", label: "Congé paternité", icon: "baby", color: "#3b82f6" },
  { value: "Congé sans solde", label: "Congé sans solde", icon: "briefcase", color: "#6b5c45" },
  { value: "RTT", label: "RTT", icon: "clock", color: "#a78bfa" },
  { value: "Congé exceptionnel", label: "Congé exceptionnel", icon: "star", color: "#f59e0b" },
  { value: "Congé formation", label: "Congé formation", icon: "book", color: "#27ae60" },
  { value: "Congé sabbatique", label: "Congé sabbatique", icon: "globe", color: "#06b6d4" },
  { value: "Congé parental", label: "Congé parental", icon: "users", color: "#8b5cf6" },
  { value: "Congé déménagement", label: "Congé déménagement", icon: "truck", color: "#f97316" },
  { value: "Congé mariage", label: "Congé mariage", icon: "heart", color: "#ec4899" },
  { value: "Congé décès", label: "Congé décès", icon: "moon", color: "#64748b" },
  { value: "Autre", label: "Autre (personnalisé)", icon: "more-horizontal", color: "#94a3b8" },
];

const TypeCongeModal = ({ isOpen, onClose, onSave, typeToEdit = null, existingTypes = [] }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nom: "",
    nomPersonnalise: "",
    duree: "",
    statut: "actif"
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Réinitialiser à l'ouverture
  useEffect(() => {
    if (isOpen) {
      if (typeToEdit) {
        const nomExistant = typeToEdit.nom_types_conge || typeToEdit.nom || "";
        const estPredefini = TYPES_PREDEFINIS.some(t => t.value === nomExistant);
        
        setForm({
          nom: estPredefini ? nomExistant : "Autre",
          nomPersonnalise: estPredefini ? "" : nomExistant,
          duree: typeToEdit.duree || "",
          statut: typeToEdit.statut_types_conge || typeToEdit.statut || "actif"
        });
      } else {
        setForm({ nom: "", nomPersonnalise: "", duree: "", statut: "actif" });
      }
      setStep(1);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, typeToEdit]);

  // Fermer avec Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !isSubmitting) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, isSubmitting, onClose]);

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!form.nom) {
      newErrors.nom = "Veuillez sélectionner un type de congé";
    }
    
    if (form.nom === "Autre" && !form.nomPersonnalise.trim()) {
      newErrors.nomPersonnalise = "Veuillez préciser le nom du type";
    }

    // Vérifier les doublons en création
    if (!typeToEdit) {
      const nomFinal = form.nom === "Autre" ? form.nomPersonnalise.trim() : form.nom;
      if (existingTypes.some(t => 
        (t.nom_types_conge || t.nom || "").toLowerCase() === nomFinal.toLowerCase()
      )) {
        newErrors.nom = "Ce type de congé existe déjà";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (form.duree && (isNaN(form.duree) || parseInt(form.duree) < 0)) {
      newErrors.duree = "La durée doit être un nombre positif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    
    const nomFinal = form.nom === "Autre" ? form.nomPersonnalise.trim() : form.nom;
    const data = {
      nom: nomFinal,
      duree: form.duree ? parseInt(form.duree) : null,
      statut: form.statut
    };

    try {
      await onSave(data);
    } catch (error) {
      setErrors({ submit: error.message || "Une erreur est survenue" });
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const nomFinal = form.nom === "Autre" ? form.nomPersonnalise.trim() : form.nom;
  const optionSelectionnee = TYPES_PREDEFINIS.find(t => t.value === form.nom);
  const isStep1Valid = form.nom && (form.nom !== "Autre" || form.nomPersonnalise.trim());

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(44, 36, 24, 0.6)",
      backdropFilter: "blur(4px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, padding: 20,
      animation: "fadeIn 0.2s ease"
    }} onClick={handleOverlayClick}>
      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 540,
        boxShadow: "0 25px 80px rgba(44, 36, 24, 0.25)",
        animation: "slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex", flexDirection: "column", maxHeight: "90vh"
      }} onClick={e => e.stopPropagation()}>

        {/* EN-TÊTE */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "28px 28px 0" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "linear-gradient(135deg, #fdf6e3, #f5efe0)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <Icon name={typeToEdit ? "edit" : "plus-circle"} size={22} color="#d4af64" />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600,
              color: "#2c2418", margin: "0 0 4px", lineHeight: 1.3
            }}>
              {typeToEdit ? "Modifier le type de congé" : "Nouveau type de congé"}
            </h2>
            <p style={{ fontSize: 13, color: "#a89070", margin: 0 }}>
              {typeToEdit ? "Modifiez les informations du type sélectionné" : "Configurez un nouveau type de congé"}
            </p>
          </div>
          <button onClick={onClose} disabled={isSubmitting} style={{
            width: 36, height: 36, borderRadius: 10, border: "none",
            background: "#f5f0e8", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0,
            color: "#6b5c45", fontSize: 18
          }} title="Fermer">×</button>
        </div>

        {/* ÉTAPES */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 0, padding: "20px 28px", borderBottom: "1px solid #f0ede5"
        }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 600, transition: "all 0.3s",
                  background: step > s ? "#27ae60" : step >= s ? "#d4af64" : "#f0ede5",
                  color: step >= s ? (step > s ? "#fff" : "#2c2418") : "#a89070"
                }}>
                  {step > s ? "✓" : s}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: step >= s ? 600 : 500,
                  color: step >= s ? "#6b5c45" : "#a89070",
                  textTransform: "uppercase", letterSpacing: 0.5
                }}>
                  {s === 1 ? "Type" : s === 2 ? "Détails" : "Validation"}
                </span>
              </div>
              {i < 2 && (
                <div style={{
                  width: 60, height: 2, background: step > s ? "#d4af64" : "#f0ede5",
                  margin: "0 4px", position: "relative", top: -10, transition: "background 0.3s"
                }} />
              )}
            </div>
          ))}
        </div>

        {/* CORPS */}
        <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
          
          {/* ÉTAPE 1 */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 12, fontWeight: 600, color: "#6b5c45",
                  textTransform: "uppercase", marginBottom: 8
                }}>
                  <Icon name="tag" size={14} /> Type de congé *
                </label>
                <select
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value, nomPersonnalise: "" })}
                  style={{
                    width: "100%", padding: "12px 14px", border: `1.5px solid ${errors.nom ? "#e74c3c" : "#e0d8cc"}`,
                    borderRadius: 12, fontSize: 14, color: "#2c2418", background: "#fdfcf8",
                    cursor: "pointer", outline: "none", fontFamily: "'DM Sans', sans-serif",
                    appearance: "none"
                  }}
                >
                  {TYPES_PREDEFINIS.map(option => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.nom && (
                  <p style={{ color: "#e74c3c", fontSize: 12, marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="alert-circle" size={12} /> {errors.nom}
                  </p>
                )}
              </div>

              {form.nom === "Autre" && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontSize: 12, fontWeight: 600, color: "#6b5c45",
                    textTransform: "uppercase", marginBottom: 8
                  }}>
                    <Icon name="edit" size={14} /> Nom personnalisé *
                  </label>
                  <input
                    type="text"
                    value={form.nomPersonnalise}
                    onChange={(e) => setForm({ ...form, nomPersonnalise: e.target.value })}
                    placeholder="Saisissez le nom du type de congé..."
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid ${errors.nomPersonnalise ? "#e74c3c" : "#e0d8cc"}`,
                      borderRadius: 12, fontSize: 14, color: "#2c2418", background: "#fdfcf8",
                      outline: "none", fontFamily: "'DM Sans', sans-serif"
                    }}
                  />
                  {errors.nomPersonnalise && (
                    <p style={{ color: "#e74c3c", fontSize: 12, marginTop: 6 }}>
                      <Icon name="alert-circle" size={12} /> {errors.nomPersonnalise}
                    </p>
                  )}
                </div>
              )}

              {form.nom && form.nom !== "Autre" && optionSelectionnee && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, padding: 14,
                  background: "#fdfcf8", border: "1px solid #e8e0d0", borderRadius: 12, marginTop: 8
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: optionSelectionnee.color + "20",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Icon name={optionSelectionnee.icon} size={24} color={optionSelectionnee.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#2c2418" }}>{optionSelectionnee.label}</div>
                    <div style={{ fontSize: 11, color: "#a89070" }}>Type standard</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ÉTAPE 2 */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 12, fontWeight: 600, color: "#6b5c45",
                  textTransform: "uppercase", marginBottom: 8
                }}>
                  <Icon name="calendar" size={14} /> Durée maximale (jours)
                </label>
                <input
                  type="number"
                  value={form.duree}
                  onChange={(e) => setForm({ ...form, duree: e.target.value })}
                  placeholder="Ex: 30"
                  min="0"
                  style={{
                    width: "100%", padding: "12px 14px", border: `1.5px solid ${errors.duree ? "#e74c3c" : "#e0d8cc"}`,
                    borderRadius: 12, fontSize: 14, color: "#2c2418", background: "#fdfcf8",
                    outline: "none", fontFamily: "'DM Sans', sans-serif"
                  }}
                />
                <p style={{ fontSize: 11, color: "#a89070", marginTop: 6 }}>
                  <Icon name="info" size={10} /> Laissez vide pour une durée illimitée
                </p>
                {errors.duree && (
                  <p style={{ color: "#e74c3c", fontSize: 12, marginTop: 6 }}>
                    <Icon name="alert-circle" size={12} /> {errors.duree}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 12, fontWeight: 600, color: "#6b5c45",
                  textTransform: "uppercase", marginBottom: 8
                }}>
                  <Icon name="toggle-right" size={14} /> Statut initial
                </label>
                <div style={{ display: "flex", gap: 12 }}>
                  {["actif", "inactif"].map(statutOption => (
                    <label key={statutOption} style={{
                      flex: 1, display: "flex", alignItems: "center", gap: 12,
                      padding: 14, borderRadius: 12, cursor: "pointer",
                      border: `2px solid ${form.statut === statutOption ? "#d4af64" : "#e0d8cc"}`,
                      background: form.statut === statutOption ? "#fdf6e3" : "#fdfcf8",
                      transition: "all 0.2s"
                    }}>
                      <input
                        type="radio"
                        name="statut"
                        value={statutOption}
                        checked={form.statut === statutOption}
                        onChange={(e) => setForm({ ...form, statut: e.target.value })}
                        style={{ display: "none" }}
                      />
                      <Icon 
                        name="check-circle" 
                        size={18} 
                        color={form.statut === statutOption ? (statutOption === "actif" ? "#27ae60" : "#e74c3c") : "#ccc"} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "#2c2418" }}>
                          {statutOption === "actif" ? "Actif" : "Inactif"}
                        </div>
                        <div style={{ fontSize: 11, color: "#a89070" }}>
                          {statutOption === "actif" ? "Disponible pour les demandes" : "Masqué pour les employés"}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 */}
          {step === 3 && (
            <div>
              <div style={{
                background: "#fdfcf8", border: "1px solid #e8e0d0",
                borderRadius: 14, padding: 20
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid #f0ede5"
                }}>
                  <Icon name="check-circle" size={32} color="#27ae60" />
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: 18,
                    color: "#2c2418", margin: 0
                  }}>Récapitulatif</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b5c45", fontWeight: 600, textTransform: "uppercase" }}>
                      <Icon name="tag" size={13} /> Nom
                    </span>
                    <span style={{ fontWeight: 600, color: "#2c2418", fontSize: 14 }}>{nomFinal}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b5c45", fontWeight: 600, textTransform: "uppercase" }}>
                      <Icon name="calendar" size={13} /> Durée
                    </span>
                    <span style={{ fontWeight: 600, color: "#2c2418", fontSize: 14 }}>
                      {form.duree ? `${form.duree} jours` : "Illimitée"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b5c45", fontWeight: 600, textTransform: "uppercase" }}>
                      <Icon name="toggle-right" size={13} /> Statut
                    </span>
                    <span style={{
                      padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                      background: form.statut === "actif" ? "#f0faf4" : "#fef5f5",
                      color: form.statut === "actif" ? "#27ae60" : "#e74c3c"
                    }}>
                      {form.statut === "actif" ? "Actif" : "Inactif"}
                    </span>
                  </div>
                </div>
              </div>
              {errors.submit && (
                <p style={{
                  color: "#e74c3c", fontSize: 12, marginTop: 12,
                  padding: "10px 14px", background: "#fef5f5",
                  borderRadius: 10, border: "1px solid #f5c0c0"
                }}>
                  <Icon name="alert-circle" size={14} /> {errors.submit}
                </p>
              )}
            </div>
          )}

        </div>

        {/* PIED */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 28px", borderTop: "1px solid #f0ede5",
          background: "#fdfcf8", borderRadius: "0 0 20px 20px"
        }}>
          <div>
            {step > 1 && (
              <button type="button" onClick={handlePrevious} disabled={isSubmitting} style={{
                padding: "11px 22px", background: "#f0ede5", color: "#6b5c45",
                border: "none", borderRadius: 12, fontWeight: 600, fontSize: 14,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 8
              }}>
                ← Retour
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" onClick={onClose} disabled={isSubmitting} style={{
              padding: "11px 22px", background: "#fff", color: "#6b5c45",
              border: "1.5px solid #e0d8cc", borderRadius: 12, fontWeight: 600,
              fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
            }}>
              Annuler
            </button>
            {step < 3 ? (
              <button type="button" onClick={handleNext} disabled={step === 1 && !isStep1Valid} style={{
                padding: "11px 22px", background: "linear-gradient(135deg, #d4af64, #b8943c)",
                color: "#2c2418", border: "none", borderRadius: 12, fontWeight: 600,
                fontSize: 14, cursor: isStep1Valid || step !== 1 ? "pointer" : "not-allowed",
                fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8,
                opacity: (step === 1 && !isStep1Valid) ? 0.5 : 1
              }}>
                Suivant →
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={isSubmitting} style={{
                padding: "11px 22px", background: "linear-gradient(135deg, #d4af64, #b8943c)",
                color: "#2c2418", border: "none", borderRadius: 12, fontWeight: 600,
                fontSize: 14, cursor: isSubmitting ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8,
                opacity: isSubmitting ? 0.7 : 1
              }}>
                {isSubmitting ? "Enregistrement..." : (typeToEdit ? "Enregistrer" : "Créer le type")}
              </button>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (max-width: 600px) { 
          /* Responsive */
        }
      `}</style>
    </div>
  );
};

export default TypeCongeModal;
