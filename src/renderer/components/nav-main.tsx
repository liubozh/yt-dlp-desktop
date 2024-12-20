import { Download, Search, Sparkles } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem key={'Search'}>
            <SidebarMenuButton asChild isActive={true}>
              <a href={'#'}>
                <Search />
                <span>Search</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key={'Downloads'}>
            <SidebarMenuButton asChild>
              <a href={'#'}>
                <Download />
                <span>Downloads</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key={'Ask AI'}>
            <SidebarMenuButton asChild>
              <a href={'#'}>
                <Sparkles />
                <span>Ask AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
