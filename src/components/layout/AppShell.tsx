import { useEffect, useMemo } from "react";
import { useDemoStore } from "../../store/useDemoStore";
import lifeEventsData from "../../content/lifeEvents/base-life-events.json";
import type { LifeEvent } from "../../types/demo";
import { Sidebar } from "./Sidebar";
import { Stage } from "./Stage";

const ALL_EVENTS = lifeEventsData as LifeEvent[];

export function AppShell() {
  const selectedBusinessCase = useDemoStore((s) => s.selectedBusinessCase);
  const selectedEventId = useDemoStore((s) => s.selectedEventId);
  const currentStepIndex = useDemoStore((s) => s.currentStepIndex);
  const autoPlay = useDemoStore((s) => s.autoPlay);
  const setSelectedEventId = useDemoStore((s) => s.setSelectedEventId);
  const setCurrentStepIndex = useDemoStore((s) => s.setCurrentStepIndex);

  const filteredEvents = useMemo<LifeEvent[]>(() => {
    if (selectedBusinessCase === "all") return ALL_EVENTS;
    return ALL_EVENTS.filter((e) =>
      e.businessCases.includes(selectedBusinessCase)
    );
  }, [selectedBusinessCase]);

  const selectedEvent = useMemo<LifeEvent | null>(() => {
    if (!selectedEventId) return null;
    return ALL_EVENTS.find((e) => e.id === selectedEventId) ?? null;
  }, [selectedEventId]);

  const selectedIndex = useMemo(
    () =>
      selectedEventId
        ? filteredEvents.findIndex((e) => e.id === selectedEventId)
        : -1,
    [filteredEvents, selectedEventId]
  );

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;

      if (e.key === "Escape") {
        setSelectedEventId(null);
        return;
      }
      if (e.key === "ArrowLeft") {
        if (selectedIndex > 0) setSelectedEventId(filteredEvents[selectedIndex - 1].id);
        else if (selectedIndex === -1 && filteredEvents.length > 0)
          setSelectedEventId(filteredEvents[0].id);
        return;
      }
      if (e.key === "ArrowRight") {
        if (selectedIndex >= 0 && selectedIndex < filteredEvents.length - 1) {
          setSelectedEventId(filteredEvents[selectedIndex + 1].id);
        } else if (selectedIndex === -1 && filteredEvents.length > 0) {
          setSelectedEventId(filteredEvents[0].id);
        }
        return;
      }
      if (selectedEvent) {
        const total = selectedEvent.microJourney.length;
        if (e.key === "ArrowDown" || e.key === " ") {
          e.preventDefault();
          setCurrentStepIndex(Math.min(currentStepIndex + 1, total - 1));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setCurrentStepIndex(Math.max(currentStepIndex - 1, 0));
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    filteredEvents,
    selectedIndex,
    selectedEvent,
    currentStepIndex,
    setSelectedEventId,
    setCurrentStepIndex,
  ]);

  // Auto-play step advance
  useEffect(() => {
    if (!autoPlay || !selectedEvent) return;
    const total = selectedEvent.microJourney.length;
    const id = window.setInterval(() => {
      const next = currentStepIndex + 1;
      if (next >= total) {
        // Advance to next event
        if (selectedIndex < filteredEvents.length - 1) {
          setSelectedEventId(filteredEvents[selectedIndex + 1].id);
        } else {
          setCurrentStepIndex(total - 1);
        }
      } else {
        setCurrentStepIndex(next);
      }
    }, 4500);
    return () => window.clearInterval(id);
  }, [
    autoPlay,
    selectedEvent,
    currentStepIndex,
    selectedIndex,
    filteredEvents,
    setSelectedEventId,
    setCurrentStepIndex,
  ]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-stage-100">
      <Sidebar
        events={filteredEvents}
        selectedEventId={selectedEventId}
        onSelectEvent={(id) => setSelectedEventId(id)}
      />
      <Stage
        events={filteredEvents}
        selectedEvent={selectedEvent}
        selectedIndex={selectedIndex}
        onSelectEvent={(id) => setSelectedEventId(id)}
      />
    </div>
  );
}
