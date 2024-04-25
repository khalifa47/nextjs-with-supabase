import AuthButton from "./AuthButton";
import DeployButton from "./DeployButton";

const Navbar = ({ isSupabaseConnected }: { isSupabaseConnected: boolean }) => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <DeployButton />
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  );
};

export default Navbar;
