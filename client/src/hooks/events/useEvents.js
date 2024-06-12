import { useState } from 'react';
import axios from "axios";

const useEvents = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addEvent = async (data) => {
    try {
      setIsLoading(true);
      // const data = {
      //   varietalId: varietalId,
      //   logId: logId || null,
      //   eventType: newEvent.eventType,
      //   dateStart: newEvent.dateStart ? newEvent.dateStart.toISOString() : "",
      //   dateEnd: newEvent.dateEnd ? newEvent.dateEnd.toISOString() : "",
      //   yield: newEvent.yield,
      //   notes: newEvent.notes,
      // };

      const response = await axios.post(
        `https://localhost:5001/api/varietals/${data.varietalId}/events`,
        data
      );

    } catch (error) {
      console.error("Error adding event:", error);
    }
    setIsLoading(false);
  };

  const updateEvent = async (formData) => {
    try {
      setIsLoading(true);
      const data = {
        eventId: formData.eventId,
        varietalId: formData.varietalId,
        logId: formData.logId,
        eventType: formData.eventType,
        dateStart: formData.dateStart ? formData.dateStart.toISOString() : "",
        dateEnd: formData.dateEnd ? formData.dateEnd.toISOString() : "",
        yield: formData.yield,
        notes: formData.notes,
      };

      await axios.put(
        `https://localhost:5001/api/varietals/${formData.varietalId}/events/${formData.eventId}`,
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