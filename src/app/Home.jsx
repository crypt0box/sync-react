import { useState, useEffect } from "react";
import * as Design from "@/design";
import { useRouter } from "@/router/index.jsx";
import * as data from "@/data/index.js";

function Lesson({ item, completeAction }) {
  async function action() {
    await completeAction(item.id);
  }
  return (
    <Design.LessonCard item={item}>
      <Design.CompleteButton
        complete={item.complete}
        action={action}
      ></Design.CompleteButton>
    </Design.LessonCard>
  );
}

function LessonList({ tab, search, refreshKey, completeAction }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    data.getLessons(tab, search).then((result) => {
      setLessons(result);
      setLoading(false);
    });
  }, [tab, search, refreshKey]);

  if (loading) {
    return <Design.FallbackList />;
  }

  if (lessons.length === 0) {
    return <Design.EmptyList />;
  }

  return (
    <Design.List>
      {lessons.map((item) => (
        <div key={item.id}>
          <Lesson
            id={item.id}
            item={item}
            completeAction={completeAction}
          />
        </div>
      ))}
    </Design.List>
  );
}

export default function Home() {
  const router = useRouter();
  const search = router.search.q || "";
  const tab = router.search.tab || "all";
  const [refreshKey, setRefreshKey] = useState(0);

  function searchAction(value) {
    router.setParams("q", value);
  }

  function tabAction(value) {
    router.setParams("tab", value);
  }

  async function completeAction(id) {
    await data.mutateToggle(id);
    setRefreshKey((k) => k + 1);
  }
  return (
    <>
      <Design.SearchInput value={search} changeAction={searchAction} />
      <Design.TabList activeTab={tab} changeAction={tabAction}>
        <LessonList
          tab={tab}
          search={search}
          refreshKey={refreshKey}
          completeAction={completeAction}
        />
      </Design.TabList>
    </>
  );
}
