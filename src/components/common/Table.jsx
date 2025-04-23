import React from "react";
import { FunnelPlus } from "lucide-react";

const Table = ({ 
  formConfig, 
  data, 
  emptyMessage = "No items found.",
  onScroll
}) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="flex items-center justify-between border-b bg-gray-50 p-4">
        {formConfig.map((field) => (
          <div key={field.name} className="w-1/6 flex items-center">
            <span className="text-base text-[#1D4ED8]">{field.label}</span>
            {field.name === "username" && (
              <FunnelPlus
                size={16}
                color="#1D4ED8"
                className="ml-2 cursor-pointer"
                onClick={field.sortHandler}
              />
            )}
            {field.name === "role" && (
              <FunnelPlus
                size={16}
                color="#1D4ED8"
                className="ml-2 cursor-pointer"
                onClick={field.sortHandler}
              />
            )}
          </div>
        ))}
      </div>

      <div
        className="max-h-[500px] overflow-y-scroll"
        onScroll={onScroll}
      >
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-center justify-between p-4 border-t text-sm"
            >
              {formConfig.map((field) => {
                if (field.render) {
                  return (
                    <div key={field.name} className="w-1/6">
                      {field.render(item)}
                    </div>
                  );
                }
                                if (field.type === "action" && field.icon) {
                  const Icon = field.icon;
                  return (
                    <div key={field.name} className="w-1/6">
                      <Icon className="h-4 w-4 text-blue-600 hover:text-blue-800 cursor-pointer" />
                    </div>
                  );
                }

                // Default rendering
                return (
                  <div key={field.name} className="w-1/6">
                    {item[field.name]}
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;