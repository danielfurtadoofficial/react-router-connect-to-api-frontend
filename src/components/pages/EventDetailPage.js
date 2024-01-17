import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../EventItem";
import EventsList from "../EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent}></EventItem>}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents}></EventsList>}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for event " + id },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.id;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const eventId = params.id;
  //console.log(eventId);

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: "DELETE", //or: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch delete event " + eventId },
      {
        status: 500,
      }
    );
  } else {
    return redirect("/events");
  }
}
