import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { SidebarLink, type SidebarLinkProps } from "./SidebarLink";

export function SidebarAccordion({
  label,
  links,
  collapsed,
  onCollapsedChange,
}: {
  label: string;
  links?: SidebarLinkProps[];
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      value={collapsed ? "" : "item-1"}
      onValueChange={(value) => {
        onCollapsedChange(value !== "item-1");
      }}
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="mx-6 mt-1 gap-2 py-2">
          <span className="mr-auto text-sm text-foreground/70">{label}</span>
        </AccordionTrigger>

        <AccordionContent className="pb-0">
          {links?.map((link) => <SidebarLink key={link.href} {...link} />)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
