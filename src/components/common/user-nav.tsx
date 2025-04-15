import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @memberof module
 * @name UserNav
 * @description The UserNav component renders a user profile menu that includes the user's avatar and a switch language option.
 * @returns {JSX.Element} - The rendered user navigation component with a dropdown options.
 */
export function UserNav() {
  const [open, setOpen] = useState(false);

  const languages = ['en', 'de', 'it'];

  const { i18n } = useTranslation();
  const [langIndex, setLangIndex] = useState(0);

  const changeLanguage = () => {
    const nextIndex = (langIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    setLangIndex(nextIndex);
    i18n.changeLanguage(nextLang);
  };

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="action"
          className="relative h-8 w-8 rounded-full p-1 text-gray-500 hover:text-gray-700 cursor-pointer mr-6 mt-2"
          onClick={() => setOpen(!open)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1.19043L9 16.8104" stroke="#323743" strokeWidth="1.704" strokeMiterlimit="10"/>
            <path d="M1.18994 9L16.8099 9" stroke="#323743" strokeWidth="1.704" strokeMiterlimit="10"/>
            <path d="M8.99997 16.8104C11.1566 16.8104 12.905 13.3138 12.905 9.00043C12.905 4.68709 11.1566 1.19043 8.99997 1.19043C6.8433 1.19043 5.09497 4.68709 5.09497 9.00043C5.09497 13.3138 6.8433 16.8104 8.99997 16.8104Z" stroke="#323743" strokeWidth="1.704" strokeMiterlimit="10" strokeLinecap="square"/>
            <path d="M8.99994 16.8104C13.3133 16.8104 16.8099 13.3138 16.8099 9.00043C16.8099 4.68709 13.3133 1.19043 8.99994 1.19043C4.6866 1.19043 1.18994 4.68709 1.18994 9.00043C1.18994 13.3138 4.6866 16.8104 8.99994 16.8104Z" stroke="#323743" strokeWidth="1.704" strokeMiterlimit="10" strokeLinecap="square"/>
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem>
          <Button
            variant="link"
            className="font-normal h-6"
            onClick={changeLanguage}
              >
            Switch Language ({languages[(langIndex + 1) % languages.length]})
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
