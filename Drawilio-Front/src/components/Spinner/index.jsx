import { TailSpin } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "100px",
      }}
    >
      <TailSpin color="#a4bbd6" ariaLabel="loading-indicator" />
    </div>
  );
};
