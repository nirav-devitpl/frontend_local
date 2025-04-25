import { useNavigate } from "react-router";
import { Button } from "../custom/button";
import { SignoutIcon } from "./icon";

interface LogoutButtonProps {
    isCollapsed: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ isCollapsed }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth/sign-in');
    };

    return (        
        <Button
            className={`cursor-pointer group relative flex items-center gap-0 rounded-none py-6 hover:bg-[#E64560]/90 ${
            isCollapsed ? "justify-center" : "justify-start px-6"
            } hover:bg-muted transition-colors`}
            onClick={handleLogout}
            type="button"
            variant="icon"
        >
            <SignoutIcon />
            {!isCollapsed && (
            <span className="inline-flex items-center whitespace-nowrap font-medium text-xs group-hover:text-primary">
                Sign out
            </span>
            )}
            {isCollapsed && (
            <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 scale-0 rounded bg-muted px-2 py-1 text-xs text-muted-foreground opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                Sign out
            </span>
            )}
        </Button>
    );
};

export default LogoutButton;