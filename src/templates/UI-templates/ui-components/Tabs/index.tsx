"use client";

import {
  Content as RadixContent,
  List as RadixList,
  Root as RadixRoot,
  TabsProps as RadixTabsProps,
  Trigger as RadixTrigger,
} from "@radix-ui/react-tabs";
import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from "react";
import { cn } from "@Utils/ClassName";

interface TabsProps extends RadixTabsProps {}

const Tabs: FC<TabsProps> & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
} = (props) => <RadixRoot {...props} />;

const TabsList = forwardRef<
  ElementRef<typeof RadixList>,
  ComponentPropsWithoutRef<typeof RadixList>
>(({ className, ...props }, ref) => (
  <RadixList ref={ref} className={cn(className)} {...props} />
));
TabsList.displayName = RadixList.displayName;

const TabsTrigger = forwardRef<
  ElementRef<typeof RadixTrigger>,
  ComponentPropsWithoutRef<typeof RadixTrigger>
>(({ className, ...props }, ref) => (
  <RadixTrigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 border-b-4 transition-transform hover:scale-110 duration-200 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:text-text-dark",
      "font-medium ring-offset-background transition-all",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = RadixTrigger.displayName;

const TabsContent = forwardRef<
  ElementRef<typeof RadixContent>,
  ComponentPropsWithoutRef<typeof RadixContent>
>(({ className, ...props }, ref) => (
  <RadixContent
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = RadixContent.displayName;

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export { Tabs };
