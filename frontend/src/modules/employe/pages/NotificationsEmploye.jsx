import { useState, useEffect } from "react";
import { useAuth } from "../../../shared/context/AuthContext";

const NotificationsEmploye = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notifications", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const marquerLue = async (id) => {
    await fetch(`http://localhost:3000/api/notifications/${id}/lire`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setNotifications(notifs =>
      notifs.map(n => (n.id_notification === id ? { ...n, statut_notification: "lu" } : n))
    );
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.length === 0 && <p className="text-gray-500">Aucune notification.</p>}
        {notifications.map(notif => (
          <div
            key={notif.id_notification}
            className={`p-4 rounded-lg border ${
              notif.statut_notification === "non_lu"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-white border-gray-200"
            }`}
          >
            <p>{notif.message}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">
                {new Date(notif.date_envoie_notification).toLocaleString()}
              </span>
              {notif.statut_notification === "non_lu" && (
                <button
                  onClick={() => marquerLue(notif.id_notification)}
                  className="text-xs text-blue-600 underline"
                >
                  Marquer comme lue
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsEmploye;
