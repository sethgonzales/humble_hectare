import { useState } from 'react';
import axios from "axios";

const useEvents = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const addEvent = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/varietals/${data.varietalId}/events`,
        data
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error adding event:", error);
      setIsLoading(false);
    }
  };

  const updateEvent = async (newData) => {
    try {
      setIsLoading(true);
      const data = {
        eventId: newData.eventId,
        varietalId: newData.varietalId,
        logId: newData.logId,
        eventType: newData.eventType,
        dateStart: newData.dateStart instanceof Date ? newData.dateStart.toISOString() : null, // Handle null or invalid dates
        dateEnd: newData.dateEnd instanceof Date ? newData.dateEnd.toISOString() : null, // Handle null or invalid dates
        yield: newData.yield,
        notes: newData.notes,
      };

      await axios.put(
        `${apiUrl}/api/varietals/${newData.varietalId}/events/${newData.eventId}`,
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
        `${apiUrl}/api/events/${eventId}`
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