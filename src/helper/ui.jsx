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
