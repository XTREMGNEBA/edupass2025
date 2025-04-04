"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  Settings, 
  LogOut, 
  CreditCard, 
  LayoutDashboard,
  Bell,
  Shield,
  HelpCircle,
  Mail 
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import type { UserProfile } from '@/types/user';
import { ROLE_ROUTES } from '@/types/user';

interface AvatarMenuProps {
  profile: UserProfile;
}

export function AvatarMenu({ profile }: AvatarMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const getDashboardLink = () => {
    return ROLE_ROUTES[profile.role] || '/dashboard';
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {profile.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt={profile.first_name} />
            ) : (
              <AvatarFallback>
                {getInitials(profile.first_name, profile.last_name)}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile.first_name} {profile.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile.email}
            </p>
            <p className="text-xs text-primary">
              {profile.role.replace('_', ' ').toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => router.push(getDashboardLink())}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Tableau de bord</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Mon profil</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/dashboard/profile?tab=notifications')}>
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/dashboard/profile?tab=security')}>
          <Shield className="mr-2 h-4 w-4" />
          <span>Sécurité</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/dashboard/profile?tab=billing')}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Paiements</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push('/help')}>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Aide</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/contact')}>
          <Mail className="mr-2 h-4 w-4" />
          <span>Contact</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}