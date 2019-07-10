import React from "react";
import { connect } from "react-redux";
import TestModal from "./TestModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import SocialLoginModal from "./SocialLoginModal";

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal,
  SocialLoginModal
};

const mapStateToProps = state => ({
  currentModal: state.modals
});

const ModalManager = ({ currentModal }) => {
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

export default connect(mapStateToProps)(ModalManager);
