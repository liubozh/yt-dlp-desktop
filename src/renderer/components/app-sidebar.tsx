import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from './ui/sidebar';
import SearchForm from './search-form';
import Options from './options';

import MetadataCard from './metadata-card';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <Options />
        <SidebarSeparator className="mx-0" />
        <MetadataCard />
      </SidebarContent>
    </Sidebar>
  );
}
