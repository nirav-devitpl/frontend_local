import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { removeToken } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

/**
 * @memberof module
 * @name UserNav
 * @description The UserNav component renders a user profile menu that includes the user's avatar and options for profile management and logging out
 * @returns {JSX.Element} - The rendered user navigation component with a dropdown options.
 */
export function UserNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const languages = ['en', 'de', 'it'];

  const { i18n, t } = useTranslation();
  const [langIndex, setLangIndex] = useState(0);

  const changeLanguage = () => {
    const nextIndex = (langIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    setLangIndex(nextIndex);
    i18n.changeLanguage(nextLang);
  };

  /**
   * Function will handle logout logic
   */
  const handleLogout = () => {
    removeToken();
    navigate('/auth/sign-in');
  };
  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          onClick={() => setOpen(!open)}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="dark:bg-background">AU</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Admin User</p>
            <p className="text-xs leading-none text-muted-foreground">Admin</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            <ThemeSwitch />
          </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Link to={'/acl/profile'}>
              <Button
                variant="link"
                className="font-normal h-6"
                onClick={() => setOpen(!open)}
              >
                My Profile
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            
              <Button
                variant="link"
                className="font-normal h-6"
                onClick={changeLanguage}
              >
                Switch Language ({i18n.language})
              </Button>
            
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            onClick={handleLogout}
            variant="link"
            className="font-normal h-6"
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
