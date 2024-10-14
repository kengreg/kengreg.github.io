const Modal = ({ modalSize, modalType, onClose, content }) => {
  const modalSizeMap = {
    small: "modal-small",
    medium: "modal-medium",
    large: "modal-large",
  };

  //let put default size if no size communicated
  const modalSizeClass = modalSizeMap[modalSize] || "modal-medium";

  return (
    <div className="modal-overlay h-full w-full absolute">
      <div className={`modal ${modalSizeClass} ${modalType}`}>
        <div
          className="modal-content h-full w-full"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <button className="btn btn-closeModal" onClick={onClose}>
          <span className="text-center fs-35px fs-sm-36px fs-md-36px fs-lg-38px">
            ×
          </span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
