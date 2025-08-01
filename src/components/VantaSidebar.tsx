import { useState } from "react";
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  Music, 
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Search", url: "/search", icon: Search },
  { title: "Library", url: "/library", icon: Library },
];

const recentProjects = [
  { name: "EP 2025", tracks: 5 },
  { name: "Dark Synthwave", tracks: 8 },
  { name: "Ambient Sessions", tracks: 3 },
  { name: "Bass Experiments", tracks: 12 },
];

export function VantaSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar 
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 bg-vanta-black border-r border-border`}
      collapsible="icon"
    >
      <SidebarContent className="bg-vanta-black">
        {/* Logo Section */}
        <div className="p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-vanta-grey flex items-center justify-center">
            <span className="text-vanta-white font-bold text-sm">V</span>
          </div>
          {!collapsed && (
            <span className="text-vanta-white font-semibold text-lg">VANTA</span>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                          isActive 
                            ? "bg-vanta-grey text-vanta-white" 
                            : "text-vanta-grey hover:text-vanta-white hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-vanta-grey text-xs uppercase tracking-wider">
            {!collapsed && "Your Projects"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 mb-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full justify-start gap-2 bg-transparent border border-vanta-grey/30 text-vanta-grey hover:bg-vanta-grey/20 hover:text-vanta-white"
              >
                <Plus className="w-4 h-4" />
                {!collapsed && "New Project"}
              </Button>
            </div>
            
            {!collapsed && (
              <SidebarMenu>
                {recentProjects.map((project, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-muted rounded-md text-vanta-grey hover:text-vanta-white transition-colors">
                        <Music className="w-4 h-4" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{project.name}</p>
                          <p className="text-xs text-muted-foreground">{project.tracks} tracks</p>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Favorites */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-muted rounded-md text-vanta-grey hover:text-vanta-white transition-colors">
                    <Heart className="w-5 h-5" />
                    {!collapsed && <span>Liked Tracks</span>}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}