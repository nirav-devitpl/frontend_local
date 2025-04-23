import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AlreadyHaveAccount: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="font-poppins font-normal text-[14px] text-center text-[#9095a1]">
            {t('FORGOT_PASSWORD_FORM.ALREADY_HAVE_ACCOUNT')}{' '}
            <Link
                to="/login"
                className="text-[#e64560] font-medium hover:underline"
            >
                {t('FORGOT_PASSWORD_FORM.LOGIN')}
            </Link>
        </div>
    );
};

export default AlreadyHaveAccount;