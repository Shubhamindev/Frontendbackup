import React from "react";
import { Copy, Funnel } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = ({
  formConfig,
  data,
  emptyMessage = "No data available",
  onScroll,
  loading,
  error,
  onRetry,
}) => {
  // Calculate grid columns based on formConfig length
  const gridColumnClass = `grid-cols-${formConfig.length}`;
  const gridTemplateColumns = `repeat(${formConfig.length}, minmax(0, 1fr))`;

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!");
  };

  if (loading)
    return (
      <div className="text-center py-12 text-gray-500 font-sans">
        Loading resources...
      </div>
    );

  if (error) {
    return (
      <div className="text-center py-12 font-sans">
        <p className="text-red-600">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-sans">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="relative z-0 font-sans">
        <div className="rounded-xl shadow overflow-x-auto overflow-y-hidden">
          <div className="min-w-full">
            {/* Header Row */}
            <div 
              className="bg-blue-50 text-blue-700 font-semibold text-sm px-4 py-3 sticky top-0 z-0"
              style={{ display: "grid", gridTemplateColumns }}
            >
              {formConfig.map((field) => (
                <div
                  key={field.name}
                  className="px-2 flex items-center whitespace-nowrap"
                >
                  {field.label}
                  {field.sortHandler && (
                    <Funnel
                      size={14}
                      className="ml-2 cursor-pointer hover:text-blue-900"
                      onClick={field.sortHandler}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Data Rows */}
            <div
              className="h-[500px] overflow-y-auto divide-y"
              onScroll={onScroll}
            >
              {data.map((item, index) => (
                <div
                  key={item.id || item.resourceId || index}
                  className="items-center text-sm text-gray-800 hover:bg-gray-50 px-4 py-3 border-t"
                  style={{ display: "grid", gridTemplateColumns }}
                >
                  {formConfig.map((field) => {
                    const key = field.name;

                    if (field.render) {
                      return (
                        <div
                          key={key}
                          className="px-2 truncate whitespace-nowrap"
                        >
                          {field.render(item)}
                        </div>
                      );
                    }

                    if (key === "resourceId") {
                      return (
                        <div key={key} className="px-2 whitespace-nowrap">
                          <div className="flex justify-between items-center gap-2 pr-1">
                            <span className="truncate max-w-[140px]">
                              {item[key]}
                            </span>
                            <Copy
                              size={16}
                              className="flex-shrink-0 text-blue-600 hover:text-blue-800 cursor-pointer"
                              onClick={() => handleCopy(item[key])}
                            />
                          </div>
                        </div>
                      );
                    }

                    if (key === "status") {
                      const status = item[key] || "-";
                      const isRunning =
                        status === "running" || status === "available";
                      return (
                        <div key={key} className="px-2 whitespace-nowrap">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              isRunning
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={key}
                        className="px-2 truncate whitespace-nowrap"
                      >
                        {item[key] || "-"}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;