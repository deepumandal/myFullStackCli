import { UIConfigsInterface } from "../../types";

export const UIConfigs: UIConfigsInterface = {
  Accordion: {
    path: "/ui-components/Accordion",
    cssPath: "/ui-components-assets/Accordion",
    dependencies: ["@radix-ui/react-accordion", "lucide-react"],
    devDependencies: []
  },
  Avatar: {
    path: "/ui-components/Avatar",
    cssPath: "/ui-components-assets/Avatar",
    dependencies: ["@radix-ui/react-avatar"],
    devDependencies: []
  },
  Badge: {
    path: "/ui-components/Badge",
    cssPath: "/ui-components-assets/Badge",
    dependencies: ["class-variance-authority"],
    devDependencies: []
  },
  Breadcrumb: {
    path: "/ui-components/Breadcrumb",
    cssPath: "/ui-components-assets/Breadcrumb",
    dependencies: ["lucide-react", "@radix-ui/react-slot"],
    devDependencies: []
  },
  Button: {
    path: "/ui-components/Button",
    cssPath: "/ui-components-assets/Button",
    dependencies: ["class-variance-authority", "lucide-react", "@radix-ui/react-slot"],
    devDependencies: []
  },
  CheckBox: {
    path: "/ui-components/CheckBox",
    cssPath: "/ui-components-assets/Checkbox",
    dependencies: ["@radix-ui/react-checkbox", "lucide-react"],
    devDependencies: []
  },
  Common: {
    path: "/ui-components/Common",
    cssPath: null,
    dependencies: [],
    devDependencies: []
  },
  ConfirmationDialog: {
    path: "/ui-components/ConfirmationDialog",
    cssPath: "/ui-components-assets/confirmationDialog",
    dependencies: [],
    siblingDependencies: ["Button", "Model", "Typography"],
    devDependencies: []
  },
  Container: {
    path: "/ui-components/Container",
    cssPath: "/ui-components-assets/Container",
    dependencies: [],
    devDependencies: []
  },
  ContextMenu: {
    path: "/ui-components/ContextMenu",
    cssPath: "/ui-components-assets/context-menu",
    dependencies: ["@radix-ui/react-context-menu"],
    devDependencies: []
  },
  DropDownMenu: {
    path: "/ui-components/DropDownMenu",
    cssPath: "/ui-components-assets/drop-down-menu",
    dependencies: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    devDependencies: []
  },
  Flex: {
    path: "/ui-components/Flex",
    cssPath: "/ui-components-assets/Flex",
    dependencies: ["@radix-ui/react-slot"],
    devDependencies: []
  },
  Grid: {
    path: "/ui-components/Grid",
    cssPath: null,
    dependencies: [],
    devDependencies: []
  },
  HoverCard: {
    path: "/ui-components/HoverCard",
    cssPath: "/ui-components-assets/HoverCard",
    dependencies: ["@radix-ui/react-hover-card"],
    devDependencies: []
  },
  Model: {
    path: "/ui-components/Model",
    cssPath: "/ui-components-assets/model",
    dependencies: ["@radix-ui/react-dialog", "lucide-react", "class-variance-authority"],
    devDependencies: []
  },
  Separator: {
    path: "/ui-components/Separator",
    cssPath: "/ui-components-assets/Separator",
    dependencies: ["@radix-ui/react-separator"],
    devDependencies: []
  },
  Skeleton: {
    path: "/ui-components/Skeleton",
    cssPath: "/ui-components-assets/skeleton",
    dependencies: [],
    devDependencies: []
  },
  Tabs: {
    path: "/ui-components/Tabs",
    cssPath: "/ui-components-assets/Tabs",
    dependencies: ["@radix-ui/react-tabs"],
    devDependencies: []
  },
  ToolTip: {
    path: "/ui-components/ToolTip",
    cssPath: "/ui-components-assets/tooltip",
    dependencies: ["@radix-ui/react-tooltip"],
    devDependencies: []
  },
  Typography: {
    path: "/ui-components/Typography",
    cssPath: "/ui-components-assets/Typography",
    dependencies: [],
    devDependencies: []
  }
};

export const utilsConfigs = () => {};
