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

/**
 * @memberof module
 * @name LanguageChange
 * @description The LanguageChange component renders a dropdown menu for switching languages with country flags.
 * @returns {JSX.Element} - The rendered language change dropdown component.
 */
export function LanguageChange() {
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
          variant="action"
          size="sm"
          className="cursor-pointer flex items-center gap-2 focus:border-none"
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
            {langIndex === index && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}