import React, { useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import useCalendar from "../../store/Calendar";
import { createEventId } from "../../data";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from '../../i18n'; // Import i18n instance
import "./Calendar.css";

const Calendar = () => {
  const { currentEvents, setCurrentEvents } = useCalendar();
  const { themeMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  const translate = {
    PromptTitle: t("calendarPage.promptTitle"),
    DeleteConfirmation: t("calendarPage.deleteConfirmation"),
    Today: t("calendarPage.today"),
    Week: t("durationOptions.week"),
    Month: t("durationOptions.month"),
    Year: t("durationOptions.year"),
  };

  const handleEvents = async (events) => {
    await Promise.resolve(setCurrentEvents(events));
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt(translate.PromptTitle);
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(translate.DeleteConfirmation)) {
      clickInfo.event.remove();
    }
  };

  useEffect(() => {
    document.body.className = themeMode === "dark" ? "dark-mode" : "light-mode";
  }, [themeMode]);

  return (
    <div className={`calendar-container ${themeMode === "dark" ? "dark-mode" : "light-mode"}`}>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            // center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          allDaySlot={false}
          initialView="timeGridWeek"
          slotDuration={"01:00:00"}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          initialEvents={currentEvents}
          eventsSet={handleEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          locale={i18n.language} 
          buttonText={{
            today: translate.Today,
            month: translate.Month,
            week: translate.Week,
            day: translate.Year,
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
