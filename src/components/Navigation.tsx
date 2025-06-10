import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, PlusSquare } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function Navigation() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          <Link
            href="/"
            className={`flex flex-col items-center space-y-1 ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Inicio</span>
          </Link>

          <Link
            href="/create"
            className={`flex flex-col items-center space-y-1 ${
              isActive('/create') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <PlusSquare size={24} />
            <span className="text-xs">Crear</span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center space-y-1 ${
              isActive('/profile') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <User size={24} />
            <span className="text-xs">Perfil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 