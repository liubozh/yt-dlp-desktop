import { Download, Sparkles } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem key="Downloads">
            <SidebarMenuButton asChild isActive={true}>
              <a href="#">
                <Download />
                <span>Downloads</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="Ask AI">
            <SidebarMenuButton asChild>
              <a href="#">
                <Sparkles />
                <span>Ask AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
