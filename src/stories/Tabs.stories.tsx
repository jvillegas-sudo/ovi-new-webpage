import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/Tabs";
import { Text } from "@components/ui/Text";

/**
 * ## Tabs
 *
 * Tabbed navigation for switching between related content panels.
 * Keyboard accessible — ← / → arrow keys cycle through triggers.
 *
 * ### Variants
 * - **default** — Segmented control on dark surface
 * - **pills** — Bordered pill buttons
 * - **underline** — Bottom-border indicator
 * - **boxed** — Filled active state with glass surface
 *
 * ### Anatomy
 * `Tabs` → `TabsList` → `TabsTrigger` · `TabsContent`
 */
const meta: Meta<typeof Tabs> = {
  title: "Design System/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["default", "pills", "underline", "boxed"] },
  },
  args: {
    defaultValue: "overview",
    style: { width: 480 },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const TabDemoContent = ({ value }: { value: string }) => (
  <Tabs defaultValue={value}>
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
      <TabsTrigger value="reports">Reports</TabsTrigger>
      <TabsTrigger value="settings" disabled>
        Settings
      </TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      <Text className="pt-4">Overview content — high-level platform metrics and status.</Text>
    </TabsContent>
    <TabsContent value="pipeline">
      <Text className="pt-4">Pipeline content — active compound workflows and stages.</Text>
    </TabsContent>
    <TabsContent value="reports">
      <Text className="pt-4">Reports content — historical analytics and exports.</Text>
    </TabsContent>
  </Tabs>
);

export const Default: Story = {
  render: (_args) => <TabDemoContent value="overview" />,
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="pills" style={{ width: 480 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Text className="pt-4">Overview panel</Text>
      </TabsContent>
      <TabsContent value="pipeline">
        <Text className="pt-4">Pipeline panel</Text>
      </TabsContent>
      <TabsContent value="reports">
        <Text className="pt-4">Reports panel</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="underline" style={{ width: 480 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Text className="pt-4">Overview panel</Text>
      </TabsContent>
      <TabsContent value="pipeline">
        <Text className="pt-4">Pipeline panel</Text>
      </TabsContent>
      <TabsContent value="reports">
        <Text className="pt-4">Reports panel</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const Boxed: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="boxed" style={{ width: 480 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Text className="pt-4">Overview panel</Text>
      </TabsContent>
      <TabsContent value="pipeline">
        <Text className="pt-4">Pipeline panel</Text>
      </TabsContent>
      <TabsContent value="reports">
        <Text className="pt-4">Reports panel</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="active" style={{ width: 480 }}>
      <TabsList>
        <TabsTrigger value="active" badge={12}>
          Active
        </TabsTrigger>
        <TabsTrigger value="pending" badge={3}>
          Pending
        </TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <Text className="pt-4">12 active pipelines</Text>
      </TabsContent>
      <TabsContent value="pending">
        <Text className="pt-4">3 pending review</Text>
      </TabsContent>
      <TabsContent value="completed">
        <Text className="pt-4">All completed workflows</Text>
      </TabsContent>
    </Tabs>
  ),
};
