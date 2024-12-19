import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { SidebarGroup, SidebarGroupContent } from './ui/sidebar';

export default function Options() {
  return (
    <SidebarGroup className="px-4">
      <SidebarGroupContent>
        <div className="flex items-center space-x-2 gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
