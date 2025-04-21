import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OtpModalProps } from '@/models/otp-model';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useOtpMutation } from '@/services/otp';
import { useResendOtpMutation } from '@/services/resend-otp';
import { LoadingIcon } from './icon';

const OtpModal = ({ handleOtp }: OtpModalProps) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpMutation] = useOtpMutation(); 
  const [resendOtpMutation] = useResendOtpMutation();

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    setIsSubmitting(true);
    try {
      // const response = await otpMutation({ otp: otpValue }).unwrap(); 
      // console.log('OTP Verified:', response);
      handleOtp(otpValue); 
      handleOtp(otpValue);
      // Hide the OTP modal and navigate to the reset password page
      window.location.href = '/auth/reset-password'; // Navigate to reset password
    } catch (error) {
      console.error('OTP Verification Failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setTimer(60); 
    try {
      const response = await resendOtpMutation({ email: 'user@example.com' }).unwrap();
      console.log('Resend OTP Success:', response);
    }
    catch (error) {
      console.error('Resend OTP Failed:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
        {otp.map((value, index) => (
          <input
            key={`otp-input-${index}-${Math.random().toString(36).slice(2, 11)}`}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-10 h-10 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        ))}
      </div>
      <Button
        variant="destructive"
        className="w-full py-2 mb-2 bg-[#E64560] text-white rounded-lg cursor-pointer"
        onClick={handleSubmit}
        disabled={isSubmitting}
        >
        {isSubmitting ? (
            <LoadingIcon />
            ) : (
              t('FORGOT_PASSWORD_FORM.BUTTONS.VERIFY')
        )}
      </Button>
      <div className="text-center text-sm text-gray-500 mb-2">
        {timer > 0 ? (
          `00:${timer.toString().padStart(2, '0')}`
        ) : (
          <button
            onClick={handleResendCode}
            className="text-[#E64560] font-medium hover:underline cursor-pointer"
          >
            {t('FORGOT_PASSWORD_FORM.BUTTONS.RESEND_CODE')}
          </button>
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