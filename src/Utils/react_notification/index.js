import React from "react";
import { NotificationManager } from "react-notifications";

export const reactNotification = (type) => {
  // console.log("type :", type);
  return () => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        alert("callback");
        break;
      case "success":
        NotificationManager.success("Success message", "Title here");
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "error":
        NotificationManager.error("Error message", "Click me!", 5000, () => {
          alert("callback");
        });
        break;
    }
  };
};
