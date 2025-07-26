import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function CalendarPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Appointment Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={[ /* fetched from backend */ ]}
      />
    </div>
  );
}
