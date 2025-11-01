import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { Snackbar, Alert, Slide, type SlideProps } from "@mui/material";

type Severity = "error" | "warning" | "info" | "success";

interface NotificationContextType {
  showNotification: (msg: string, severity: Severity) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
}

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Severity>("info");

  const showNotification = (msg: string, severity: Severity) => {
    setMessage(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const closeNotification = (
    _event?: Event | SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        key={SlideTransition.name}
      >
        <Alert
          onClose={closeNotification}
          variant="filled"
          severity={severity}
          sx={{ width: "80%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
