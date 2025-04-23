import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import { TickIcon } from './icon';

/**
 * @memberof module
 * @name LanguageChange
 * @description The LanguageChange component renders a dropdown menu for switching languages with country flags.
 * @returns {JSX.Element} - The rendered language change dropdown component.
 */
export function LanguageChange({
  className,
}: Readonly<React.HTMLAttributes<HTMLElement>>) {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', label: 'English', flag: 'GB' },
    { code: 'de', label: 'Deutsch', flag: 'DE' },
    { code: 'it', label: 'Italiano', flag: 'IT' },
  ];
  const [langIndex, setLangIndex] = useState(
    languages.findIndex((lang) => lang.code === i18n.language) >= 0
      ? languages.findIndex((lang) => lang.code === i18n.language)
      : 0
  );

  const changeLanguage = (index: number) => {
    const selectedLang = languages[index];
    setLangIndex(index);
    i18n.changeLanguage(selectedLang.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="icon"
          size="sm"
          className={`cursor-pointer flex items-center gap-2 rounded-none border-none ${className}`}
        >
          <Flag code={languages[langIndex].flag} className="w-5 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        {languages.map((lang, index) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(index)}
            className="flex items-center justify-between gap-2"
          >
            <span className="flex items-center gap-2">
              <Flag code={lang.flag} className="w-5 h-3" />
              <span>{lang.label}</span>
            </span>
            {langIndex === index && <TickIcon />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}