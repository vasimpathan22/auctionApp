import { Snackbar, Alert, Slide, SlideProps } from "@mui/material";

type Props = {
  message: string;
  open: boolean;
  handleClose: () => void;
  severity: "success" | "error" | "warning" | "info" | undefined;
};

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const GlobalSnackBar = ({ message, handleClose, open, severity }: Props) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%", margin: "30px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackBar;
