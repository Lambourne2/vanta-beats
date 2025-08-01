import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VantaSidebar } from "./VantaSidebar";
import { VantaPlayer } from "./VantaPlayer";

interface VantaLayoutProps {
  children: React.ReactNode;
}

export function VantaLayout({ children }: VantaLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <VantaSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Top Header with Sidebar Toggle */}
          <header className="h-16 flex items-center border-b border-border bg-background px-6">
            <SidebarTrigger className="text-vanta-grey hover:text-vanta-white" />
            
            <div className="flex-1 flex items-center justify-between ml-4">
              <div className="flex items-center gap-4">
                {/* Navigation buttons could go here */}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-vanta-grey flex items-center justify-center">
                  <span className="text-vanta-white text-sm font-medium">U</span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
        
        <VantaPlayer />
      </div>
    </SidebarProvider>
  );
}