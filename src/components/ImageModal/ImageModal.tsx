import React from "react";
import Modal from "react-modal";

type ImageModalProps = {
  modalIsOpen: boolean;
  isOpen: (open: boolean) => void;
  selectedImage: { id: string; url: string; title: string } | null;
};

export default function ImageModal({
  modalIsOpen,
  isOpen,
  selectedImage,
}: ImageModalProps) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModal() {
    isOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Modal"
      ariaHideApp={false} // This should be set in the root component, here for simplicity
    >
      <h2>{selectedImage ? selectedImage.title : "Image"}</h2>
      {selectedImage && (
        <div>
          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            width="1024"
            height="768"
          />
        </div>
      )}
    </Modal>
  );
}
