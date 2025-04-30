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
import { LanguageIcon, TickIcon } from './icon';
import { TooltipProvider } from '../ui/tooltip';

interface LanguageChangeProps {
  isCollapsed: boolean;
  className?: string;
  isHeader?: boolean;
}

/**
 * @memberof module
 * @name LanguageChange
 * @description The LanguageChange component renders a dropdown menu for switching languages with country flags.
 * @returns {JSX.Element} - The rendered language change dropdown component.
 */
export function LanguageChange({
  isCollapsed,
  className,
  isHeader,
}: Readonly<LanguageChangeProps>) {
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
    <TooltipProvider delayDuration={0}>
      {isCollapsed ? (        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="icon"
              size="sm"
              className={`cursor-pointer group relative flex mb-2 w-11 h-11 justify-between p-3 ml-1 rounded-full bg-slate-50 border border-slate-200 hover:border-[#e64560] hover:text-[#e64560]  ${className}`}
            >
              <LanguageIcon />
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
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
              <button
                type="button"
                className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-[#475569] hover:text-[#e64560] h-10 justify-start text-wrap rounded-none px-5 font-poppins font-normal text-base leading-6 tracking-normal cursor-pointer"
              >
                <div className="mr-2 p-1">
                  <LanguageIcon />
                </div>
                {isHeader ? '' : 'Change Language'}
              </button>
            </nav>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            {languages.map((lang, index) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(index)}
                className="flex items-center justify-between gap-2 cursor-pointer"
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
      )}
    </TooltipProvider>
  );
}