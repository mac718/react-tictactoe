import styles from "./Modal.module.css";

interface BackdropProps {
  onClose: () => void;
}

interface ModalProps {
  onClose: () => void;
  message: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const BackDrop: React.FC<BackdropProps> = (props: BackdropProps) => {
    return <div className={styles.backdrop} onClick={props.onClose}></div>;
  };

  const ModalOverlay: React.FC = () => {
    return (
      <div className={styles.modal}>
        {props.message}
        {props.children}
      </div>
    );
  };
  return (
    <>
      <BackDrop onClose={props.onClose} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
