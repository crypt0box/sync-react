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
      {/* 
          Design.CompleteButton is using the action prop pattern to automatically
          update the completed state while the action is pending. If the action to
          toggle complete takes longer than 150ms, it automatically shows a loading
          state on the button, so the user knows their action is being processed.
      */}
      <Design.CompleteButton
        complete={item.complete}
        action={action}
      ></Design.CompleteButton>
    </Design.LessonCard>
  );
}

function LessonList({ tab, search, completeAction }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    data.getLessons(tab, search).then((result) => {
      setLessons(result);
      setLoading(false);
    });
  }, [tab, search]);

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

  function searchAction(value) {
    /**
     * Since this is an Action we know this updates in a transition.
     */
    router.setParams("q", value);
  }
  function tabAction(value) {
    /**
     * Since this is an Action we know this updates in a transition.
     */
    router.setParams("tab", value);
  }

  async function completeAction(id) {
    /**
     * Since we're in an Action we know we're in a transition.
     * This means we can await a mutation, and the pending state of
     * the action will be true until the mutation, and all the updates
     * after it are done.
     */
    await data.mutateToggle(id);

    /**
     * After the mutation we need to revalidate the data cache.
     * In this example app, our router and data layer are integrated,
     * so when you call `refresh` on the current route, the data cache
     * is automatically cleared so re-rendering the route re-fetches data.
     *
     * Note: We don't have to wrap this in startTransition because
     * the router wraps these updates in a transition automatically.
     */
    router.refresh();
  }
  return (
    <>
      {/*
         Design.SearchInput is using the action prop pattern to automatically 
         show a loading state while the action is pending (delayed by 1.5s).
         The input state is updated with useOptimistic so it updates immediately
         while the transition to the new URL is pending.
      */}
      <Design.SearchInput value={search} changeAction={searchAction} />
      {/*
         Design.TabList is using the action prop pattern to optimistically 
         update the selected tab while the action is pending. If the action 
         takes longer than 150ms, it automatically shows a loading state on
         the tab, so the user knows their optimistic tab is still loading.
      */}
      <Design.TabList activeTab={tab} changeAction={tabAction}>
        <LessonList
          tab={tab}
          search={search}
          completeAction={completeAction}
        />
      </Design.TabList>
    </>
  );
}
