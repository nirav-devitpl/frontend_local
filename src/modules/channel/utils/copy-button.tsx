import { useState } from 'react';
import { Button } from '@/components/custom/button';
import { CopyIcon } from '@/components/common/icon';

export const CopyButton = ({ value }: { value: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(value || '');
        setIsCopied(true);

        // Reset the copied state after 200ms
        setTimeout(() => {
            setIsCopied(false);
        }, 200);
    };

    return (
        <Button
            type="button"
            variant="icon"
            className={`p-1 text-gray-500 hover:text-gray-700 cursor-pointer ${
                isCopied ? 'border border-[#F81E1E] rounded' : ''
            }`}
            onClick={() => handleCopyClick()}
        >
            <CopyIcon />
        </Button>
    );
};