export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="text-center px-16 py-6">
      <div className="bg-slate-200 h-16 w-16 rounded-xl flex items-center justify-center mx-auto mb-4">
        {Icon && <Icon size={28} className="text-slate-400" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action}
    </div>
  );
};

export const StatusBadge = ({ status }) => {
  const map = {
    WAITING_PAYMENT: {
      label: "Waiting Payment",
      cls: "bg-yellow-100 text-yellow-700",
    },
    PENDING: {
      label: "Pending",
      cls: "bg-blue-100 text-blue-700",
    },
    CONFIRMED: {
      label: "Confirmed",
      cls: "bg-green-100 text-green-700",
    },
    COMPLETED: {
      label: "Completed",
      cls: "bg-slate-100 text-slate-700",
    },
    CANCELLED: {
      label: "Cancelled",
      cls: "bg-red-100 text-red-700",
    },
    UNPAID: {
      label: "Unpaid",
      cls: "bg-yellow-100 text-yellow-700",
    },
    PAID: {
      label: "Paid",
      cls: "bg-green-100 text-green-700",
    },
    EXPIRED: {
      label: "Expired",
      cls: "bg-red-100 text-red-700",
    },
  };

  const { label, cls } = map[status] || {
    label: status,
    cls: "bg-slate-100 text-slate-700",
  };

  return <span className={`badge ${cls}`}>{label}</span>;
};
