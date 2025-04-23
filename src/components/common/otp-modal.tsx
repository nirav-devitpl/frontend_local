import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OtpModalProps } from '@/models/otp-model';
import { useTranslation } from 'react-i18next';
import { useVerifyOtpMutation, useForgotPasswordMutation } from '@/services/auth';
import { LoadingIcon } from './icon';
import showToast from '@/components/common/toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { useNavigate } from 'react-router-dom';

const OtpModal = ({ email }: OtpModalProps) => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [otpMutation, { isLoading: isSubmitting }] = useVerifyOtpMutation();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation(); 
  const [disabledBtn, setDisabledBtn] = useState(true);

  const Ref = useRef<any>(null);
  const [timer, setTimer] = useState('00:01:00');

  const getTimeRemaining = (e: Date) => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  const startTimer = (e: Date) => {
    const { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }
  };

  const clearTimer = (e: Date) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const handleSubmit = async () => {
    const otpValue = otp;
    const payload = {
      otp: otpValue,
      email: email,
    };

    otpMutation({ ...payload })
      .unwrap()
      .then((response) => {
      if (response?.status === 'success' || response?.status === 200 || response?.status === 201) {
        console.log(response.result.token);
        navigate(`/auth/reset-password/${response.result.token}`);
      } else {
        showToast(response?.message ?? t('FORGOT_PASSWORD_FORM.ERRORS.VERIFICATION_FAILED'), 'error');
      }
    })
      .catch((err: any) => {
      const errorMessage = err?.data?.message ?? t('FORGOT_PASSWORD_FORM.ERRORS.VERIFICATION_FAILED');
      console.error('Error during OTP verification:', err);
      showToast(errorMessage, 'error');
    });
  };

  const handleResendCode = async () => {
    try {
      const payload = {
        email: email
      };
      await forgotPassword({ ...payload }).unwrap();
      showToast('OTP resent successfully!', 'success');
      clearTimer(getDeadTime());
    } catch (error) {
      console.error('Error while resending OTP:', error);
      showToast('Failed to resend OTP', 'error');
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center font-poppins font-bold text-[20px] text-[#1E1E1E]">
          {t('FORGOT_PASSWORD_FORM.MODAL.TITLE')}
        </DialogTitle>
      </DialogHeader>
      <div className="text-center text-sm text-gray-500 mb-4">
        {t('FORGOT_PASSWORD_FORM.MODAL.DESCRIPTION')}
      </div>
      <div className="flex justify-center gap-2 mb-4">
        <InputOTP
          autoFocus
          className="grid gap-2"
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          onComplete={() => setDisabledBtn(false)}
        >
          <InputOTPGroup>
            <InputOTPSlot className="border-black dark:border-white" index={0} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot className="border-black dark:border-white" index={1} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot className="border-black dark:border-white" index={2} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot className="border-black dark:border-white" index={3} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot className="border-black dark:border-white" index={4} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot className="border-black dark:border-white" index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button
        variant="destructive"
        className="w-full py-2 mb-2 bg-[#E64560] hover:bg-[#E64560]/90 text-white rounded-lg cursor-pointer"
        onClick={handleSubmit}
        disabled={disabledBtn || isSubmitting}
      >
        {isSubmitting ? <LoadingIcon /> : t('FORGOT_PASSWORD_FORM.BUTTONS.VERIFY')}
      </Button>
      <div className="text-center text-sm text-gray-500 mb-2">
        {timer === '00:00:00' ? (
          <Button
            variant="link"
            onClick={handleResendCode}
            disabled={isLoading}
            className="text-[#E64560] font-medium hover:underline cursor-pointer"
          >
            {isLoading ? <LoadingIcon /> : t('FORGOT_PASSWORD_FORM.BUTTONS.RESEND_CODE')}
          </Button>
        ) : (
          <>Resend in {timer}</>
        )}
      </div>
      <div className="text-center text-sm text-gray-500">
        {t('FORGOT_PASSWORD_FORM.MODAL.SUPPORT_MESSAGE')}{' '}
        <a href="/support" className="text-[#E64560] font-medium hover:underline">
          {t('FORGOT_PASSWORD_FORM.MODAL.CONTACT_SUPPORT')}
        </a>
      </div>
    </>
  );
};

export default OtpModal;