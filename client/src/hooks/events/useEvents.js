import { useState } from 'react';
import axios from "axios";

const useEvents = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addEvent = async (varietalId, newEvent, logId) => {
    try {
      setIsLoading(true);
      const data = {
        varietalId: varietalId,
        logId: logId || null,
        eventType: newEvent.eventType,
        dateStart: newEvent.dateStart ? newEvent.dateStart.toISOString() : "",
        dateEnd: newEvent.dateEnd ? newEvent.dateEnd.toISOString() : "",
        yield: newEvent.yield,
        notes: newEvent.notes,
      };

      const response = await axios.post(
        `https://localhost:5001/api/varietals/${varietalId}/events`,
        data
      );

    } catch (error) {
      console.error("Error adding event:", error);
    }
    setIsLoading(false);
  };

  const updateEvent = async (varietalId, eventId, logId, updatedEvent) => {
    try {
      setIsLoading(true);
      const data = {
        eventId: eventId,
        varietalId: varietalId,
        logId: logId,
        eventType: updatedEvent.eventType,
        dateStart: updatedEvent.dateStart ? updatedEvent.dateStart.toISOString() : "",
        dateEnd: updatedEvent.dateEnd ? updatedEvent.dateEnd.toISOString() : "",
        yield: updatedEvent.yield,
        notes: updatedEvent.notes,
      };

      await axios.put(
        `https://localhost:5001/api/varietals/${varietalId}/events/${eventId}`,
        data
      );

    } catch (error) {
      console.error("Error updating varietal:", error);
    }
    setIsLoading(false);
  };

  const deleteEvent = async (eventId) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `https://localhost:5001/api/events/${eventId}`
      );
    } catch (error) {
      console.error("Error deleting varietal:", error);
    }
  };

  return {
    isLoading,
    addEvent,
    updateEvent,
    deleteEvent,
    // loadEvents,
  };
};

export default useEvents;