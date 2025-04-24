import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/custom/button';
import { Eye, EyeOff, KeyRoundIcon } from '@/components/common/icon';
import { CopyButton } from '../utils/copy-button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PasswordChangeModal from '@/components/common/password-change-modal';
import generatePassword from 'generate-password-browser';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import i18n from '@/assets/i18n';

interface PasswordFieldProps {
    field: any;
    fieldState: any;
    showPassword: boolean;
    setShowPassword: (value: boolean) => void;
    id?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
    field,
    fieldState,
    showPassword,
    setShowPassword,
    id,
}) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePasswordChange = (): void => {
        const newPassword = generatePassword.generate({
            length: 12,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
            strict: true,
        });
        field.onChange(newPassword);
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (field?.form) {
            field.form.reset();
        }
    }, [i18n.language]);

    return (
        <div className="flex items-center gap-2 w-full">
            <div className="relative w-full">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    className={cn('h-9 pr-10 border border-gray-300', {
                        'border-red-500 focus:outline-red-500': fieldState.invalid,
                    })}
                    placeholder={t('PLACEHOLDER.PASSWORD')}
                    {...field}
                />
                <Button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="icon"
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </Button>
            </div>
            <Button
                type="button"
                className="p-1 cursor-pointer"
                onClick={() => (id ? setIsModalOpen(true) : handlePasswordChange())}
                variant="icon"
            >
                <KeyRoundIcon />
            </Button>
            <CopyButton value={field.value} />
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="p-4 w-[400px]">
                    <PasswordChangeModal
                        message={t('MODAL.PASSWORD_CHANGE_CONFIRMATION')}
                        handlePasswordChange={handlePasswordChange}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PasswordField;