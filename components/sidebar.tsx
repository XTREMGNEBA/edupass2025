import { ROLE_MENUS, MenuItem } from '@/config/role-menus';
import { useUserProfile } from '@/hooks/useUserProfile';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // Utilitaire pour la gestion de classes CSS conditionnelles

// Dans le composant Sidebar
type UserRole = 'ADMIN' | 'USER';

const Sidebar = () => {
  const { profile } = useUserProfile();
  const pathname = usePathname();
  
  // Get menu items based on user role, defaulting to USER if no role or invalid role
  const sidebarItems = profile?.role && (profile.role as UserRole) in ROLE_MENUS 
    ? ROLE_MENUS[profile.role as UserRole] 
    : ROLE_MENUS.USER;

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item: MenuItem) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  // Applique une classe pour le lien actif
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
