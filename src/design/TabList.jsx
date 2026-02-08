import { Tabs, TabsList, TabsTrigger } from "@/components//ui/tabs";

export default function TabList({ activeTab, changeAction, children }) {
  function onTabClick(newValue) {
    changeAction(newValue);
  }

  return (
    <Tabs
      activationMode="manual"
      value={activeTab}
      onValueChange={onTabClick}
      className="relative w-full h-full"
    >
      <div className="px-8">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="relative overflow-hidden">
            All
          </TabsTrigger>
          <TabsTrigger value="wip" className="relative overflow-hidden">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="done" className="relative overflow-hidden">
            Complete
          </TabsTrigger>
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
}
