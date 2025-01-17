import React from 'react';
import { Modal, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useRecoilValue } from 'recoil';
import useModal from '../../hooks/useModal';
import { COLORS } from '../../lib/styles/theme';
import { typography } from '../../lib/styles/typography';
import { ms } from '../../lib/utils/dimensions';
import { isModalVisibleSelector, ModalType, modalTypeSelector } from '../../stores/modal';

const CustomModal = () => {
  const isVisible = useRecoilValue(isModalVisibleSelector);
  const modalType = useRecoilValue(modalTypeSelector);
  const {
    title,
    body,
    singleMessage,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryButtonPress,
    onSecondaryButtonPress,
    resetModal,
  } = useModal();

  const renderContent = () => {
    if (singleMessage) {
      return <Text style={[typography.subTitle_02_M, styles.singleMessage]}>{singleMessage}</Text>;
    }
    
    if (title && body) {
      return (
        <>
          <Text style={[typography.subTitle_02, styles.title]}>{title}</Text>
          <Text style={[typography.body_01_M, styles.body]}>{body}</Text>
        </>
      );
    }
    
    return null;
  };

  const renderButtons = () => {
    const buttonStyles = [styles.button];
    const textStyles = [typography.buttons_01];

    const renderButton = (
      text: string,
      onPress: (() => void) | undefined,
      additionalBtnStyles: ViewStyle[],
      textStyle: TextStyle
    ) => (
      <TouchableOpacity
        style={[...buttonStyles, ...additionalBtnStyles]}
        onPress={onPress || (() => {})}>
        <Text style={[...textStyles, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );

    switch (modalType) {
      case ModalType.SINGLE_BUTTON:
        return renderButton(primaryButtonText, onPrimaryButtonPress, [styles.singleButton], styles.primaryButtonText);
      case ModalType.TWO_BUTTONS:
        return (
          <View style={styles.twoButtonsContainer}>
            {renderButton(secondaryButtonText || '', onSecondaryButtonPress, [styles.secondaryButton, styles.flexButton], styles.secondaryButtonText)}
            {renderButton(primaryButtonText || '', onPrimaryButtonPress, [styles.primaryButton, styles.flexButton], styles.primaryButtonText)}
          </View>
        );
      case ModalType.STACKED_BUTTONS:
        return (
          <View style={styles.stackedButtonsContainer}>
            {renderButton(primaryButtonText, onPrimaryButtonPress, [styles.primaryButton, styles.stackedButton], styles.primaryButtonText)}
            {renderButton(secondaryButtonText || '', onSecondaryButtonPress, [styles.secondaryButton, styles.stackedButton], styles.secondaryButtonText)}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={resetModal}
      statusBarTranslucent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.textWrapper}>
              {renderContent()}
            </View>
            {renderButtons()}
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: ms(342),
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: ms(16),
    paddingTop: ms(24),
    alignItems: 'center',
  },
  textWrapper: {
    marginBottom: ms(24),
    gap: ms(8),
  },
  title: {
    textAlign: 'center',
    color: COLORS.black,
  },
  body: {
    textAlign: 'center',
    color: COLORS.gray.Gray05,
  },
  singleMessage: {
    textAlign: 'center',
    color: COLORS.black,
  },
  button: {
    height: ms(48),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleButton: {
    backgroundColor: COLORS.orange.Orange01,
    width: '100%',
  },
  twoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: ms(8),
  },
  stackedButtonsContainer: {
    width: '100%',
    gap: ms(12),
  },
  primaryButton: {
    backgroundColor: COLORS.orange.Orange01,
  },
  secondaryButton: {
    backgroundColor: COLORS.orange.Orange02,
  },
  flexButton: {
    flex: 1,
  },
  stackedButton: {
    width: '100%',
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  secondaryButtonText: {
    color: COLORS.orange.Orange01,
  },
});

export default CustomModal;
