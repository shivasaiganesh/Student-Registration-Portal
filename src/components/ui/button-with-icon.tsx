import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ButtonWithIconProps {
  onClick?: () => void;
}

const ButtonWithIcon = ({ onClick }: ButtonWithIconProps) => {
  return (
    <Button 
      onClick={onClick} 
      className="relative text-sm font-medium rounded-full h-12 p-1 pl-6 pr-14 group transition-all duration-500 hover:pl-14 hover:pr-6 w-fit overflow-hidden cursor-pointer"
    >
      <span className="relative z-10 transition-all duration-500">
        Add New Student
      </span>
      <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-90">
        <Plus size={16} />
      </div>
    </Button>
  );
};

export default ButtonWithIcon;
