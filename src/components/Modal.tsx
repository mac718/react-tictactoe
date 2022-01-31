import styles from "./Modal.module.css";

interface BackdropProps {
  onClose: () => void;
}

interface ModalProps {
  onClose: () => void;
  children: any;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const BackDrop: React.FC<BackdropProps> = (props: BackdropProps) => {
    return <div className={styles.backdrop} onClick={props.onClose}></div>;
  };

  const ModalOverlay: React.FC = (props) => {
    return <div className={styles.modal}>{props.children}</div>;
  };
  return (
    <>
      <BackDrop onClose={props.onClose} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
