import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsAndConditions: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="font-poppins font-normal text-[14px] text-center text-[#9095a1]">
            {t('FORGOT_PASSWORD_FORM.TERMS.DESCRIPTION')}{' '} <br/>
            <a
                href="/terms"
                className="text-[#323743] font-medium hover:underline"
            >
                {t('FORGOT_PASSWORD_FORM.TERMS.TERMS')}
            </a>
            {' '}and{' '}
            <a
                href="/privacy"
                className="text-[#323743] font-medium hover:underline"
            >
                {t('FORGOT_PASSWORD_FORM.TERMS.PRIVACY')}
            </a>
        </div>
    );
};

export default TermsAndConditions;